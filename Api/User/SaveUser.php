<?php
include '../Models/UserManager.php';
if(isset($_REQUEST['username']))
{
	$username = $_REQUEST['username'];
}


$um = new UserManager();
$user = $um->getUserByName($username);
if ($user!=null && $user->id > 0){
	//return existing user
	echo "EXISTS";
	return;
}
$password=$username.'17';
$um->createUser($username, $password);
return;
?>