
var users;
var selectedUser;
var allRoles;
var userRoles;
var selectedRole;
var allResources;
var roleResources;
$(function() {

		loadAllResources();
		loadAllRoles();
		loadAllUsers();
		
		$('#resetUserButton').click(function(){
			username = selectedUser.username;
			if (username==""){
				return;
			}
			$.post("Api/User/resetPassword.php",
					{username:username },
					function(data, status){
						loadAllUsers();
				});
		});
		$('#saveUserButton').click(function(){
			username = $("#userName").val();
			if (username==""){
				return;
			}
			$.post("Api/User/SaveUser.php",
					{username:username },
					function(data, status){
						$('#userName').val("");
						loadAllUsers();
				});
		});
		$('#deleteUserButton').click(function(){
			username = selectedUser.username;
			if (username==""){
				return;
			}
			$.post("Api/User/DeleteUser.php",
					{username:username },
					function(data, status){
						loadAllUsers();
				});
		});
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
function loadAllUsers(){
	$.post("Api/User/GetAllUsers.php",
			function(data, status){
		$("#userTable tbody").empty();
		users = JSON.parse(data);
		if (users.length == 0) { return; };
		
		$.each(users, function(index, user){					
			$("#userTable tbody").append(
					'<tr id="user'+user.id+'">'+
						'<td class="col1">'+
							'<label id="userId'+user.id+'">'+user.id+'</label>'+
						'</td>'+
						'<td>'+
							'<label id="username'+user.id+'" class="username">'+user.username+'</label>'+
						'</td>'+
						'<td>'+
							'<label id="userReset'+user.id+'" class="userEmail">'+user.reset+'</label>'+
						'</td>'+
					'</tr>');			
		});
		//Load the selected user
		$('#userTable tr').has('td').click(function(){
			$('tr').removeClass('trSelected');
			$(this).addClass('trSelected');
							
			userId = $(this).find('td label')[0].innerHTML;
			    selectedUser = users[userId];
			    loadUserRoles();
		});
	});
}
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

			