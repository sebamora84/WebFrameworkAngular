<?php
include '../Models/UserManager.php';

if(isset($_REQUEST['roleId']))
{
	$roleId = $_REQUEST['roleId'];
}
if(isset($_REQUEST['resourceId']))
{
	$resourceId = $_REQUEST['resourceId'];
}

$um = new UserManager();
$um->deleteRoleResource($roleId, $resourceId);
return;
?>