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
