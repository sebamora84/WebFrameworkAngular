<?php
include_once '../Models/ConsumptionManager.php';
include_once '../Models/ProductManager.php';
include_once '../Models/TableManager.php';
if(isset($_REQUEST['itemId']))
{
	$itemId = $_REQUEST['itemId'];
}

$cm = new ConsumptionManager();
$cm->decreaseItemQuantity($itemId);
?>