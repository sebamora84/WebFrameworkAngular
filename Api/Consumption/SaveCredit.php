<?php
include '../Models/ConsumptionManager.php';
if(isset($_REQUEST['creditDescription']))
{
	$creditDescription = $_REQUEST['creditDescription'];
}

$cm = new ConsumptionManager();
$cm->createCredit($creditDescription);
return;
?>