<?php
include_once '../Models/ConsumptionManager.php';
if(isset($_REQUEST['consumptionId']))
{
	$consumptionId = $_REQUEST['consumptionId'];
}
if(isset($_REQUEST['discountDescription']))
{
	$discountDescription = $_REQUEST['discountDescription'];
}
if(isset($_REQUEST['discount']))
{
	$discount = $_REQUEST['discount'];
}

$cm = new ConsumptionManager();
$cm->updateConsumptionDiscount($consumptionId, $discountDescription, $discount);
?>