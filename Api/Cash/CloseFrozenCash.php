<?php
include_once '../Models/CashManager.php';
include_once '../Models/ConsumptionManager.php';
if(isset($_REQUEST['initialCash']))
{
	$initialCash = $_REQUEST['initialCash'];
}
if(isset($_REQUEST['finalCash']))
{
	$finalCash = $_REQUEST['finalCash'];
}
if(isset($_REQUEST['cashExtraction']))
{
	$cashExtraction = $_REQUEST['cashExtraction'];
}

$cam = new CashManager();
$frozenCash = $cam->getFrozenCash();

$cm = new ConsumptionManager();
$paidCredit = $cm->getPaidCreditTotalByCash($frozenCash->id);
$registeredSale = $cm->getClosedConsumptionsTotalByCash($frozenCash->id);
$registeredSale=floatval($registeredSale)+floatval($paidCredit);

$cam->updatePaidCredit($frozenCash->id, $paidCredit);
$cam->updateRegisteredSale($frozenCash->id, $registeredSale);
$cam->saveCash($frozenCash->id, $initialCash, $finalCash, $cashExtraction);
$cam->closeFrozenCash();
$frozenCash->fresh();
$currentCash = $cam->getCurrentCash();
if($currentCash==null){
	echo "no open cash";
	return;
}

$cam->updateInitialCash($currentCash->id, $frozenCash->newInitialCash);
$currentCash->fresh();
echo json_encode($currentCash);
return;
?>