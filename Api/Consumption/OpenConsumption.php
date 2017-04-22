<?php
include_once '../Models/ConsumptionManager.php';
include_once '../Models/TableManager.php';
include_once '../Models/CashManager.php';
if(isset($_REQUEST['tableId'])){
	$tableId = $_REQUEST['tableId'];
}
$cm = new ConsumptionManager();
$ctm = new TableManager();
$table = $ctm->getTable($tableId);
if(isset($_REQUEST['consumptionTypeId'])){
	$consumptionTypeId = $_REQUEST['consumptionTypeId'];
}
else {
	$consumptionTypeId = $table->defaultConsumptionTypeId;
}
//Ensure threre is an opened cash
$cam = new CashManager();
$cash=$cam->ensureOpenCash();

$consumptionType = $cm->getConsumptionType($consumptionTypeId);
$consumptionId = $cm->createConsumption($cash->id, $table->id, $table->description, $consumptionType->id, $consumptionType->description);

?>