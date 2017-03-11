<?php
include '../Models/ConsumptionManager.php';
include_once '../Models/CashManager.php';
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
$cm->createCreditItem($creditId, "Pago", $description, $amount);


$cam = new CashManager();
$openCash = $cam->ensureOpenCash();
$startDate = $openCash->open;
$endDate = $openCash->closed;
if($endDate == null){
	$endDate = date("Y-m-d H:i:s");
}

$paidCredit = $cm->getPaidCreditTotalByDates($startDate, $endDate);
$registeredSale = $cm->getClosedConsumptionsTotalByDates($startDate, $endDate);
$registeredSale=floatval($registeredSale)+floatval($paidCredit);

$cam->updatePaidCredit($openCash->id, $paidCredit);
$cam->updateRegisteredSale($openCash->id, $registeredSale);
return;
?>