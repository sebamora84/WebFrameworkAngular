<?php
include_once '../Models/ConsumptionManager.php';
include_once '../Models/CashManager.php';
if(isset($_REQUEST['consumptionId']))
{
	$consumptionId = $_REQUEST['consumptionId'];
}

if(isset($_REQUEST['creditId']))
{
	$creditId = $_REQUEST['creditId'];
}

$cm = new ConsumptionManager();
$cam = new CashManager();
$openCash = $cam->ensureOpenCash();
$cm->creditConsumption($consumptionId, $creditId, $openCash->id);
?>
