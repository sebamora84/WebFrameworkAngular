<?php
include '../Models/UserManager.php';
if(isset($_REQUEST['username']))
{
	$username = $_REQUEST['username'];
}

$um = new UserManager();
$um->deleteUserByName($username);
return;
?>