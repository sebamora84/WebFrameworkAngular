<?php
include '../Models/UserManager.php';
if(isset($_REQUEST['username']))
{
	$username = $_REQUEST['username'];
}
if(isset($_REQUEST['roleId']))
{
	$roleId = $_REQUEST['roleId'];
}

$um = new UserManager();
$user=$um->getUserByName($username);
$um->deleteUserRole($user->id, $roleId);
return;
?>