<?php
include_once '../Models/CashManager.php';

$cam = new CashManager();
$cash = $cam->ensureOpenCash();
echo json_encode($cam->getCurrentCash());
return;
?>