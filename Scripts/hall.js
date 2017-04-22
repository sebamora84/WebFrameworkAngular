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
	loadAllProducts();
	
	$('#consumptionWrap').droppable({
        drop: function( event, ui ) {
			productId = $(ui.draggable).closest('.product').attr('id').replace('product','');
			addItemByProduct(productId);					
        }
	});
	
	$('#consumptionClose').click(function(event) {		
		$.post("Api/Consumption/CloseConsumption.php",
		    { consumptionId: currentConsumption.id},
			function(data, status){
		    loadConsumption();
		});					
	});
	$('#consumptionChange').click(function(event) {								
		showConsumptionTypeSelector(function(){
			consumptionTypeId = $('.consumptionTypeSelected').attr('id').replace('consumptionType','');
			$.post("Api/Consumption/ChangeConsumptionType.php",
				{ consumptionId: currentConsumption.id, consumptionTypeId: consumptionTypeId },
				function(data, status){
				loadConsumption();
			});
		});				
	});
	$('#consumptionCredit').click(function(event) {								
		showConsumptionCreditSelector(function(){
			creditId = $('#creditSelector').val();
			$.post("Api/Consumption/CreditConsumption.php",
				{ consumptionId: currentConsumption.id, creditId: creditId },
				function(data, status){
				    loadConsumption();
			});
		});				
	});
	$('#consumptionCancel').click(function(event) {
		consumptionId = currentConsumption.id;					
		$.post("Api/Consumption/CancelConsumption.php",
		    { consumptionId: consumptionId},
			function(data, status){
			    loadConsumption();
		});
	});
	$('#consumptionOpen').click(function(event) {
		$.post("Api/Consumption/OpenConsumption.php",
		    { tableId: selectedTable.id},
			function(data, status){
			    loadConsumption();
		});
	});
	$('#consumptionOpenAs').click(function(event) {
		showConsumptionTypeSelector(function(){
			consumptionTypeId = $('.consumptionTypeSelected').attr('id').replace('consumptionType','');
			$.post("Api/Consumption/OpenConsumption.php",
				{ tableId: selectedTable.id, consumptionTypeId: consumptionTypeId },
				function(data, status){
				    loadConsumption();
			});
		});
	});
	$('#searchBox').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	       var firstProduct = $('#productContainer .product:first-child');
	       if(firstProduct.length==0){
	    	   return;
	       }
	       var productId=$(firstProduct).attr('id').replace('product','');
	       addItemByProduct(productId);
	    }
	});
});

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
	        	tableId = $(this).closest('.table').attr('id').replace('table','');
				selectTable(tableId);
				
				productId = $(ui.draggable).closest('.product').attr('id').replace('product','');
				addItemByProduct(productId);		
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
function loadAllProducts(){
	$('#productContainer').empty();
	$.post("Api/Product/GetAllProducts.php",
		function(data, status){
		products = JSON.parse(data);
		if (products.length == 0) { return; };
		$.each(products, function(index, product) {
			//Create all the products
			var productItem = $('#productTemplate').clone();
			$(productItem).attr('id', 'product'+product.id);
			$("#productContainer").append(productItem);
			$(productItem).find('.identification').text(product.id);
			$(productItem).find('.description').text(product.description);	
		});

		$( ".productButtonAdd" ).click(function(event) {
			productId = $(this).closest('.product').attr('id').replace('product','');
			addItemByProduct(productId);									
		});
		
		productsList = new List('products', {
			valueNames: [ 'identification','description' ]
		});
		
		$( ".product" ).draggable({ 
			revert: "valid",
			helper: "clone",
			appendTo: 'body',
			containment: 'window',
			scroll: false,
			});
	});
				
}
function loadConsumption(){
	loadOpenConsumptionTables();
	
	$("#consumptionOpened").hide();
	$("#consumptionClosed").hide();
	
	$('#consumptionInfo').empty();
	var consumptionHeader = $('#consumptionHeaderTemplate').clone();
	$(consumptionHeader).attr('id', 'consumptionHeader');
	$("#consumptionInfo").append(consumptionHeader);
	
	if (selectedTable==null){
		return;
	}
	$(consumptionHeader).find('.tableName').text(selectedTable.description);
	
	//Load Consumption data
	$.post("Api/Consumption/GetCurrentConsumptionWithItems.php",
		{ tableId:selectedTable.id},
		function(data, status){
			currentConsumption = JSON.parse(data);
			if (currentConsumption==null) {
				$(consumptionHeader).find('.type').text(consumptionTypes[selectedTable.default_consumption_type_id].description);
				$("#consumptionClosed").show();
				return; 
			};
			$(consumptionHeader).find('.type').text(currentConsumption.consumption_type_description);
			$(consumptionHeader).find('.total').text('Total: $'+ parseMoney(currentConsumption.total));
			$("#consumptionOpened").show();
			
			//Load Consumption data
			$.each(currentConsumption.ownItem, function(index, item) {
				//Create all the divs and		
				var consumptionItem = $('#consumptionItemTemplate').clone();
				$(consumptionItem).attr('id', 'consumptionItem'+item.id);
				$("#consumptionInfo").append(consumptionItem);
				$(consumptionItem).find('.quantity').text(item.quantity);
				$(consumptionItem).find('.description').text(item.product_description);
				$(consumptionItem).find('.subtotal').text('$'+parseMoney(item.subtotal));
			});
			//load consumption footer
			consumptionFooter = $('#consumptionFooterTemplate').clone();
			$(consumptionFooter).attr('id', 'consumptionFooter');
			$("#consumptionInfo").append(consumptionFooter);
			$(consumptionFooter).find('.subtotal').text('$'+parseMoney(currentConsumption.subtotal));
			$(consumptionFooter).find('.discount').val(parseMoney(currentConsumption.discount));
			$(consumptionFooter).find('.total').text('$'+parseMoney(currentConsumption.total));
					
			$( ".itemButtonDelete" ).click(function(event) {
			itemId = $(this).closest('.item').attr('id').replace('consumptionItem','');
			$.post("Api/Consumption/SubstractItem.php",
					{ itemId: itemId},
					function(data, status){
						loadConsumption();
					});									
			});
			$( ".itemButtonAdd" ).click(function(event) {
			itemId = $(this).closest('.item').attr('id').replace('consumptionItem','');
			$.post("Api/Consumption/AddItem.php",
					{ itemId: itemId},
					function(data, status){
						loadConsumption();
					});									
			});
			
			$(consumptionFooter).find('.discount').focus(function(event) {
				this.select();
			}).focusout(function(event) {
				discount= $(this).val()
				//TODO: edit discount description and add it to the post
				discountDescription="Descuento";
				consumptionId =  currentConsumption.id;
				$.post("Api/Consumption/ApplyConsumptionDiscount.php",
						{ consumptionId: consumptionId, discountDescription:discountDescription ,discount: discount},
						function(data, status){
							loadConsumption();
						});
			}).keyup(function(e){
			    if(e.keyCode == 13)
			    {
			        $(this).trigger("focusout");
			    }
			});
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
function addItemByProduct(productId){
	if(selectedTable==null){
	//TODO: Add select table message
	return;
	}					
	$.post("Api/Consumption/AddItemByProduct.php",
			{ productId: productId, tableId: selectedTable.id},
			function(data, status){
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
		creditId = $('#creditSelector').val();
		if(creditId==""){
			return;
		}
		confirmAction();
		$( ".consumptionCreditWrap" ).hide();
	});
	$( ".consumptionCreditWrap" ).show();
}
function parseMoney(value){
	return parseFloat(Math.round(value * 100) / 100).toFixed(2);
}
