<?php
include_once '../Models/ConsumptionManager.php';
$cm = new ConsumptionManager();
$consumptionTypes = $cm->getAllConsumptionTypes();
echo json_encode($consumptionTypes);
?>