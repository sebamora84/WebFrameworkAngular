<?php
include_once '../Models/ProductManager.php';
include_once '../Models/ConsumptionManager.php';
include_once '../Models/TableManager.php';

$pm = new ProductManager();
$cm= new ConsumptionManager();
$ctm = new TableManager();
//Consumption Types
$consumptionTypeIdLocal = $cm->createConsumptionType("Local");
$consumptionTypeLocal = $cm->getConsumptionType($consumptionTypeIdLocal);
echo json_encode($consumptionTypeLocal);
echo '<p>';

$consumptionTypeIdPedido = $cm->createConsumptionType("Pedido");
$consumptionTypePedido = $cm->getConsumptionType($consumptionTypeIdPedido);
echo json_encode($consumptionTypePedido);
echo '<p>';

$consumptionTypeIdInterno = $cm->createConsumptionType("Interno");
$consumptionTypeInterno = $cm->getConsumptionType($consumptionTypeIdInterno);
echo json_encode($consumptionTypeInterno);
echo '<p>';

$consumptionTypeIdDescuento = $cm->createConsumptionType("Descuento");
$consumptionTypeDescuento = $cm->getConsumptionType($consumptionTypeIdDescuento);
echo json_encode($consumptionTypeDescuento);
echo '<p>';

//Product, price and stock
$productId = $pm->createProduct('Cafe Chico');
$product = $pm->getProduct($productId);
echo json_encode($product);
echo '<p>';

$stockId = $sm->createStock($productId , 100 , 25 ,'2017-12-31 00:00:00');
$stock = $sm->getStock($stockId);
echo json_encode($stock);
echo '<p>';

$priceId = $pm->createPrice($productId, $consumptionTypeIdLocal, 25.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdPedido, 22.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdDescuento, 20.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdInterno, 0.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';



$productId = $pm->createProduct('Cortado Chico');
$product = $pm->getProduct($productId);
echo json_encode($product);
echo '<p>';

$stockId = $sm->createStock($productId , 100 , 25 ,'2017-12-31 00:00:00');
$stock = $sm->getStock($stockId);
echo json_encode($stock);
echo '<p>';

$priceId = $pm->createPrice($productId, $consumptionTypeIdLocal, 25.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdPedido, 22.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdDescuento, 20.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdInterno, 0.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';

$productId = $pm->createProduct('Cafe Jarrito');
$product = $pm->getProduct($productId);
echo json_encode($product);
echo '<p>';

$stockId = $sm->createStock($productId , 100 , 25 ,'2017-12-31 00:00:00');
$stock = $sm->getStock($stockId);
echo json_encode($stock);
echo '<p>';

$priceId = $pm->createPrice($productId, $consumptionTypeIdLocal, 30.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdPedido, 25.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdDescuento, 22.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdInterno, 0.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';

$productId = $pm->createProduct('Cortado Jarrito');
$product = $pm->getProduct($productId);
echo json_encode($product);
echo '<p>';

$stockId = $sm->createStock($productId , 100 , 25 ,'2017-12-31 00:00:00');
$stock = $sm->getStock($stockId);
echo json_encode($stock);
echo '<p>';

$priceId = $pm->createPrice($productId, $consumptionTypeIdLocal, 30.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdPedido, 25.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdDescuento, 22.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdInterno, 0.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';

$productId = $pm->createProduct('Medialuna');
$product = $pm->getProduct($productId);
echo json_encode($product);
echo '<p>';

$stockId = $sm->createStock($productId , 100 , 25 ,'2017-12-31 00:00:00');
$stock = $sm->getStock($stockId);
echo json_encode($stock);
echo '<p>';

$priceId = $pm->createPrice($productId, $consumptionTypeIdLocal, 8.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdPedido, 7.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdDescuento, 6.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdInterno, 0.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';

$productId = $pm->createProduct('Factura');
$product = $pm->getProduct($productId);
echo json_encode($product);
echo '<p>';

$stockId = $sm->createStock($productId , 100 , 25 ,'2017-12-31 00:00:00');
$stock = $sm->getStock($stockId);
echo json_encode($stock);
echo '<p>';

$priceId = $pm->createPrice($productId, $consumptionTypeIdLocal, 8.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdPedido, 7.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdDescuento, 6.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';
$priceId = $pm->createPrice($productId, $consumptionTypeIdInterno, 0.00);
$price = $pm->getPrice($priceId);
echo json_encode($price);
echo '<p>';

//Tables
$tableId = $ctm->createTable("Barra", $consumptionTypeIdInterno, 100 ,100 ,400 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 1", $consumptionTypeIdLocal, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 2", $consumptionTypeIdLocal,  100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 3", $consumptionTypeIdLocal,  100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 4", $consumptionTypeIdLocal,  100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 5", $consumptionTypeIdLocal, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Pedido 1", $consumptionTypeIdPedido, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

//Consumption
$table = $ctm->getTable(3);
$consumptionType=$cm->getConsumptionType($table->defaultConsumptionTypeId);
$consumptionId = $cm->createConsumption($table->id, $table->description, $consumptionType->id, $consumptionType->description);
$consumption = $cm->getConsumption($consumptionId);
echo json_encode($consumption);
echo '<p>';

$product = $pm->getProduct(1);
$price = $pm->getPriceByConsumptionType($product->id, $consumptionType->id);
$itemId = $cm->createItem($consumptionId, $product->id, $product->description, $price->amount , 1);
$item = $cm->getItem($itemId);
echo json_encode($item);
echo '<p>';


$consumption = $cm->updateConsumptionTotal($consumptionId);
echo json_encode($consumption);
echo '<p>';

$product = $pm->getProduct(5);
$price = $pm->getPriceByConsumptionType($product->id, $consumptionType->id);
$itemId = $cm->createItem($consumptionId, $product->id, $product->description, $price->amount , 2);
$item = $cm->getItem($itemId);
echo json_encode($item);
echo '<p>';

?>