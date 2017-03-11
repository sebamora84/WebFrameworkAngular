<?php
include_once '../Models/ConsumptionManager.php';
include_once '../Models/CashManager.php';
if(isset($_REQUEST['consumptionId']))
{
	$consumptionId = $_REQUEST['consumptionId'];
}
$cm = new ConsumptionManager();
$cm->closeConsumption($consumptionId);

//Update cash
$cam = new CashManager();
$openCash = $cam->ensureOpenCash();
$paidCredit = $cm->getPaidCreditTotalByDates($openCash->open, date("Y-m-d H:i:s"));
$registeredSale = $cm->getClosedConsumptionsTotalByDates($openCash->open, date("Y-m-d H:i:s"));
$registeredSale=floatval($registeredSale)+floatval($paidCredit);

$cam->updatePaidCredit($openCash->id, $paidCredit);
$cam->updateRegisteredSale($openCash->id, $registeredSale);
?>