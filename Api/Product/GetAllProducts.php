<?php
include_once '../Models/ProductManager.php';
$pm = new ProductManager();
$products = $pm->getAllProduct();
echo json_encode($products);
?>