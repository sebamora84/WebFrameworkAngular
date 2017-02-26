<?php
include_once '../Models/ConsumptionManager.php';
include_once '../Models/ProductManager.php';
if(isset($_REQUEST['consumptionId']))
{
	$consumptionId = $_REQUEST['consumptionId'];
}
if(isset($_REQUEST['consumptionTypeId']))
{
	$consumptionTypeId = $_REQUEST['consumptionTypeId'];
}

$cm = new ConsumptionManager();
$pm = new ProductManager();
$consumptionType = $cm->getConsumptionType($consumptionTypeId);
$cm->updateConsumptionType($consumptionId, $consumptionType->id, $consumptionType->description);
$items = $cm->getItemsByConsumption($consumptionId);
foreach( $items as $item ) {
	$price = $pm->getPriceByConsumptionType($item->productId, $consumptionTypeId);
	$item = $cm->updateItemPrice($item->id, $price->amount);	
}
?>