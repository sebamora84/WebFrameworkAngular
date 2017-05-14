var app = angular.module('usersApp', []);

//Controller for users 
app.controller('usersCtrl', 
	function($scope,$rootScope, $http) {
		//Link actions		
		$scope.selectedUserChanged = selectedUserChanged;
		$scope.generateNewUser = generateNewUser;
		$scope.resetUser = resetUser;
		$scope.deleteUser = deleteUser;
	    //Event listeners
				
	    //Functions
		function loadAllUsers(){
	    	$http.post("Api/User/GetAllUsers.php")
	        .then(function (response) {
	        	$scope.users = response.data;
	        	});	
	    }
	    function selectedUserChanged(user) {
			$scope.selectedUser= user;
			$scope.$emit('selectedUserChanged', $scope.selectedUser);
			};
				
		function generateNewUser(){
			var newUserName = $scope.newUserName;
			$scope.newUserName="";
			$http({
				 url: 'Api/User/SaveUser.php',
			     method: 'POST',
			     data: 'username='+newUserName,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   loadAllUsers();
			});				
		};
		function resetUser(){
			$http({
				 url: 'Api/User/ResetPassword.php',
			     method: 'POST',
			     data: 'username='+$scope.selectedUser.username,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   loadAllUsers();
			});				
		};
		function deleteUser(){
			$http({
				 url: 'Api/User/DeleteUser.php',
			     method: 'POST',
			     data: 'username='+$scope.selectedUser.username,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   loadAllUsers();
			});				
		};

		//Initializations
		loadAllUsers();
});


//Controlelr for assigned roles 
app.controller('assignedRolesCtrl', 
		function($scope, $rootScope, $http) {
		//Link actions
	    $scope.unassignRole = unassignRole;
	    
	    //Event listeners
		$rootScope.$on('selectedUserChanged', function(event, selectedUser){
			$scope.selectedUser = selectedUser;
			loadAssignedRoles();
			});
		$rootScope.$on('roleAssigned', function(event, role){
			loadAssignedRoles();
			});
		$rootScope.$on('rolesLoaded', function(event, roles){
			loadAssignedRoles();
			});
		//Functions
		function unassignRole(role){
			//Check there's a selected user
			if($scope.selectedUser==null){
				$scope.assignedRoles==null;
				return;
			}
			
			$http({
				 url: 'Api/User/UnassignRole.php',
			     method: 'POST',
			     data: 'username='+$scope.selectedUser.username+'&roleId='+role.id,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   loadAssignedRoles();
			});
		}	
		function loadAssignedRoles() {
			//Check there's a selected user
			if($scope.selectedUser==null){
				$scope.assignedRoles==null;
				return;
			}
			
			//load the roles
			$http({
			 url: 'Api/User/GetUserRoles.php',
		     method: 'POST',
		     data: "username="+$scope.selectedUser.username,
		     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		    .then(function (response) {
		    	$scope.assignedRoles = response.data;
		    	});
		};	
	});

//Controller for available roles 
app.controller('availableRolesCtrl', 
	function($scope, $rootScope, $http) {
		//Link actions
		$scope.assignRole = assignRole;
		
		//Event Listeners
		$rootScope.$on('selectedUserChanged', function(event, selectedUser){
			$scope.selectedUser = selectedUser;
			});
		
		$rootScope.$on('rolesLoaded', function(event, roles){
			$scope.availableRoles = roles;
			});
		//Functions
		function assignRole(role){
			//Check there's a selected user
			if($scope.selectedUser==null){
				return;
			}
			
			$http({
				 url: 'Api/User/AssignRole.php',
			     method: 'POST',
			     data: 'username='+$scope.selectedUser.username+'&roleId='+role.id,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   $scope.$emit('roleAssigned', role);
			});
		}
});



//Controller for roles 
app.controller('rolesCtrl', 
	function($scope, $rootScope, $http) {
		//Link actions
		$scope.selectedRoleChanged = selectedRoleChanged;
		$scope.generateNewRole = generateNewRole;
		$scope.deleteRole = deleteRole;
		//Event listeners
		
		//Functions
		function loadAllRoles(){
	    	$http.post("Api/User/GetAllRoles.php")
	        .then(function (response) {
	        	$scope.roles = response.data;
	        	$scope.$emit('rolesLoaded', $scope.roles);
	        	});	
	    }
		function selectedRoleChanged(role) {
			$scope.selectedRole= role;
			$scope.$emit('selectedRoleChanged', $scope.selectedRole);
			};
		function generateNewRole(){
			var newRoleDescription = $scope.newRoleDescription;
			$scope.newRoleDescription="";
			$http({
				 url: 'Api/User/SaveRole.php',
			     method: 'POST',
			     data: 'roleDescription='+newRoleDescription,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   loadAllRoles();
			});				
		};
		function deleteRole(){
			$http({
				 url: 'Api/User/DeleteRole.php',
			     method: 'POST',
			     data: 'roleId='+$scope.selectedRole.id,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   loadAllRoles();
			});				
		};
		//Initialization
		loadAllRoles();		
});



//Controlelr for assigned resources 
app.controller('assignedResourcesCtrl', 
		function($scope, $rootScope, $http) {
		//Link actions
	    $scope.unassignResource = unassignResource;
	    
	    //Event listeners
		$rootScope.$on('selectedRoleChanged', function(event, selectedRole){
			$scope.selectedRole = selectedRole;
			loadAssignedResources();
			});
		$rootScope.$on('resourceAssigned', function(event, resource){
			loadAssignedResources();
			});
		//Functions
		function unassignResource(resource){
			//Check there's a selected user
			if($scope.selectedRole==null){
				$scope.assignedResources==null;
				return;
			}
			
			$http({
				 url: 'Api/User/UnassignResource.php',
			     method: 'POST',
			     data: 'roleId='+$scope.selectedRole.id+'&resourceId='+resource.id,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   loadAssignedResources();
			});
		}	
		function loadAssignedResources() {
			//Check there's a selected role
			if($scope.selectedRole==null){
				$scope.assignedResources==null;
				return;
			}
			
			//load the resources
			$http({
			 url: 'Api/User/GetRoleResources.php',
		     method: 'POST',
		     data: "roleId="+$scope.selectedRole.id,
		     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		    .then(function (response) {
		    	$scope.assignedResources = response.data;
		    	});
		};	
	});


//Controller for available roles 
app.controller('availableResourcesCtrl', 
	function($scope, $rootScope, $http) {
		//Link actions
		$scope.assignResource = assignResource;
		
		//Event Listeners
		$rootScope.$on('selectedRoleChanged', function(event, selectedRole){
			$scope.selectedRole = selectedRole;
			});
		
		//Functions
		function loadAllResources(){
	    	$http.post("Api/User/GetAllResources.php")
	        .then(function (response) {
	        	$scope.availableResources = response.data;	        	
	        	});	
	    }
		function assignResource(resource){
			//Check there's a selected role
			if($scope.selectedRole==null){
				return;
			}
			
			$http({
				 url: 'Api/User/AssignResource.php',
			     method: 'POST',
			     data: 'roleId='+$scope.selectedRole.id+'&resourceId='+resource.id,
			     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},	
			})			
		   .then(function (response) {
			   $scope.$emit('resourceAssigned', resource);
			});
		}
		//Initialization
		loadAllResources();
});			