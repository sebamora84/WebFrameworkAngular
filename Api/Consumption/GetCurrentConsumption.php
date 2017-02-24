<?php
include_once '../Models/ConsumptionManager.php';
if(isset($_REQUEST['id']))
{
    $id = $_REQUEST['id'];
}
$cm = new ConsumptionManager();
$consumption = $cm->getOpenConsumption($id);
echo json_encode($consumption);
?>