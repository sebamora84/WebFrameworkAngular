$(function(){
	$('#openButtonCash').hide();
	$('#freezeButtonCash').hide();
	$('#cancelButtonCash').hide();
	$('#expensesDetail').editableTableWidget();
	$("#expensesDetail td").on('readonlyedit', function(evt) {
		if($(this).hasClass("col1")){
			return false; 
		}
		cashStatus = $('#cashStatus')[0].innerHTML;
		if(cashStatus=="Cerrada"){			
			return false;
		}
		return true;
	});
	$('#expensesDetail td').on('change', function(evt, newValue) {
		// do something with the new cell value 
		column = $(this).addClass("modifiedCell");
		
	});
	
	$('.finalCashControl').find('input').focusout(function(event){
		fiveHundredAmount = parseInt($('#fiveHundredAmount').val());
		hundredAmount = parseInt($('#hundredAmount').val());
		fiftyAmount = parseInt($('#fiftyAmount').val());
		twentyAmount = parseInt($('#twentyAmount').val());
		tenAmount = parseInt($('#tenAmount').val());
		fiveAmount = parseInt($('#fiveAmount').val());
		twoAmount = parseInt($('#twoAmount').val());
		totalFinalCash = fiveHundredAmount * 500 + 
							hundredAmount * 100 +
							fiftyAmount * 50 +
							twentyAmount * 20 +
							tenAmount * 10 +
							fiveAmount * 5 +
							twoAmount * 2;
		$('#finalAmount').val(parseMoney(totalFinalCash));
		finalCash =parseMoney($('#finalCash').val());
		finalCashChecked = parseMoney(totalFinalCash)
		if(finalCash==finalCashChecked){
			$('#finalAmount').removeClass("finalCashControlError");
			$('#finalAmount').addClass("finalCashControlOk");	
		}
		else{
			$('#finalAmount').removeClass("finalCashControlOk");	
			$('#finalAmount').addClass("finalCashControlError");
		}		
	});
	
	$('#finalCash').focusout(function(event){
		finalCash =parseMoney($('#finalCash').val());
		finalCashChecked = parseMoney($('#finalAmount').val())
		if(finalCash==finalCashChecked){
			$('#finalAmount').removeClass("finalCashControlError");
			$('#finalAmount').addClass("finalCashControlOk");	
		}
		else{
			$('#finalAmount').removeClass("finalCashControlOk");	
			$('#finalAmount').addClass("finalCashControlError");
		}	
	});
		
	$.post("Api/Cash/GetCurrentCash.php",
			function(data, status){
				loadCurrentCash(data);
		});
	$.post("Api/Cash/GetExpenses.php",
			function(data, status){
			loadExpenses(data);
		});
	$.post("Api/Cash/GetCurrentCashClosedConsumptions.php",
			function(data, status){
			loadConsumptions(data);
		});
	
	$('#openButtonCash').click(function(event){
		$.post("Api/Cash/OpenNewCash.php",
				function(data, status){
				loadCurrentCash(data);
			});
	});
	$('#freezeButtonCash').click(function(event){
		$.post("Api/Cash/FreezeCash.php",
				function(data, status){
				loadCurrentCash(data);
			});
	});
	$('#cancelButtonCash').click(function(event){
		$.post("Api/Cash/CancelFrozenCash.php",
				function(data, status){
				loadCurrentCash(data);
			});
	});
	$('#closeButtonCash').click(function(event){
		initialCash = parseFloat($('#initialCash').val());
		finalCash = parseFloat($('#finalCash').val());
		cashExtraction = parseFloat($('#cashExtraction').val());
		$.post("Api/Cash/CloseFrozenCash.php",
				{ initialCash:initialCash, finalCash:finalCash, cashExtraction:cashExtraction},
				function(data, status){
					$.post("Api/Cash/GetCurrentCash.php",
							function(data, status){
								loadCurrentCash(data);
								$.post("Api/Cash/GetExpenses.php",
										function(data, status){
										loadExpenses(data);
									});
						});					
			});
	});
	$('#cancelExpensesButton').click(function(event){
		$.post("Api/Cash/GetExpenses.php",
				function(data, status){
				loadExpenses(data);
			});
	});
	$('#saveExpensesButton').click(function(event){		
	    jsonExpenses = [];	
		$("#expensesDetail tr:has(td.col1)").each(function() {
			  id = $(this).find(".col1")[0].innerHTML;
			  description = $(this).find(".col2")[0].innerHTML;
			  amount = $(this).find(".col3")[0].innerHTML;
			  item = {}
		        item ["id"] = id;
		        item ["description"] = description;
		        item ["amount"] = amount;
		        jsonExpenses.push(item);
		});			  
			
		$.post("Api/Cash/SaveExpenses.php",
				{jsonExpenses:jsonExpenses },
				function(data, status){
					loadExpenses(data);
					$.post("Api/Cash/GetCurrentCash.php",
							function(data, status){
								loadCurrentCash(data);
						});
			});
	});
	$('.cashInputValue').focus(function(event) {
		$(this).select();
	}).focusout(function(event){
		initialCash = parseFloat($('#initialCash').val());
		finalCash = parseFloat($('#finalCash').val());
		cashExtraction = parseFloat($('#cashExtraction').val());
		$.post("Api/Cash/SaveCurrentCash.php",
				{ initialCash:initialCash, finalCash:finalCash, cashExtraction:cashExtraction},
				function(data, status){
					loadCurrentCash(data);
			});
	});
});
function loadConsumptions(data){
	$("#consumptionContainer").empty();
	if(data==""){
		return;
	}
	consumptions =JSON.parse(data);
	$.each(consumptions, function(index, consumption) {
		tableConsumption = $(".tableConsumptionTemplate").clone();
		$(tableConsumption).attr('id','closedConsumption'+consumption.id);
		$(tableConsumption).find(".closedConsumptionTable").text(consumption.table_description);
		$(tableConsumption).find(".closedConsumptionType").text(consumption.consumption_type_description);
		$(tableConsumption).find(".closedConsumptionTotal").text(consumption.total);
		$(tableConsumption).find(".closedConsumptionClosedDate").text(consumption.closed);	
		if(consumption.status=="close"){
			status="Cerrada";
		}
		$(tableConsumption).find(".closedConsumptionStatus").text(status);
		$(tableConsumption).removeClass("tableConsumptionTemplate");
		$("#consumptionContainer").append(tableConsumption);	
	});
}


function loadExpenses(data){
	expensesRows = $("#expensesDetail tr");
	rowIndex = 1;
	if(data!=""){		
		expenses =JSON.parse(data);
		$.each(expenses, function(index, expense) {
			rowCells = $(expensesRows[rowIndex++]).find("td");
			rowCells[0].innerHTML=expense.id;
			rowCells[1].innerHTML=expense.description;
			rowCells[2].innerHTML=expense.amount;
		});	
	}
	for(rowIndex; rowIndex < 14; rowIndex++){
		rowCells = $(expensesRows[rowIndex]).find("td");
		rowCells[0].innerHTML="";
		rowCells[1].innerHTML="";
		rowCells[2].innerHTML="";
	}
	$("#expensesDetail td").removeClass("modifiedCell");
}

function loadCurrentCash(data){
	$.post("Api/Cash/GetCurrentCashClosedConsumptions.php",
			function(data, status){
			loadConsumptions(data);
		});
	if (data=="null" || data=="") {
		$('#cashStatus').html("Cerrada");
		$('#openButtonCash').show();
		$('#freezeButtonCash').hide();
		$('#cancelButtonCash').hide();
		$('#closeButtonCash').attr('disabled','disabled');
		$('#saveExpensesButton').attr('disabled','disabled');
		$('.cashInputValue').attr('disabled','disabled');
		cleanCurrentCash();
		return;
	} 

	cash = JSON.parse(data);
	if(cash.status=="open"){
		$('#cashStatus').html("Abierta");
		$('#openButtonCash').hide();
		$('#cancelButtonCash').hide();
		$('#freezeButtonCash').show();
		$('#closeButtonCash').attr('disabled','disabled');
		$('#saveExpensesButton').removeAttr('disabled');
		$('.cashInputValue').removeAttr('disabled');
	}
	else if (cash.status=="frozen") {
		$('#cashStatus').html("Congelada");
		$('#openButtonCash').hide();
		$('#cancelButtonCash').show();
		$('#freezeButtonCash').hide();
		$('#closeButtonCash').removeAttr('disabled');
		$('#saveExpensesButton').removeAttr('disabled');
		$('.cashInputValue').removeAttr('disabled');
	}		

	$('#initialDateTime').html(cash.open);
	$('#finalDateTime').html(cash.closed);
	$('#initialCash').val(parseMoney(cash.initial_cash));
	$('#initialRegisteredCash').val(parseMoney(cash.initial_registered_cash));
	$('#finalCash').val(parseMoney(cash.final_cash));
	$('#cashFlow').val(parseMoney(cash.cash_flow));
	$('#expenses').val(parseMoney(cash.expenses));
	$('#paidCredit').val(parseMoney(cash.paid_credit));
	$('#calculatedSale').val(parseMoney(cash.calculated_sale));
	$('#registeredSale').val(parseMoney(cash.registered_sale));
	$('#cashExtraction').val(parseMoney(cash.cash_extraction));
	$('#newInitialCash').val(parseMoney(cash.new_initial_cash));
}

function cleanCurrentCash(){
	$('#initialDateTime').html("");
	$('#finalDateTime').html("");
	$('#initialCash').val("0.00");
	$('#initialRegisteredCash').val("0.00");
	$('#finalCash').val("0.00");
	$('#cashFlow').val("0.00");
	$('#expenses').val("0.00");
	$('#paidCredit').val("0.00");
	$('#calculatedSale').val("0.00");
	$('#registeredSale').val("0.00");
	$('#cashExtraction').val("0.00");
	$('#newInitialCash').val("0.00");
}

function parseMoney(value){
	return parseFloat(Math.round(value * 100) / 100).toFixed(2);
}