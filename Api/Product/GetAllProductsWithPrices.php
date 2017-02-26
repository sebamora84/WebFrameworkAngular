<?php
include_once '../Models/ProductManager.php';

$pm = new ProductManager();
$products = $pm->getAllProducts();
foreach ($products as &$product) {
	$product->xownPriceList;
}
echo json_encode($products);
?>