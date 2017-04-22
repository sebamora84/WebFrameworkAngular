<?php
include_once '../Models/CashManager.php';
include_once '../Models/ConsumptionManager.php';

$cam = new CashManager();
$cm = new ConsumptionManager();

//Move all consumptions from open cash to frozen cash
$openCash = $cam->getOpenCash();
if($openCash != null){
	$consumptions = $openCash->ownConsumptionList;	
	if (sizeof($consumptions)>0){
		$frozenCash = $cam->getFrozenCash();
		foreach ($consumptions as &$consumption){
			$cm->updateConsumptionCash($consumption->id, $frozenCash->id);
		}
	}
	$items = $openCash->ownCredititemList;
	if (sizeof($items)>0){
		$frozenCash = $cam->getFrozenCash();
		foreach ($items as &$item){
			$cm->updateCreditItemCash($item->id, $frozenCash->id);
		}
	}
}
//Delete open cash and reopen frozen cash
$cam->cancelFrozenCash();

//Update new open cash values
$openCash = $cam->ensureOpenCash();
$paidCredit = $cm->getPaidCreditTotalByCash($openCash->id);
$registeredSale = $cm->getClosedConsumptionsTotalByCash($openCash->id);
$registeredSale=floatval($registeredSale)+floatval($paidCredit);

$cam->updatePaidCredit($openCash->id, $paidCredit);
$cam->updateRegisteredSale($openCash->id, $registeredSale);

echo json_encode($cam->getCurrentCash());
return;
?>