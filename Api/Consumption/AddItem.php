<?php
include_once '../Models/ConsumptionManager.php';
if(isset($_REQUEST['itemId']))
{
	$itemId = $_REQUEST['itemId'];
}

$cm = new ConsumptionManager();
$cm->increaseItemQuantity($itemId);
?>