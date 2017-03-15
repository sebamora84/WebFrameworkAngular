var tables;
var selectedTable;
var consumptionTypes;
var currentConsumption;

$(function(){
	$(document).keydown(function(e) {
        if (e.keyCode == 66 && e.ctrlKey) {
            $("#searchBox").focus();
        }
    });
		
	loadAllCredits();
	loadAllConsumptionTypes();
	loadAllTables();
	
	
	
	$.post("Api/Product/GetAllProducts.php",
			function(data, status){
			loadProducts(data, status);
		});
	$('#consumptionWrap').droppable({
        drop: function( event, ui ) {
			product = ui.draggable[0];
			table =$('.tableSelected');
			addItemByProduct(product, table);
        }
	});
	
	$('#consumptionClose').click(function(event) {
		consumptionId = $(".consumptionInfo").attr('id').replace('consumptionInfo','');					
		$.post("Api/Consumption/CloseConsumption.php",
		    { consumptionId: consumptionId},
			function(data, status){
			table =$('.tableSelected');
			selectTable(table);
		});					
	});
	$('#consumptionChange').click(function(event) {								
		showConsumptionTypeSelector(function(){
			consumptionId = $(".consumptionInfo").attr('id').replace('consumptionInfo','');	
			consumptionTypeId = $('.consumptionTypeSelected').attr('id').replace('consumptionType','');
			$.post("Api/Consumption/ChangeConsumptionType.php",
				{ consumptionId: consumptionId, consumptionTypeId: consumptionTypeId },
				function(data, status){
				table =$('.tableSelected');
				selectTable(table);
			});
		});				
	});
	$('#consumptionCredit').click(function(event) {								
		showConsumptionCreditSelector(function(){
			consumptionId = $(".consumptionInfo").attr('id').replace('consumptionInfo','');	
			creditId = $('#creditSelector').val();
			$.post("Api/Consumption/CreditConsumption.php",
				{ consumptionId: consumptionId, creditId: creditId },
				function(data, status){
					table =$('.tableSelected');
					selectTable(table);
			});
		});				
	});
	$('#consumptionCancel').click(function(event) {
		consumptionId = $(".consumptionInfo").attr('id').replace('consumptionInfo','');					
		$.post("Api/Consumption/CancelConsumption.php",
		    { consumptionId: consumptionId},
			function(data, status){
			table =$('.tableSelected');
			selectTable(table);
		});
	});
	$('#consumptionOpen').click(function(event) {
		tableId = $('.tableSelected').attr('id').replace('table','');
		$.post("Api/Consumption/OpenConsumption.php",
		    { tableId: tableId},
			function(data, status){
			table =$('.tableSelected');
			selectTable(table);
		});
	});
	$('#consumptionOpenAs').click(function(event) {
		showConsumptionTypeSelector(function(){
			tableId = $('.tableSelected').attr('id').replace('table','');
			consumptionTypeId = $('.consumptionTypeSelected').attr('id').replace('consumptionType','');
			$.post("Api/Consumption/OpenConsumption.php",
				{ tableId: tableId, consumptionTypeId: consumptionTypeId },
				function(data, status){
				table =$('.tableSelected');
				selectTable(table);
			});
		});
	});				
});

function showConsumptionTypeSelector(confirmAction){
	$("#consumptionTypesCancel").click(function(event){
		$( ".consumptionTypesWrap" ).hide();
	});
	//Make consumption types selectable
	$( ".consumptionType").unbind( "click" );
	$( ".consumptionType" ).click(function(event) {
		consumptionType = $(this).closest('.consumptionType');
		$(".consumptionType").removeClass("consumptionTypeSelected");
		$(consumptionType).addClass("consumptionTypeSelected");
		confirmAction();
		$( ".consumptionTypesWrap" ).hide();
	});
	$( ".consumptionTypesWrap" ).show();
}
function showConsumptionCreditSelector(confirmAction){
	$("#consumptionCreditCancel").click(function(event){
		$( ".consumptionCreditWrap" ).hide();
	});
	//Make consumption types selectable
	$( "#consumptionCreditAccept").unbind( "click" );
	$( "#consumptionCreditAccept" ).click(function(event) {
		confirmAction();
		$( ".consumptionCreditWrap" ).hide();
	});
	$( ".consumptionCreditWrap" ).show();
}
function addItemByProduct(product, table){
	if(table.length==0){
		//TODO: Add select table message
		return;
		}
	productId = product.id.replace('product','');
	tableId = $(table).attr('id').replace('table','');						
	$.post("Api/Consumption/AddItemByProduct.php",
			{ productId: productId, tableId: tableId},
			function(data, status){
				selectTable(table);
		});
}
function loadAllCredits(){
	$.post("Api/Consumption/GetAllCredits.php",
			function(data, status){
		$("#creditSelector").empty();
		$('#creditSelector').append('<option value=""> Seleccione una cuenta ...</option>');
		credits = JSON.parse(data);
		if (credits.length == 0) { return; };
		
		$.each(credits, function(index, credit){					
			$('#creditSelector').append('<option value='+credit.id+'>'+credit.description+'</option>');
		});
	});
}
function loadAllConsumptionTypes(){
	$.post("Api/Consumption/GetAllConsumptionTypes.php",
			function(data, status){
			consumptionTypes = JSON.parse(data);
			if (consumptionTypes.length == 0) { return; };
			$( ".consumptionTypeOptions" ).empty();
			$.each(consumptionTypes, function(index, consumptionType) {
				//Create all the divs	
				$( ".consumptionTypeOptions" ).append( '<div id="consumptionType' + consumptionType.id + '" class="consumptionType">' + consumptionType.description+ '</div>' )
			});
		});	
}
function loadAllTables(){
	$.post("Api/Table/GetAllTables.php",
		function(data, status){
		tables = JSON.parse(data);
		if (tables.length == 0) { 
			//TODO: log error
			return; 
		};
		$.each(tables, function(index, table) {
			//Create all the divs and set position
			$( "#hall" ).append( '<div id="table'+ table.id +'" class="table"> <label> '+table.description+' <label></div>' );	
			$('#table'+ table.id)
				.css({
				   left: table.left, 
				   top: table.top,
				   width: table.width, 
				   height: table.height});		
		});
		//When drag or resize save position
		$( ".table" ).draggable({
			grid: [ 5, 5 ],
			scroll: true,
			stop: function(event) {
				target = event.target;
				tableId = target.id.replace('table','');
				tableLeft = $(target).css('left');
				tableTop = $(target).css('top');
				tableWidth = $(target).css('width');
				tableHeight = $(target).css('height');
				$.post("Api/Table/MoveTable.php",
					{ id: tableId, left: tableLeft, top:tableTop, width:tableWidth, height:tableHeight  },
					function(data, status){
						//message saved
					});	
			  }
		}).resizable({
			stop: function(event) {
				target = event.target;
				tableId = target.id.replace('table','');
				tableLeft = $(target).css('left');
				tableTop = $(target).css('top');
				tableWidth = $(target).css('width');
				tableHeight = $(target).css('height');
				$.post("Api/Table/MoveTable.php",
					{ id: tableId, left: tableLeft, top:tableTop, width:tableWidth, height:tableHeight  },
					function(data, status){
						//message saved
					});	
			  }
		}).droppable({
	        drop: function( event, ui ) {
				product = ui.draggable[0];
				table = $(this).closest('.table');
				addItemByProduct(product, table);
	        }
		});
		//Make cafe tables selectable
		$( ".table" ).click(function(event) {
			tableId = $(this).closest('.table').attr('id').replace('table','');
			selectTable(tableId);
		});
		loadOpenConsumptionTables();
		loadConsumption();
	});
}
function selectTable(tableId){
	$(".table").removeClass("tableSelected");
	selectedTable=tables[tableId];
	if(selectedTable==null){
		return;
	}
	$('#table'+selectedTable.id).addClass("tableSelected");
	loadConsumption();
}
function loadConsumption(){
$("#consumptionOpened").hide();
$("#consumptionClosed").hide();

$('#consumptionInfo').empty();
var consumptionHeader = $('#consumptionHeaderTemplate').clone();
$(consumptionHeader).attr('id', 'consumptionHeader');
$("#consumptionInfo").append(consumptionHeader);

if (selectedTable==null){
	return;
}
$('#consumptionHeader .tableName').text(selectedTable.description);

//Load Consumption data
$.post("Api/Consumption/GetCurrentConsumption.php",
	{ id: selectedTable.id},
	function(data, status){
		currentConsumption = JSON.parse(data);
		if (currentConsumption==null) {
			$("#consumptionHeader .type").text(consumptionTypes[selectedTable.default_consumption_type_id].description);
			$("#consumptionClosed").show();
			return; 
		};
		$("#consumptionHeader .type").text(currentConsumption.consumption_type_description);
		$("#consumptionHeader .total").text('Total: $'+parseFloat(Math.round(currentConsumption.total * 100) / 100).toFixed(2));
		$("#consumptionOpened").show();
		
		//Load Consumption data
		$.post("Api/Consumption/GetItemsByConsumption.php",
			{ id: currentConsumption.id},
			function(data, status){
				items = JSON.parse(data);
				if (items.length == 0) { return; };
				$.each(items, function(index, item) {
					//Create all the divs and

					var consumptionItem = $('#consumptionItemTemplate').clone();
					$(consumptionItem).attr('id', 'consumptionItem'+item.id);
					$("#consumptionInfo").append(consumptionItem);
					
					//$( "#consumption ul" ).append( '<li> <div class="item" id="item'+item.id+'" > <div class="itemPartLeft" >'+ item.quantity +' </div> <div class="itemPartLeft">'+item.product_description+' </div> <div class="itemPartRight"><img id="deleteItem'+item.id+'" class="itemButton buttonDeleteItem" src="Images/Icons/remove.png" alt="-" height="16"></div><div class="itemPartRight"><img id="addItem'+item.id+'" class="itemButton buttonAddItem" src="Images/Icons/add.png" alt="+" height="16"></div><div class="itemPartRight"> $ '+parseFloat(Math.round(item.subtotal * 100) / 100).toFixed(2)+'</div></div></li> ' );
					
				});
				
			$( "#consumption ul" ).append( '<li><div class="item itemSubtotal" ><div class="itemPartLeft" >Subtotal:</div><div class="itemPartRight" > $ '+parseFloat(Math.round(consumption.subtotal * 100) / 100).toFixed(2)+'</div> </div> </li> ' );
			$( "#consumption ul" ).append( '<li><div class="item itemDiscount" ><div class="itemPartLeft" >'+consumption.discount_description+':</div><div class="itemPartRight" ><input id="consumptionDiscount"  value="'+parseFloat(Math.round(consumption.discount * 100) / 100).toFixed(2)+'"></div><div class="itemPartRight" > - $  </div></div> </li> ' );
			$( "#consumption ul" ).append( '<li><div class="item itemTotal" ><div class="itemPartLeft" >Total:</div><div class="itemPartRight" > $ '+parseFloat(Math.round(consumption.total * 100) / 100).toFixed(2)+' </div> </div> </li> ' );
			
			$( ".buttonDeleteItem" ).click(function(event) {
				button = $(this).closest('.buttonDeleteItem');
				itemId = $(button).attr('id').replace('deleteItem','');
				$.post("Api/Consumption/SubstractItem.php",
						{ itemId: itemId},
						function(data, status){
							table =$('.tableSelected');
							selectTable(table);
					});									
			});
			$( ".buttonAddItem" ).click(function(event) {
				button = $(this).closest('.buttonAddItem');
				itemId = $(button).attr('id').replace('addItem','');
				$.post("Api/Consumption/AddItem.php",
						{ itemId: itemId},
						function(data, status){
							table =$('.tableSelected');
							selectTable(table);
					});									
			});
			$("#consumptionDiscount").focus(function(event) {
				this.select();
			}).focusout(function(event) {
				discount= $(this).val()
				//TODO: edit discount description and add it to the post
				discountDescription="Descuento";
				consumptionId =  $(".consumptionInfo").attr('id').replace('consumptionInfo','');
				$.post("Api/Consumption/ApplyConsumptionDiscount.php",
						{ consumptionId: consumptionId, discountDescription:discountDescription ,discount: discount},
						function(data, status){
							table =$('.tableSelected');
							selectTable(table);
					});
			}).keyup(function(e){
			    if(e.keyCode == 13)
			    {
			        $(this).trigger("focusout");
			    }
			});
		});
		
	});

}
function loadProducts(data, status){
				var jsonData = JSON.parse(data);
				if (jsonData.length == 0) { return; };
				$.each(jsonData, function(index, element) {
					//Create all the divs and set position
					product = element;					
					$( "#products ul").append( '<li> <div id="product'+ product.id +'" class="product"> <div class="itemPartLeft">'+product.description+'</div> <div class="itemPartRight"><img id="addProduct'+product.id+'" class="productButton buttonAddProduct" src="Images/Icons/add.png" alt="+" height="24"></div></div></li>' );						
				});
				$( ".product" ).draggable({ 
					revert: "valid",
					helper: "clone",
					appendTo: 'body',
					containment: 'window',
					scroll: false,
//					}).dblclick(function(event) {
//						product = $(this).closest('.product')[0];
//						table =$('.tableSelected');
//						addItemByProduct(product, table);
					});
				
				productsList = new List('products', {
					valueNames: [ 'product' ]
				});
				$( ".buttonAddProduct" ).click(function(event) {
					product = $(this).closest('.product')[0];
					table =$('.tableSelected');
					addItemByProduct(product, table);									
				});
			}

function loadOpenConsumptionTables(){
	$.post("Api/Consumption/GetAllOpenConsumptions.php",
			function(data, status){
		$(".tableOpen").removeClass('tableOpen');
		var consumptions = JSON.parse(data);
		if (consumptions.length == 0) { return; };
		
		$.each(consumptions, function(index, consumption){
			var tableId = consumption.table_id;
			$('#table'+tableId).addClass('tableOpen');
		});
	});	
}
