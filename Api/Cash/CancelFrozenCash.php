<?php
include_once '../Models/CashManager.php';
include_once '../Models/ConsumptionManager.php';

$cam = new CashManager();
$cm = new ConsumptionManager();

$cam->cancelFrozenCash();
$openCash = $cam->getOpenCash();
$registeredSale = $cm->getClosedConsumptionsTotalByDates($openCash->open, date("Y-m-d H:i:s"));
$cam->updateRegisteredSale($openCash->id, $registeredSale);
echo json_encode($cam->getCurrentCash());
return;
?>