<?php
include_once '../Models/CashManager.php';
include_once '../Models/ConsumptionManager.php';

$cam = new CashManager();
$cam->freezeCash();
$frozenCash = $cam->getFrozenCash();

$cm = new ConsumptionManager();
$paidCredit = $cm->getPaidCreditTotalByDates($frozenCash->open, $frozenCash->closed);
$registeredSale = $cm->getClosedConsumptionsTotalByDates($frozenCash->open, $frozenCash->closed);
$registeredSale=floatval($registeredSale)+floatval($paidCredit);

$cam->updatePaidCredit($frozenCash->id, $paidCredit);
$cam->updateRegisteredSale($frozenCash->id, $registeredSale);

$consumptions = $cm->getOpenConsumptions();
if (sizeof($consumptions)>0){
	$cam->ensureOpenCash();
}

echo json_encode($cam->getCurrentCash());
return;
?>