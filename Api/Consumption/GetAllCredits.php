<?php
include_once '../Models/ConsumptionManager.php';
$cm = new ConsumptionManager();
echo json_encode($cm->getAllCredits());
?>