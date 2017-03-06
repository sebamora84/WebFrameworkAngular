<?php
include_once '../Models/ProductManager.php';
$pm = new ProductManager();
$products = $pm->getAllProducts();
echo json_encode($products);
?>