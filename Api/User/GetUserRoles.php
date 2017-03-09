<?php
include_once '../Models/UserManager.php';
if(isset($_REQUEST['username']))
{
	$username = $_REQUEST['username'];
}
$um = new UserManager();
$user = $um->getUserByName($username);
echo json_encode($user->sharedRole);
?>