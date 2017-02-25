<?php

include_once '../Models/UserManager.php';

$um = new UserManager();
//encrypt password

$newId = $um->createUser("superuser", "sebamora@gmail.com", "superuser248");

?>