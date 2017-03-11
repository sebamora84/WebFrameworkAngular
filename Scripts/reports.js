$(function(){
	loadAllReports();
	
	$('#reportExecute').click(function(){
		reportId = $("#reportSelect").val();
		jsonParameters = {};
		
		var parameters = JSON.parse(reports[reportId]["parameters"]);
		if (parameters.length == 0) { return; };
		$.each(parameters, function(index, parameter){
			name = parameter.name;							
			inputId='parameter'+name;
			jsonParameters[':'+name]= $('#'+inputId).val();
		
		});
		
		$.post("Api/Reports/ExecuteReport.php",
				{reportId:reportId, jsonParameters:jsonParameters },
				function(data, status){
					$('#reportResultTable thead').empty();
					$('#reportResultTable tbody').empty();
					reportResult = JSON.parse(data);
					if (reportResult.length == 0) { 
						$('#reportResultTable thead').append('<tr><th><label>Sin Resultados</label></th></tr>');
						return; 
					};
					firstItem=reportResult[0];
					$('#reportResultTable thead').append('<tr></tr>');
					for(key in firstItem) {
						$('#reportResultTable thead tr').append('<th><label>'+key+'</label></th>');						
					}
					
					
					$.each(reportResult, function(index, reportItem){
						$('#reportResultTable tbody').append('<tr id="row'+index+'"></tr>');
						for(key in firstItem) {
							$('#row'+index).append('<td><label>'+reportItem[key]+'</label></td>');
						}
					});
					
			
		});
	});
	
	
});
var reports;
function loadAllReports(){
			
			//build productTable header	
			$.post("Api/Reports/GetAllReports.php",
					function(data, status){
				$("#reportSelect").empty();
				reports = JSON.parse(data);
				if (reports.length == 0) { return; };
				$.each(reports, function(index, report){					
					$("#reportSelect").append(
							'<option value="' +report.id + '">' + report.description + '</option>');
				});
				
				$("#reportSelect").change(function(e){
					
					reportId = $(this).val();
					loadReportParameters(reportId);
				});
				$("#reportSelect").change();				
			});
			
			
}

function loadReportParameters(reportId){
	$('#reportParameters').empty();
	var parameters = JSON.parse(reports[reportId]["parameters"]);
	if (parameters.length == 0) { return; };
	$.each(parameters, function(index, parameter){
		name = parameter.name;
		type = parameter.type;
		description = parameter.description;
		defval = parameter.defval;
		
		inputId='parameter'+name;
		if(type == "datetime"){
			$('#reportParameters').append(
					'<div>' +
						'<label for="' + inputId + '">' + description + '</label>'+
						'<input type="text" id="' + inputId + '">' +
					'</div>'						
					);
			$('#'+inputId).datetimepicker({
				startDate:'-1970/01/02',
				format:'Y-m-d H:i:s'
				});
			$.datetimepicker.setLocale('es');
		}
		else if(type == "select"){
			$('#reportParameters').append(
					'<div>' +
						'<label for="' + inputId + '">' + description + '</label>'+
						'<select id="' + inputId + '"> </select>' );
			$.each(defval, function(index, val){
				$('#'+inputId).append('<option value="' +val.value + '">' + val.description + '</option>');
			});	
		}
		else{
			$('#reportParameters').append(
					'<div>' +
						'<label for="' + inputId + '">' + description + '</label>'+
						'<input type="text" id="' + inputId + '">' +
					'</div>'						
					);
		}

		
	});
}