<?php
include_once '../Models/ConsumptionManager.php';
if(isset($_REQUEST['id']))
{
    $id = $_REQUEST['id'];
}
$cm = new ConsumptionManager();
$consumptions = $cm->getItemsByConsumption($id);
echo json_encode($consumptions);
?>