<?php
include '../Models/UserManager.php';
if(isset($_REQUEST['username']))
{
    $username = $_REQUEST['username'];
}
if(isset($_REQUEST['email']))
{
    $email = $_REQUEST['email'];
}
if(isset($_REQUEST['password']))
{
    $password = $_REQUEST['password'];
}
if(	session_id()){
	// remove all session variables
	session_unset();
	// destroy the session
	session_destroy();
}

$um = new UserManager();
$authenticated = $um->isAuthenticated($username, $password);
if($authenticated){
	session_start();
	$_SESSION["username"]=$username;
	echo "OK";
	return;
}
echo "NOK";
return;

?>
