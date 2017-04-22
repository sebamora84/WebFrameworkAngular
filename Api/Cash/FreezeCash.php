<?php
include_once '../Models/CashManager.php';
include_once '../Models/ConsumptionManager.php';

$cam = new CashManager();
$cam->freezeCash();
$frozenCash = $cam->getFrozenCash();


$cm = new ConsumptionManager();
$paidCredit = $cm->getPaidCreditTotalByCash($frozenCash->id);
$registeredSale = $cm->getClosedConsumptionsTotalByCash($frozenCash->id);
$registeredSale=floatval($registeredSale)+floatval($paidCredit);

$cam->updatePaidCredit($frozenCash->id, $paidCredit);
$cam->updateRegisteredSale($frozenCash->id, $registeredSale);


$consumptions = $cm->getAllOpenConsumptions();
if (sizeof($consumptions)>0){
	$openCash = $cam->ensureOpenCash();
	foreach ($consumptions as &$consumption){
		$cm->updateConsumptionCash($consumption->id, $openCash->id);
	}
}

echo json_encode($cam->getCurrentCash());
return;
?>