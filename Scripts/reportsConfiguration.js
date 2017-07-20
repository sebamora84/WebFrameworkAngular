var app = angular.module('reportsConfigurationApp', []);


//Controller for reportResults 
app.controller('reportSelectorCtrl', 
	function($scope,$rootScope, $http) {
		//Link actions		
		$scope.selectedReportChanged = selectedReportChanged;
	    //Event listeners
		$rootScope.$on('reportWiped', function(event){
			$scope.selectedReport = null;
			loadAllReports();
			});
	    //Functions
		function selectedReportChanged(report){
			$scope.selectedReport = report;
			$scope.$emit('selectedReportChanged', report);
		}
		function loadAllReports(){
			$http.post('Api/Reports/GetAllReports.php')			
		   .then(function (response) {
			   $scope.reports=response.data;
			});	
		}		
		//Initializations
		loadAllReports();
		
		
});

//Controller for reportResults 
app.controller('reportEditorCtrl', 
	function($scope,$rootScope, $http) {
		//Link actions		
		$scope.newReport = newReport;
		$scope.saveReport = saveReport;
		$scope.deleteReport = deleteReport;
	    //Event listeners
		$rootScope.$on('selectedReportChanged', function(event, report){
			$scope.report = report;
			});
	    //Functions		
		function newReport(){
			$scope.report=null;
			$scope.$emit('reportWiped');
		}
		function deleteReport(){
			if($scope.report==null || $scope.report.id==null){
				return;
			}
			$http({
				 url: 'Api/Reports/DeleteReport.php',
			     method: 'POST',
			     data: 'reportId='+$scope.report.id,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   newReport();
			});
		}
		function saveReport(){
			if($scope.report==null || $scope.report.id==null){
				return;
			}
			var jsonReport = 'jsonReport[id]='+ $scope.report.id;
			jsonReport += '&jsonReport[description]='+ $scope.report.description;
			jsonReport+= '&jsonReport[sql]='+ $scope.report.sql;
			jsonReport+= '&jsonReport[parameters]='+ $scope.report.parameters;
			
			$http({
				 url: 'Api/Reports/SaveReport.php',
			     method: 'POST',
			     data: jsonReport,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   newReport();
			});
		}
});