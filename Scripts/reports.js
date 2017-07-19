var app = angular.module('reportsApp', []);

//Controller for reportResults 
app.controller('reportResultCtrl', 
	function($scope,$rootScope, $http) {
		//Link actions	
	    //Event listeners
		$rootScope.$on('reportExecuted', function(event, columnNames, reportItems){
			$scope.columnNames = columnNames;
			$scope.reportItems = reportItems;
			
			});
	    //Functions
		//Initializations
});


//Controller for reportResults 
app.controller('reportExecutionCtrl', 
	function($scope,$rootScope, $http) {
		//Link actions		
		$scope.executeSelectedReport = executeSelectedReport;
		$scope.setDateTime=setDateTime;
	    //Event listeners
		
	    //Functions
		function executeSelectedReport() {
			//TODO: migrate method to Angular
			var jsonParameters ="";
			$.each($scope.selectedReport.parameters, function(index, parameter){
				jsonParameters+='&jsonParameters[:'+parameter.name+']='+ parameter.selectedValue;			
			});
			
			$http({
				 url: 'Api/Reports/ExecuteReport.php',
			     method: 'POST',
			     data: 'reportId='+$scope.selectedReport.id+jsonParameters ,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   var reportResult=response.data;
			   if(reportResult.length==0){
					 var columnNames=['Sin Resultados'];						 
				 }
				 else{
					   var columnNames=Object.keys(reportResult[0]);
				 }
			   $scope.$emit('reportExecuted', columnNames, reportResult);
			});	
		};

		function loadAllReports(){	
			$http.post("Api/Reports/GetAllReports.php")
	        .then(function (response) {
	        	$scope.reports=response.data;
	        	angular.forEach($scope.reports, function(report){ 
	        		report.parameters= angular.fromJson(report.parameters);
	        		angular.forEach(report.parameters, function(parameter){ 
	        			parameter.selectedValue= parameter.defval;
	        			
	        		});
	        	   });
	        	});
		}
		function setDateTime(){
			$('.datetimePicker').datetimepicker({
				startDate:'-1970/01/02',
				format:'Y-m-d H:i:s'
				});
			$.datetimepicker.setLocale('es');
			return true;
		}
		//Initializations
		loadAllReports();
		
		
});



$(function(){
	return;
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
function loadAllReportsx(){
			
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