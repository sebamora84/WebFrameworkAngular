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
$cam = new CashManager();
$openCash = $cam->ensureOpenCash();
$cm->createCreditItem($creditId, $openCash->id ,"Pago", $description, $amount);

$paidCredit = $cm->getPaidCreditTotalByCash($openCash->id);
$registeredSale = $cm->getClosedConsumptionsTotalByCash($openCash->id);
$registeredSale=floatval($registeredSale)+floatval($paidCredit);

$cam->updatePaidCredit($openCash->id, $paidCredit);
$cam->updateRegisteredSale($openCash->id, $registeredSale);
return;
?>