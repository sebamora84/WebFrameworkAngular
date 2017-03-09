
var users;
var selectedUser;
var allRoles;
var userRoles;
$(function() {
		loadAllRoles();
		loadAllUsers();
		
		$('#newUserButton').click(function(){
			$('#userEditor input').val("");
		});
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
		$('tr').has('td').click(function(){
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
	$.post("Api/User/GetAllRoles.php",
			function(data, status){
				allRoles = JSON.parse(data);
				if (allRoles.length == 0) { return; };
				$.each(allRoles, function(index, role) {					
					availableRole = $("#availableRoleTemplate").clone();
					$(availableRole).attr('id','role'+role.id);
					$(availableRole).find(".roleDescription").text(role.description);
					$("#availableRolesContainer").append(availableRole);	
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
					$(assignedRole).attr('id','role'+role.id);
					$(assignedRole).find(".roleDescription").text(role.description);
					$("#assignedRolesContainer").append(assignedRole);	
				});
	});
}

			