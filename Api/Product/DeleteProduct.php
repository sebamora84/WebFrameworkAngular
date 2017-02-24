<?php
include_once '../Models/ProductManager.php';
if(isset($_REQUEST['productId']))
{
	$productId = $_REQUEST['productId'];
}
$pm = new ProductManager();
$pm->deleteProduct($productId);
return;
?>