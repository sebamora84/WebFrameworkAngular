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
$registeredSale = $cm->getClosedConsumptionsTotalByDates($frozenCash->open, $frozenCash->closed);
$cam->updateRegisteredSale($frozenCash->id, $registeredSale);
$cam->saveCash($frozenCash->id, $initialCash, $finalCash, $cashExtraction);
$cam->closeFrozenCash();
echo json_encode($cam->getCurrentCash());
return;
?>