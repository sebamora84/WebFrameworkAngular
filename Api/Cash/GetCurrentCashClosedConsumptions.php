<?php
include_once '../Models/ConsumptionManager.php';
include_once '../Models/CashManager.php';

$cam = new CashManager();
$cash = $cam->getCurrentCash();
if($cash==null){
	return;
}
$cm = new ConsumptionManager();
$consumptions = $cm->getClosedConsumptionsByCash($cash->id);
echo json_encode($consumptions);
?>