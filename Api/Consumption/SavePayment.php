<?php
include '../Models/ConsumptionManager.php';
if(isset($_REQUEST['creditId']))
{
	$creditId = $_REQUEST['creditId'];
}
if(isset($_REQUEST['amount']))
{
	$amount = $_REQUEST['amount'];
}
if(isset($_REQUEST['description']))
{
	$description = $_REQUEST['description'];
}


$cm = new ConsumptionManager();
$cm->createCreditPayment($creditId, $description, $amount);
return;
?>