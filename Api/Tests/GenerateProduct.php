<?php
include_once '../Models/ProductManager.php';
include_once '../Models/ConsumptionManager.php';
include_once '../Models/TableManager.php';

$pm = new ProductManager();
//Product, price
$productId = $pm->createProduct('Cafe Chico');
$priceId = $pm->createPrice($productId, 1, 25.00);
$priceId = $pm->createPrice($productId, 2, 23.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 20.00);

$productId = $pm->createProduct('Cortado Chico');
$priceId = $pm->createPrice($productId, 1, 25.00);
$priceId = $pm->createPrice($productId, 2, 23.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 20.00);

$productId = $pm->createProduct('Cafe Jarrito');
$priceId = $pm->createPrice($productId, 1, 28.00);
$priceId = $pm->createPrice($productId, 2, 25.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 23.00);

$productId = $pm->createProduct('Cortado Jarrito');
$priceId = $pm->createPrice($productId, 1, 28.00);
$priceId = $pm->createPrice($productId, 2, 25.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 23.00);

$productId = $pm->createProduct('Cafe con leche');
$priceId = $pm->createPrice($productId, 1, 30.00);
$priceId = $pm->createPrice($productId, 2, 28.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 25.00);

$productId = $pm->createProduct('Submarino');
$priceId = $pm->createPrice($productId, 1, 40.00);
$priceId = $pm->createPrice($productId, 2, 37.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 35.00);

$productId = $pm->createProduct('Capuchino');
$priceId = $pm->createPrice($productId, 1, 40.00);
$priceId = $pm->createPrice($productId, 2, 37.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 35.00);

$productId = $pm->createProduct('Chocolate');
$priceId = $pm->createPrice($productId, 1, 30.00);
$priceId = $pm->createPrice($productId, 2, 28.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 25.00);

$productId = $pm->createProduct('Vaso de leche');
$priceId = $pm->createPrice($productId, 1, 25.00);
$priceId = $pm->createPrice($productId, 2, 23.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 20.00);

$productId = $pm->createProduct('Te');
$priceId = $pm->createPrice($productId, 1, 25.00);
$priceId = $pm->createPrice($productId, 2, 23.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 20.00);

$productId = $pm->createProduct('Te con leche');
$priceId = $pm->createPrice($productId, 1, 30.00);
$priceId = $pm->createPrice($productId, 2, 28.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 25.00);

$productId = $pm->createProduct('Medialuna');
$priceId = $pm->createPrice($productId, 1, 8.00);
$priceId = $pm->createPrice($productId, 2, 7.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 7.00);

$productId = $pm->createProduct('Factura');
$priceId = $pm->createPrice($productId, 1, 8.00);
$priceId = $pm->createPrice($productId, 2, 7.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 7.00);

$productId = $pm->createProduct('Bollito ');
$priceId = $pm->createPrice($productId, 1, 8.00);
$priceId = $pm->createPrice($productId, 2, 7.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 7.00);

$productId = $pm->createProduct('Dulce de leche (Porc.)');
$priceId = $pm->createPrice($productId, 1, 5.00);
$priceId = $pm->createPrice($productId, 2, 4.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 4.00);

$productId = $pm->createProduct('Medialuna c/JyQ');
$priceId = $pm->createPrice($productId, 1, 15.00);
$priceId = $pm->createPrice($productId, 2, 13.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 12.00);

$productId = $pm->createProduct('Churros');
$priceId = $pm->createPrice($productId, 1, 8.00);
$priceId = $pm->createPrice($productId, 2, 7.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 7.00);

$productId = $pm->createProduct('Churros c/DdL');
$priceId = $pm->createPrice($productId, 1, 10.00);
$priceId = $pm->createPrice($productId, 2, 9.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 8.00);

$productId = $pm->createProduct('Manteca (Porc.)');
$priceId = $pm->createPrice($productId, 1, 5.00);
$priceId = $pm->createPrice($productId, 2, 4.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 4.00);

$productId = $pm->createProduct('Queso (Porc.)');
$priceId = $pm->createPrice($productId, 1, 5.00);
$priceId = $pm->createPrice($productId, 2, 4.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 4.00);

$productId = $pm->createProduct('Mermelada (Porc.)');
$priceId = $pm->createPrice($productId, 1, 5.00);
$priceId = $pm->createPrice($productId, 2, 4.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 4.00);

$productId = $pm->createProduct('Desayuno Simple');
$priceId = $pm->createPrice($productId, 1, 40.00);
$priceId = $pm->createPrice($productId, 2, 37.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 35.00);

$productId = $pm->createProduct('Desayuno Completo');
$priceId = $pm->createPrice($productId, 1, 45.00);
$priceId = $pm->createPrice($productId, 2, 40.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 37.00);

$productId = $pm->createProduct('Desayuno Light');
$priceId = $pm->createPrice($productId, 1, 45.00);
$priceId = $pm->createPrice($productId, 2, 40.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 37.00);

$productId = $pm->createProduct('Pebete JyQ');
$priceId = $pm->createPrice($productId, 1, 30.00);
$priceId = $pm->createPrice($productId, 2, 28.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 25.00);

$productId = $pm->createProduct('Pebete TyQ');
$priceId = $pm->createPrice($productId, 1, 35.00);
$priceId = $pm->createPrice($productId, 2, 32.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 30.00);

$productId = $pm->createProduct('Pebete TQyT');
$priceId = $pm->createPrice($productId, 1, 40.00);
$priceId = $pm->createPrice($productId, 2, 37.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 35.00);

$productId = $pm->createProduct('Miga JyQ');
$priceId = $pm->createPrice($productId, 1, 40.00);
$priceId = $pm->createPrice($productId, 2, 37.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 35.00);

$productId = $pm->createProduct('Miga TyT');
$priceId = $pm->createPrice($productId, 1, 40.00);
$priceId = $pm->createPrice($productId, 2, 37.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 35.00);

$productId = $pm->createProduct('Pan Arabe JyQ');
$priceId = $pm->createPrice($productId, 1, 40.00);
$priceId = $pm->createPrice($productId, 2, 37.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 35.00);

$productId = $pm->createProduct('Pan Arabe TTyQ');
$priceId = $pm->createPrice($productId, 1, 45.00);
$priceId = $pm->createPrice($productId, 2, 40.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 37.00);


$productId = $pm->createProduct('Linea Coca');
$priceId = $pm->createPrice($productId, 1, 30.00);
$priceId = $pm->createPrice($productId, 2, 28.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 25.00);

$productId = $pm->createProduct('Lata Schweppes');
$priceId = $pm->createPrice($productId, 1, 30.00);
$priceId = $pm->createPrice($productId, 2, 28.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 25.00);

$productId = $pm->createProduct('Aquarius');
$priceId = $pm->createPrice($productId, 1, 30.00);
$priceId = $pm->createPrice($productId, 2, 28.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 25.00);

$productId = $pm->createProduct('Agua con gas');
$priceId = $pm->createPrice($productId, 1, 30.00);
$priceId = $pm->createPrice($productId, 2, 28.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 25.00);

$productId = $pm->createProduct('Agua sin gas');
$priceId = $pm->createPrice($productId, 1, 30.00);
$priceId = $pm->createPrice($productId, 2, 28.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 25.00);

$productId = $pm->createProduct('Jugo de naranja');
$priceId = $pm->createPrice($productId, 1, 40.00);
$priceId = $pm->createPrice($productId, 2, 37.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 35.00);

$productId = $pm->createProduct('Licuado con leche');
$priceId = $pm->createPrice($productId, 1, 40.00);
$priceId = $pm->createPrice($productId, 2, 37.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 35.00);

$productId = $pm->createProduct('Licuado con agua');
$priceId = $pm->createPrice($productId, 1, 38.00);
$priceId = $pm->createPrice($productId, 2, 36.00);
$priceId = $pm->createPrice($productId, 3, 0.00);
$priceId = $pm->createPrice($productId, 4, 34.00);
?>