$(function(){
	$(document).keydown(function(e) {
        if (e.keyCode == 66 && e.ctrlKey) {
            $("#searchBox").focus();
        }
    });	
	
	$.post("Api/Consumption/GetAllConsumptionTypes.php",
			function(data, status){
		var consumptionTypes = JSON.parse(data);
		if (consumptionTypes.length == 0) { return; };
		$.each(consumptionTypes, function(index, consumptionType){
			$('.productEditor').append(
					'<p><label for="consumptionType'+consumptionType.id+'">Consumo '+consumptionType.description+'</label>'+
					'<p><input id="consumptionType'+consumptionType.id+'" class="consumptionTypeValue" value="">'
			);
		});
	});
	
	$('#newProductButton').click(function(){
		$('.productEditor input').val("");
	});
	$('#saveProductButton').click(function(){

		jsonProduct = {};
		jsonProduct["id"]=$('#productId').val();
		jsonProduct["description"]=$('#productDescription').val();
		
		jsonPriceItems=[];
		$(".consumptionTypeValue").each(function(index, price) {
				priceItem = {};
				priceItem ["consumptionTypeId"] = $(price).attr('id').replace('consumptionType','');
				priceItem ["amount"] = $(price).val();				
				jsonPriceItems.push(priceItem);
		});
		jsonProduct["prices"]=jsonPriceItems;
			
		$.post("Api/Product/SaveProduct.php",
				{jsonProduct:jsonProduct },
				function(data, status){
					$('.productEditor input').val("");
					loadAllProducts();
			});
	});
	$('#deleteProductButton').click(function(){
		productId=$('#productId').val();
		$.post("Api/Product/DeleteProduct.php",
				{productId:productId },
				function(data, status){
					$('.productEditor input').val("");
					loadAllProducts();
			});
	});
	
	loadAllProducts();
});

function loadAllProducts(){
	$.post("Api/Consumption/GetAllConsumptionTypes.php",
			function(data, status){
		    $("#productList").empty();
			var consumptionTypes = JSON.parse(data);
			if (consumptionTypes.length == 0) { return; };			
			$("#productList").append('<tr><th><label>Id</label></th><th><label>Description</label></th></tr>');
			
			
			$.each(consumptionTypes, function(index,consumptionType){				
				$("#productList tr:has(th)").append(
						'<td>'+
							'<label>'+consumptionType.description+'</label>'+
						'</td>'
					);
			});
			//build productTable header	
			$.post("Api/Product/GetAllProducts.php",
					function(data, status){
				var products = JSON.parse(data);
				if (products.length == 0) { return; };
				$.each(products, function(index, product){					
					$("#productList").append(
							'<tr id="product'+product.id+'">'+
								'<td class="col1">'+
									'<label id="productId'+product.id+'">'+product.id+'</label>'+
								'</td>'+
								'<td>'+
									'<label id="productDescription'+product.id+'" class="productDescription">'+product.description+'</label>'+
								'</td>'+
							'</tr>');
					$.post("Api/Product/GetAPricesByProduct.php",
				    		{ productId: product.id},
							function(data, status){
						var prices = JSON.parse(data);
						if (prices.length == 0) { return; };
						
						$.each(consumptionTypes,function(index, consumptionType){
							
							price = null;
							$.each(prices, function(index, currentPrice){ 
								 if(currentPrice.consumption_type_id == consumptionType.id){
									 price=currentPrice;
								 } 
							});
							if(price==null){
								$('#product'+product.id).append(
										 '<td>'+
											'<label class="productPrice"></label>'+
										 '</td>'
								 );
							}
							else{
								$('#product'+product.id).append(
										 '<td>'+
											'<label id="productPrice'+price.id+'" class="productPrice">'+price.amount+'</label>'+
										 '</td>'
								 );
							}
						});
				    });
				});
				productsList = new List('productsDetail', {
					valueNames: [ 'productDescription' ]
				});
				
				$('tr').has('td').click(function(){
					$('.productEditor input').val("");
					
				    product = $(this).find('td label');
				    productId = product[0].innerHTML;
				    productDescription=product[1].innerHTML;
				    $('#productId').val(productId);
				    $('#productDescription').val(productDescription);
				    $.post("Api/Product/GetPricesByProduct.php",
				    		{ productId: productId},
							function(data, status){
						var prices = JSON.parse(data);
						if (prices.length == 0) { return; };
						$.each(prices,function(index, price){
							 $('#consumptionType'+price.consumption_type_id).val(price.amount);
						});
				    });
				});
	
			});	

	});
}