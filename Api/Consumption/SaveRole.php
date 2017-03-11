<?php
include '../Models/UserManager.php';
if(isset($_REQUEST['roleDescription']))
{
	$roleDescription = $_REQUEST['roleDescription'];
}

$um = new UserManager();
$um->createRole($roleDescription);
return;
?>
