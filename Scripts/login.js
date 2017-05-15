var app = angular.module('loginApp', []);
//Controller for login 
app.controller('loginCtrl', 
	function($scope,$location,$window, $http) {
		//Link actions		
		$scope.login = login;
		$scope.triggerLogin = triggerLogin;
	    //Event listeners
				
	    //Functions		
		function triggerLogin(keyEvent) {
			  if (keyEvent.which === 13){
				  login();
			  }
			  else{
				  $scope.showError=false; 
			  }			    
		};
		
		function login(){
			var username = $scope.username;
			var password = $scope.password;
			
			$http({
				 url: 'Api/User/Login.php',
			     method: 'POST',
			     data: 'username='+username+'&password='+password,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   if(response.data=="OK"){
				   //TODO: check url parameters
				   //var params = $location.search();
				   $window.location.href = './';				   
			   }
			   else{
				   $scope.showError=true;				   
			   }
			});				
		};
		//Initialization
		
});
