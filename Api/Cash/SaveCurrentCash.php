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
$cash = $cam->getCurrentCash();

$cm = new ConsumptionManager();
$paidCredit = $cm->getPaidCreditTotalByCash($cash->id);
$registeredSale = $cm->getClosedConsumptionsTotalByCash($cash->id);
$registeredSale=floatval($registeredSale)+floatval($paidCredit);

$cam->updatePaidCredit($cash->id, $paidCredit);
$cam->updateRegisteredSale($cash->id, $registeredSale);
$cam->saveCash($cash->id, $initialCash, $finalCash, $cashExtraction);
echo json_encode($cam->getCurrentCash());
return;
?>