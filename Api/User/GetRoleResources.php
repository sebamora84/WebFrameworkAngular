<?php
include_once '../Models/UserManager.php';
if(isset($_REQUEST['roleId']))
{
	$roleId= $_REQUEST['roleId'];
}
$um = new UserManager();
$role= $um->getRole($roleId);
echo json_encode($role->sharedResource);
?>