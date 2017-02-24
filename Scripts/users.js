
$(function() {			
		validateFields();
		loadAllUsers()
	});			
function validatePassword (){
	var pswd = $(password).val();
	//validate the length
	if ( pswd.length < 8 ) {
		$('#length').removeClass('valid').addClass('invalid');
	} else {
		$('#length').removeClass('invalid').addClass('valid');
	}
	
	//validate letter
	if ( pswd.match(/[A-z]/) ) {
		$('#letter').removeClass('invalid').addClass('valid');
	} else {
		$('#letter').removeClass('valid').addClass('invalid');
	}

	//validate number
	if ( pswd.match(/\d/) ) {
		$('#number').removeClass('invalid').addClass('valid');
	} else {
		$('#number').removeClass('valid').addClass('invalid');
	}
	
	//validate confirm
	var confirm_pswd = $(confirm_password).val();
	if(pswd===confirm_pswd)	{
		$('#match').removeClass('invalid').addClass('valid');
	} else {
		$('#match').removeClass('valid').addClass('invalid');
	}
}
function loadAllUsers(){
	$.post("Api/User/GetAllUsers.php",
			function(data, status){
		$("#usersList").empty();
		var users = JSON.parse(data);
		if (users.length == 0) { return; };
		$("#usersList").append('<tr><th><label>Id</label></th><th><label>Usuario</label></th><th><label>Email</label></th></tr>');
		
		$.each(users, function(index, user){					
			$("#usersList").append(
					'<tr id="user'+user.id+'">'+
						'<td class="col1">'+
							'<label id="userId'+user.id+'">'+user.id+'</label>'+
						'</td>'+
						'<td>'+
							'<label id="username'+user.id+'" class="username">'+user.username+'</label>'+
						'</td>'+
						'<td>'+
							'<label id="userEmail'+user.id+'" class="userEmail">'+user.email+'</label>'+
						'</td>'+
					'</tr>');			
		});
		usersList = new List('usersDetail', {
			valueNames: [ 'username', 'userEmail']
		});
	});
}		
function validateFields(){
		$('#password').keyup(function() {
			validatePassword();
		}).focus(function() {
			$('#pswd_info').show();
		}).blur(function() {
			$('#pswd_info').hide();
		});
		$('#confirm_password').keyup(function() {
			validatePassword();
		}).focus(function() {
			$('#pswd_match').show();
		}).blur(function() {
			$('#pswd_match').hide();
		});
		
		$( '#userform' ).submit(function( event ) {
			if ( $('#letter').attr('class') !== "valid" ||
				$('#number').attr('class') !== "valid" ||
				$('#length').attr('class') !== "valid") {					
				event.preventDefault();
				$('#password').focus();
				return;
			}
			if ( $('#match').attr('class') !== "valid") {
				event.preventDefault();
				$('#confirm_password').focus();
				return;
			}
		});
}

			