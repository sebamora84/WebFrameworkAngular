<?php

include_once '../Models/UserManager.php';

$um = new UserManager();
//encrypt password

if(isset($_REQUEST['username']))
{
	$username = $_REQUEST['username'];
}

$auths =$um->getUserAuthorizations($username);
echo json_encode($auths);
?>