<?php

include_once '../Models/UserManager.php';

$um = new UserManager();
//encrypt password
$encryptedpassword = password_hash("superuser248" , PASSWORD_DEFAULT);
$newId = $um->createUser("superuser", "sebamora@gmail.com", $encryptedpassword);
?>