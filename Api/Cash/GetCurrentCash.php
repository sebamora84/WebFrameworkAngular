<?php
include_once '../Models/CashManager.php';

$cam = new CashManager();
echo json_encode($cam->getCurrentCash());
return;
?>