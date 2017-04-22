<?php
include_once '../Models/ConsumptionManager.php';
include_once '../Models/ProductManager.php';
include_once '../Models/TableManager.php';
include_once '../Models/CashManager.php';
if(isset($_REQUEST['productId']))
{
    $productId = $_REQUEST['productId'];
}
if(isset($_REQUEST['tableId']))
{
	$tableId = $_REQUEST['tableId'];
}

$cm = new ConsumptionManager();
$pm = new ProductManager();
$consumption = $cm->getOpenConsumptionByTable($tableId);
if($consumption == null){
	//Ensure threre is an opened cash
	$cam = new CashManager();
	$cash = $cam->ensureOpenCash();
	//Open a new consumption
	$ctm = new TableManager();
	$table = $ctm->getTable($tableId);
	//Get the default consumption and create one
	$consumptionType = $cm->getConsumptionType($table->defaultConsumptionTypeId);
	$consumptionId = $cm->createConsumption($cash->id, $table->id, $table->description, $consumptionType->id, $consumptionType->description);
	$consumption = $cm->getConsumption($consumptionId);
}
//Get the item to increase quantity
$product = $pm->getProduct($productId);
$price = $pm->getPriceByConsumptionType($product->id, $consumption->consumptionTypeId);
$item = $cm->getItemByProductId($consumption->id, $product->id);
if($item==null){
	//item doesnt exist. create one
	$itemId = $cm->createItem($consumption->id, $product->id, $product->description, $price->amount);
	$item=$cm->getItem($itemId);
}
//increase quantity
$cm->increaseItemQuantity($item->id);
?>