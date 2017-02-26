<?php
include_once '../Models/ProductManager.php';
if(isset($_REQUEST['productId']))
{
	$productId = $_REQUEST['productId'];
}
else{
	$productId=1;
}
$pm = new ProductManager();
$product = $pm->getProduct($productId);
echo "<p>";
echo json_encode($product);
echo "<p>";
echo json_encode($product->xownPriceList);
echo "<p>";
echo json_encode($product);
?>