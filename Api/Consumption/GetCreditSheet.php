<?php
include_once '../Models/ConsumptionManager.php';
if(isset($_REQUEST['creditId']))
{
	$creditId = $_REQUEST['creditId'];
}
$cm = new ConsumptionManager();
echo json_encode($cm->getCreditSheet($creditId));
?>