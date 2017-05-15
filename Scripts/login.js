var app = angular.module('loginApp',[]);
//Controller for login 
app.controller('loginCtrl', 
	function($scope,$location, $window, $http) {
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
				   var uri = getUrlParameter('uri') ;
				   $window.location.href = './'+uri;				   
			   }
			   else{
				   $scope.showError=true;				   
			   }
			});
		};

		function getUrlParameter(urlParameter){
			var sPageURL = window.location.search.substring(1);
			var sURLVariables = sPageURL.split('&');
		    for (var i = 0; i < sURLVariables.length; i++)
		    {
		        var sParameterName = sURLVariables[i].split('=');
		        if (sParameterName[0] == urlParameter)
		        {
		            return sParameterName[1];
		        }
		    }
		    return '';
		}
		//Initialization
		
});



