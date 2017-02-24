<?php
include '../Models/UserManager.php';
if(isset($_REQUEST['username']))
{
    $username = $_REQUEST['username'];
}
else{
	$username = "";
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
$user = $um->getUserByName($username);
if($user==null){
	echo "Usuario o password incorrecto";
	return;
}
if(password_verify ( $password , $user->encryptedpassword )){

	session_start();
	
	$_SESSION["username"]=$user->username;
	header("Location:../../index.php");
}
else{
	echo "Usuario o password incorrecto";
}
?>