<?php
include_once '../Models/UserManager.php';

$um = new UserManager();

$resources = $um->getAllResources();

echo json_encode($resources);
?>