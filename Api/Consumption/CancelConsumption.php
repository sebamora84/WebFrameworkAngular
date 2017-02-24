<?php
include_once '../Models/ConsumptionManager.php';
if(isset($_REQUEST['consumptionId']))
{
	$consumptionId = $_REQUEST['consumptionId'];
}
$cm = new ConsumptionManager();
$cm->cancelConsumption($consumptionId);
?>