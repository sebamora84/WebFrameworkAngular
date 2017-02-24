<?php
include_once '../Models/CashManager.php';
if(isset($_REQUEST['jsonExpenses']))
{
	$jsonExpenses = $_REQUEST['jsonExpenses'];
}
$cam = new CashManager();

$currentCash= $cam->getCurrentCash();

foreach ($jsonExpenses as &$expense) {
	if($expense["id"]=="" && ($expense["description"]!="" || $expense["amount"]!="")){
		//Create new expense
		$cam->createExpense($currentCash->id, $expense["description"],  $expense["amount"]);
	}	
	else if($expense["id"]!="" && ($expense["description"]!="" || $expense["amount"]!="")){
		//Update expense
		$cam->updateExpense($expense["id"], $currentCash->id, $expense["description"],  $expense["amount"]);
	}
	else if($expense["id"]!="" && $expense["description"]=="" && $expense["amount"]==""){
		//Delete expense
		$cam->deleteExpense($expense["id"]);
	}
}

$cam->saveCash($currentCash->id, $currentCash->initialCash, $currentCash->finalCash, $currentCash->cashExtraction);

$allExpenses = $cam->getExpensesByCash($currentCash->id);
echo json_encode($allExpenses);
return;
?>