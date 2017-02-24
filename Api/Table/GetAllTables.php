<?php
include_once '../Models/TableManager.php';
$ctm = new TableManager();
$tables = $ctm->getAllTable();
echo json_encode($tables);
?>