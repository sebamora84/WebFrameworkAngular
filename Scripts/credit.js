
var credits;
$(function() {

		loadAllCredits();	
		
		$('#saveCreditButton').click(function(){
			creditDescription = $("#creditDescription").val();
			if (creditDescription==""){
				return;
			}
			$.post("Api/Consumption/SaveCredit.php",
					{creditDescription:creditDescription },
					function(data, status){
						$('#creditDescription').val("");
						loadAllCredits();
				});
		});
		$('#savePaymentButton').click(function(){
			creditId= $("#creditSelector").val();
			description = $("#paymentDescription").val();
			amount = $("#paymentAmount").val();
			if (description=="" || amount=="" || creditId==""){
				return;
			}
			$.post("Api/Consumption/SavePayment.php",
					{creditId:creditId, description:description,amount:amount },
					function(data, status){
						$("#paymentDescription").val("");
						$("#paymentAmount").val("");
						loadCreditSheet();
				});
		});

		$("#creditSelector").change(function(e){
			$('#creditTable tbody').empty();
			loadCreditSheet();			
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
function loadCreditSheet(){
	creditId = $("#creditSelector").val();
	$.post("Api/Consumption/GetCreditSheet.php",
			{creditId:creditId},
			function(data, status){
				creditItems = JSON.parse(data);
				if (creditItems.length == 0) { return; };
				$('#creditTable tbody').empty();
				
				$.each(creditItems, function(index, item){
					$('#creditTable tbody').append('<tr>'+
							'<td><label>'+item.created+'</label></td>'+
							'<td><label>'+item.type+'</label></td>'+
							'<td><label>'+item.description+'</label></td>'+
							'<td><label>'+item.amount+'</label></td>'+
							'</tr>');
				});
		});
}

			