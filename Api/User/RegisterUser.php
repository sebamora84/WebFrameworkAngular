<?php
include '../Models/UserManager.php';
if(isset($_REQUEST['username']))
{
    $username = $_REQUEST['username'];
}
if(isset($_REQUEST['password']))
{
    $password = $_REQUEST['password'];
}
$um = new UserManager();
$user = $um->getUserByName($username);
if ($user!=null && $user->id > 0){
	//return existing user
	echo "Usuario ya existe";
	return;
}
$newId = $um->createUser($username, $password);

$user = $um->getUser($newId);
header("Location:/users.html");
exit();
?>