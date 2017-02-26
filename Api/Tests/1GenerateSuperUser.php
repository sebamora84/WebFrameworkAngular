<?php

include_once '../Models/UserManager.php';

$um = new UserManager();
//encrypt password

$newId = $um->createUser("superuser",  "superuser248!");

?>