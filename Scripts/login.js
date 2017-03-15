$(function(){
	$('#btnStartSession').click(function(event){
		$("#wrong_user").hide();
		username=$("#username").val();
		password=$("#password").val();
		if(username=="" || password==""){
			$("#wrong_user").show()
			return;
		}
		$.post("Api/User/Login.php",
				{username:username, password:password},
				function(data, status){
					if(data!="OK"){
						$("#wrong_user").show()
						return;
					}
					redirect = GetURLParameter("uri");
					if(redirect== null){
						$(location).attr('href',"./");
						return;
					}
					$(location).attr('href',"./"+redirect);
			});
	});
	
	$('input').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $('#btnStartSession').trigger("click");
	    }
	})
});

function GetURLParameter(urlParameter){
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
}