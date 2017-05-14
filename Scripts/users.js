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

$(function() {
		return;
		
		
		
		
		$('#saveRoleButton').click(function(){
			roleDescription = $("#roleDescription").val();
			if (roleDescription==""){
				return;
			}
			$.post("Api/User/SaveRole.php",
					{roleDescription:roleDescription },
					function(data, status){
						$('#roleDescription').val("");
						loadAllRoles();
						loadUserRoles();
				});
		});
		$('#deleteRoleButton').click(function(){
			roleId = selectedRole.id;
			if (roleId==""){
				return;
			}
			$.post("Api/User/DeleteRole.php",
					{roleId:roleId },
					function(data, status){
						loadAllRoles();
						loadUserRoles();
				});
		});
});
function loadAllRoles(){
	$("#availableRolesContainer").empty();
	$("#roleTable tbody").empty();
	$.post("Api/User/GetAllRoles.php",
			function(data, status){
				allRoles = JSON.parse(data);
				if (allRoles.length == 0) { return; };
				$.each(allRoles, function(index, role) {					
					availableRole = $("#availableRoleTemplate").clone();
					$(availableRole).attr('id','availableRole'+role.id);
					$(availableRole).find(".roleDescription").text(role.description);
					$("#availableRolesContainer").append(availableRole);
					
					$("#roleTable tbody").append(
							'<tr id="role'+role.id+'">'+
								'<td class="col1">'+
									'<label id="roleId'+role.id+'">'+role.id+'</label>'+
								'</td>'+
								'<td>'+
									'<label id="role'+role.id+'" class="roleDescription">'+role.description+'</label>'+
								'</td>'+
								
							'</tr>');
				});
				$( ".buttonAddRole" ).click(function(event) {
					if(selectedUser==null){
						return;
					}
					roleId = $(this).closest('.availableRole')[0].id.replace('availableRole','');
					username = selectedUser.username;
					$.post("Api/User/AssignRole.php",
					{username:username, roleId:roleId},
					function(data, status){
							loadUserRoles();						
					});
				});
				
				//Load the selected role
				$('#roleTable tr').has('td').click(function(){
					$('tr').removeClass('trSelected');
					$(this).addClass('trSelected');
									
					roleId = $(this).find('td label')[0].innerHTML;
					    selectedRole = allRoles[roleId];
					    loadRoleResources();
				});
	});
}
function loadAllResources(){
	$("#availableResourcesContainer").empty();
	$.post("Api/User/GetAllResources.php",
			function(data, status){
				allResources = JSON.parse(data);
				if (allResources.length == 0) { return; };
				$.each(allResources, function(index, resource) {					
					availableResource = $("#availableResourceTemplate").clone();
					$(availableResource).attr('id','availableResource'+resource.id);
					$(availableResource).find(".resourceDescription").text(resource.description);
					$("#availableResourcesContainer").append(availableResource);	
				});
				$( ".buttonAddResource" ).click(function(event) {
					if(selectedRole==null){
						return;
					}
					resourceId = $(this).closest('.availableResource')[0].id.replace('availableResource','');
					roleId = selectedRole.id;
					$.post("Api/User/AssignResource.php",
					{roleId:roleId, resourceId:resourceId},
					function(data, status){
						loadRoleResources();	
					});
				});
	});
}

function loadUserRoles(){
	$("#assignedRolesContainer").empty();
	if(selectedUser==null){
		return;
	}
	$.post("Api/User/GetUserRoles.php",
			{username:selectedUser.username},
			function(data, status){
				userRoles = JSON.parse(data);
				if (userRoles.length == 0) { return; };
				$.each(userRoles, function(index, role) {					
					assignedRole = $("#assignedRoleTemplate").clone();
					$(assignedRole).attr('id','assignedRole'+role.id);
					$(assignedRole).find(".roleDescription").text(role.description);
					$("#assignedRolesContainer").append(assignedRole);	
				});
				$( ".buttonRemoveRole" ).click(function(event) {
					if(selectedUser==null){
						return;
					}
					roleId = $(this).closest('.assignedRole')[0].id.replace('assignedRole','');
					username = selectedUser.username;
					$.post("Api/User/UnassignRole.php",
					{username:username, roleId:roleId},
					function(data, status){
							loadUserRoles();						
					});
				});
	});
}
function loadRoleResources(){
	$("#assignedResourcesContainer").empty();
	if(selectedRole==null){
		return;
	}
	$.post("Api/User/GetRoleResources.php",
			{roleId:selectedRole.id},
			function(data, status){
				roleResources = JSON.parse(data);
				if (roleResources.length == 0) { return; };
				$.each(roleResources, function(index, resource) {					
					assignedResource = $("#assignedResourceTemplate").clone();
					$(assignedResource).attr('id','assignedResource'+resource.id);
					$(assignedResource).find(".resourceDescription").text(resource.description);
					$("#assignedResourcesContainer").append(assignedResource);
				});
				$( ".buttonRemoveResource" ).click(function(event) {
					if(selectedRole==null){
						return;
					}
					resourceId = $(this).closest('.assignedResource')[0].id.replace('assignedResource','');
					roleId = selectedRole.id;
					$.post("Api/User/UnassignResource.php",
					{roleId:roleId, resourceId:resourceId},
					function(data, status){
						loadRoleResources();						
					});
				});
	});
}

			