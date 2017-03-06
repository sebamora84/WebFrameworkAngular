$(function(){
	
	
	$('#newReportButton').click(function(){
		$('.reportEditor input').val("");
		$('.reportEditor textarea').val("");
	});
	$('#saveReportButton').click(function(){

		jsonReport = {};
		jsonReport["id"]=$('#reportId').val();
		jsonReport["description"]=$('#reportDescription').val();
		jsonReport["sql"]=$('#reportSql').val();
		jsonReport["parameters"]=$('#reportParameters').val();
		
		$.post("Api/Reports/SaveReport.php",
				{jsonReport:jsonReport },
				function(data, status){
					$('.reportEditor input').val("");
					$('.reportEditor textarea').val("");
					loadAllReports();
			});
	});
	$('#deleteReportButton').click(function(){
		reportId=$('#reportId').val();
		$.post("Api/Reports/DeleteReport.php",
				{reportId:reportId },
				function(data, status){
					$('.reportEditor input').val("");
					$('.reportEditor textarea').val("");
					loadAllReports();
			});
	});
	
	loadAllReports();
});

function loadAllReports(){
	

			
			//build productTable header	
			$.post("Api/Reports/GetAllReports.php",
					function(data, status){
				$("#reportDetailTable tbody").empty();
				var reports = JSON.parse(data);
				if (reports.length == 0) { return; };
				$.each(reports, function(index, report){					
					$("#reportDetailTable tbody").append(
							'<tr id="report'+report.id+'">'+
								'<td class="col1">'+
									'<label id="reportId'+report.id+'">'+report.id+'</label>'+
								'</td>'+
								'<td>'+
									'<label id="reportDescription'+report.id+'" >'+report.description+'</label>'+
								'</td>'+
								'<td>'+
									'<label id="reportSql'+report.id+'" >'+report.sql+'</label>'+
								'</td>'+
								'<td>'+
									'<label id="reportParameters'+report.id+'" >'+report.parameters+'</label>'+
								'</td>'+
							'</tr>');				   
				});
							
				//Load the report Editor
				$('tr').has('td').click(function(){
					$('.reportEditor input').val("");
					
				    report = $(this).find('td label');
				    reportId = report[0].innerHTML;
				    reportDescription=report[1].innerHTML;
				    reportSql=report[2].innerHTML;
				    reportParameters=report[3].innerHTML;
				    $('#reportId').val(reportId);
				    $('#reportDescription').val(reportDescription);
				    $('#reportSql').val(reportSql);
				    $('#reportParameters').val(reportParameters);
				});
	
			});	


}