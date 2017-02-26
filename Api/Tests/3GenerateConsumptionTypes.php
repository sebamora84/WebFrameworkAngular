<?php
include_once '../Models/ProductManager.php';
include_once '../Models/ConsumptionManager.php';
include_once '../Models/TableManager.php';

$cm= new ConsumptionManager();
//Consumption Types
$consumptionTypeIdLocal = $cm->createConsumptionType("Local");
$consumptionTypeLocal = $cm->getConsumptionType($consumptionTypeIdLocal);
echo json_encode($consumptionTypeLocal);
echo '<p>';

$consumptionTypeIdPedido = $cm->createConsumptionType("Pedido");
$consumptionTypePedido = $cm->getConsumptionType($consumptionTypeIdPedido);
echo json_encode($consumptionTypePedido);
echo '<p>';

$consumptionTypeIdInterno = $cm->createConsumptionType("Familia");
$consumptionTypeInterno = $cm->getConsumptionType($consumptionTypeIdInterno);
echo json_encode($consumptionTypeInterno);
echo '<p>';

$consumptionTypeIdDescuento = $cm->createConsumptionType("Amigos");
$consumptionTypeDescuento = $cm->getConsumptionType($consumptionTypeIdDescuento);
echo json_encode($consumptionTypeDescuento);
echo '<p>';

?>