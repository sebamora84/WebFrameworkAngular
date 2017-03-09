<?php
include_once '../Models/UserManager.php';
$um = new UserManager();
$role = $um->getAllRoles();
echo json_encode($role);
?>