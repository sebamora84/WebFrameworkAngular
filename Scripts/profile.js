var app = angular.module('profileApp',[]);
//Controller for login 
app.controller('passwordCtrl', 
	function($scope, $window, $http) {
		//Link actions		
		$scope.savePassword = savePassword;
		$scope.triggerValidation = triggerValidation;
		$scope.triggerValidPassword = triggerValidPassword;
	    //Event listeners
				
	    //Functions		
		function triggerValidPassword(keyEvent) {
			$scope.passwordValid=true;
		};
		function triggerValidation(keyEvent) {
			validatePassword();
		};
		
		function savePassword(){
			//Validate password requirements before sending to server
			validatePassword();
			if(!$scope.lenghtValid || !$scope.leterValid || !$scope.numberValid){
				//TODO:focus on new password
				return;
			}
			if(!$scope.matchValid){
				//TODO:focus on repeat password
				return;
			}		
			//Send change request to server
			var newPassword = $scope.newPassword;
			var currentPassword = $scope.currentPassword;
			$http({
				 url: 'Api/User/ChangePassword.php',
			     method: 'POST',
			     data: 'currentPassword='+currentPassword+'&newPassword='+newPassword,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   if(response.data=="INCORRECT"){
				   //TODO:Focus on current password
				   $scope.passwordValid=false;	   
			   }
			   else{
					$window.location.href = './'+getUrlParameter('uri');	
			   }
			});			
		};

		function validatePassword(){
			//validate the length
			$scope.lenghtValid=$scope.newPassword.length >= 8;
			//validate letter
			$scope.leterValid=$scope.newPassword.match(/[A-z]/)!=null;
			//validate number
			$scope.numberValid=$scope.newPassword.match(/\d/)!=null;
			//validate confirm
			$scope.matchValid=$scope.newPassword==$scope.repeatPassword;
		}

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
		$scope.newPassword=''
		$scope.mustChange=getUrlParameter('m')=='reset';
		//validate the length
		$scope.lenghtValid=true;
		//validate letter
		$scope.leterValid=true;
		//validate number
		$scope.numberValid=true;
		//validate confirm
		$scope.matchValid=true;
		//Validate Password
		$scope.passwordValid=true;
		
});

