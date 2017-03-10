<?php
include '../Models/UserManager.php';
if(isset($_REQUEST['currentPassword']))
{
	$currentPassword = $_REQUEST['currentPassword'];
}
if(isset($_REQUEST['newPassword']))
{
	$newPassword = $_REQUEST['newPassword'];
}

session_start();
$username = $_SESSION["username"];

$um = new UserManager();
$authenticated = $um->isAuthenticated($username, $currentPassword);
if(!$authenticated){
	echo "INCORRECT";
	return;
}

$um->changePassword($username, $newPassword, false);
echo "CHANGED";
// remove all session variables
session_unset();
// destroy the session
session_destroy();
return;
?>