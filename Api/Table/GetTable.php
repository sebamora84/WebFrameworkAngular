<?php
include_once '../Models/TableManager.php';
if(isset($_REQUEST['id']))
{
    $id = $_REQUEST['id'];
}
$ctm = new TableManager();
$table = $ctm->getTable($id);
echo json_encode($table);
?>