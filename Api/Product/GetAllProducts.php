<?php
include_once '../Models/ProductManager.php';
$pm = new ProductManager();
$products = $pm->getAllProducts();
$productString = '{ "data":[';

foreach($products as &$product){
	$productString.=json_encode($product).',';
}
//echo rtrim($productString,',').']}'
echo json_encode($products);
?>