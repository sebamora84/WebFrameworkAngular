<?php
include '../Models/UserManager.php';
if(isset($_REQUEST['roleId']))
{
	$roleId = $_REQUEST['roleId'];
}

$um = new UserManager();
$um->deleteRole($roleId);
return;
?>