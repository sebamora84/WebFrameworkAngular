<?php

include_once '../Models/TableManager.php';

$ctm = new TableManager();

//Tables
$tableId = $ctm->createTable("Barra", 2, 100 ,100 ,400 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 1", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 2", 1,  100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 3", 1,  100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 4", 1,  100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 5", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 6", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 7", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 8", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 9", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 10", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 11", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 12", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Mesa 13", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Pedido 1", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Pedido 2", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Pedido 3", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Pedido 4", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';

$tableId = $ctm->createTable("Pedido 5", 1, 100 ,100 ,50 ,50);
$table = $ctm->getTable($tableId);
echo json_encode($table);
echo '<p>';


?>