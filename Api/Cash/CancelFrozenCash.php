<?php
include_once '../Models/CashManager.php';
include_once '../Models/ConsumptionManager.php';

$cam = new CashManager();
$cm = new ConsumptionManager();

$cam->cancelFrozenCash();

$openCash = $cam->ensureOpenCash();
$startDate = $openCash->open;
$endDate = $openCash->closed;
if($endDate == null){
	$endDate = date("Y-m-d H:i:s");
}

$paidCredit = $cm->getPaidCreditTotalByDates($startDate, $endDate);
$registeredSale = $cm->getClosedConsumptionsTotalByDates($startDate, $endDate);
$registeredSale=floatval($registeredSale)+floatval($paidCredit);

$cam->updatePaidCredit($openCash->id, $paidCredit);
$cam->updateRegisteredSale($openCash->id, $registeredSale);

echo json_encode($cam->getCurrentCash());
return;
?>