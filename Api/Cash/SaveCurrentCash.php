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

$startDate = $cash->open;
$endDate = $cash->closed;
if($endDate == null){
	$endDate = date("Y-m-d H:i:s");
}
$cm = new ConsumptionManager();
$registeredSale = $cm->getClosedConsumptionsTotalByDates($startDate, $endDate);

$cam->updateRegisteredSale($cash->id, $registeredSale);
$cam->saveCash($cash->id, $initialCash, $finalCash, $cashExtraction);
echo json_encode($cam->getCurrentCash());
return;
?>