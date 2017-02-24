<?php
include_once '../Models/TableManager.php';
if(isset($_REQUEST['id']))
{
    $id = $_REQUEST['id'];
}
if(isset($_REQUEST['left']))
{
    $left = $_REQUEST['left'];
}
if(isset($_REQUEST['top']))
{
    $top = $_REQUEST['top'];
}
if(isset($_REQUEST['width']))
{
    $width = $_REQUEST['width'];
}
if(isset($_REQUEST['height']))
{
    $height = $_REQUEST['height'];
}

$ctm = new TableManager();
$table = $ctm->moveTable($id, $left, $top, $width, $height);
echo json_encode($table);
?>