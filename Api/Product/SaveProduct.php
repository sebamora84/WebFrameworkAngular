<?php
include_once '../Models/ProductManager.php';
if(isset($_REQUEST['jsonProduct']))
{
	$jsonProduct = $_REQUEST['jsonProduct'];
}
$pm = new ProductManager();
if($jsonProduct["id"]=="")
{
	$jsonProduct["id"] = $pm->createProduct($jsonProduct["description"]);
}
else{
	$pm->updateProduct($jsonProduct["id"], $jsonProduct["description"]);
}

foreach ($jsonProduct["prices"] as $jsonPrice){
	if($jsonPrice["amount"]==""){
		$jsonPrice["amount"]=0;
	}
	$price = $pm->getPriceByConsumptionType($jsonProduct["id"], $jsonPrice["consumptionTypeId"]);
	if($price==null){
		$pm->createPrice($jsonProduct["id"], $jsonPrice["consumptionTypeId"], $jsonPrice["amount"]);
	}
	else{
		$pm->updatePrice($price->id, $jsonPrice["amount"]);
	}	
}

return;
?>