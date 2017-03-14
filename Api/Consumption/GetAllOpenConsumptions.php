<?php
include_once '../Models/ConsumptionManager.php';
$cm = new ConsumptionManager();
$consumptions = $cm->getAllOpenConsumptions();
echo json_encode($consumptions);
?>