<?php
include '../Models/UserManager.php';
if(isset($_REQUEST['username']))
{
	$username = $_REQUEST['username'];
}
$um = new UserManager();
$um->changePassword($username, $username.'17', true);
return;
?>