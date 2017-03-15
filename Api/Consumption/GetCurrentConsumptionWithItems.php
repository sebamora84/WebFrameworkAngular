<?php
include_once '../Models/ConsumptionManager.php';
if(isset($_REQUEST['tableId']))
{
    $tableId = $_REQUEST['tableId'];
}
$cm = new ConsumptionManager();
$consumption = $cm->getOpenConsumptionByTable($tableId);
if($consumption!=null){
	$consumption->ownItemList;
}
echo json_encode($consumption);
?>