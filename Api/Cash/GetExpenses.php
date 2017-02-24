<?php
include_once '../Models/CashManager.php';
$cam = new CashManager();
$currentCash= $cam->getCurrentCash();
if($currentCash==null)
{
	return;
}
$allExpenses = $cam->getExpensesByCash($currentCash->id);
echo json_encode($allExpenses);
return;
?>