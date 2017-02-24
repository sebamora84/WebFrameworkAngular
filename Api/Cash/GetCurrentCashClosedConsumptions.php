<?php
include_once '../Models/ConsumptionManager.php';
include_once '../Models/CashManager.php';

$cam = new CashManager();
$cash = $cam->getCurrentCash();
if($cash==null){
	return;
}
$startDate = $cash->open;
$endDate = $cash->closed;
if($endDate == null){
	$endDate = date("Y-m-d H:i:s");
}
$cm = new ConsumptionManager();
$consumptions = $cm->getClosedConsumptionsByDates($startDate, $endDate);
echo json_encode($consumptions);
?>