<?php
include_once '../Models/ConsumptionManager.php';
include_once '../Models/ProductManager.php';
if(isset($_REQUEST['consumptionId']))
{
	$consumptionId = $_REQUEST['consumptionId'];
}
if(isset($_REQUEST['creditId']))
{
	$creditId = $_REQUEST['creditId'];
}

$cm = new ConsumptionManager();
$cm->creditConsumption($consumptionId, $creditId);
?>