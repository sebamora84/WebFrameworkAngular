<?php
include_once '../Models/UserManager.php';
$um = new UserManager();
$users = $um->getAllUsers();
echo json_encode($users);
?>