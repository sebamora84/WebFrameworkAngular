<?php
require_once '../Database/rb.php';
class CashManager 
{	
	function __construct(){
		require_once '../Database/dbsetup.php';
	}
	//Cash		
	function getCash($cashId){				
		$cash = R::load('cash', $cashId);
		return $cash;
	}
	
	function getFrozenCash(){
		$cash = R::findOne('cash','status = "frozen" ORDER BY id DESC');
		return $cash;
	}
	function getOpenCash(){
		$cash = R::findOne('cash','status = "open" ORDER BY id DESC');
		return $cash;
	}
	function getLastClosedCash(){
		$cash = R::findOne('cash','status = "closed" ORDER BY id DESC');
		return $cash;
	}
	function getCurrentCash(){
		$cash = self::getFrozenCash();
		if($cash!=null){			
			return $cash;
		}		
		$cash = self::getOpenCash();
		return $cash;
	}
		
	function createCash($initialCash){		
		$cash = R::dispense( 'cash' );
		$cash->initialCash = $initialCash;
		$cash->initialRegisteredCash = $initialCash;
		$cash->finalCash = 0.00;
		$cash->cashFlow = 0.00;
		$cash->expenses = 0.00;
		$cash->paidCredit = 0.00;
		$cash->calculatedSale = 0.00;
		$cash->registeredSale = 0.00;
		$cash->cashExtraction = 0.00;
		$cash->newInitialCash = 0.00;
		$cash->status = "open";
		$cash->open = date("Y-m-d H:i:s");
		//Delete after creation
		//$cash->lastModified = date("Y-m-d H:i:s");
		//$cash->closed = date("Y-m-d H:i:s");		
		$id = R::store( $cash );
		return $id;
	}
	
	function ensureOpenCash(){
		$cash = self::getOpenCash();
		if($cash!=null){
			return $cash;
		}
		//Open a cash with temporal initial cash of 0.00 until the frozen cash is closed
		$frozenCash = self::getFrozenCash();
		if($frozenCash!=null){
			$cashId = self::createCash(0.00);
			$cash = self::getCash($cashId);
			return $cash;
		}
		
		$lastClosedCash = self::getLastClosedCash();
		if($lastClosedCash!=null){
			$cashId = self::createCash($lastClosedCash->newInitialCash);
			$cash = self::getCash($cashId);
			return $cash;
		}
		
		$cashId = self::createCash(0);
		$cash = self::getCash($cashId);
		return $cash;
	}
	
	function freezeCash(){
		$openCash = self::ensureOpenCash();
		$openCash->status = "frozen";
		$openCash->closed = date("Y-m-d H:i:s");
		$cashId = R::store( $openCash );
		return $cashId;
	}
	
	function cancelFrozenCash(){
		$openCash = self::getOpenCash();
		if($openCash!=null){
			R::trash($openCash);			
		}
		$frozenCash= self::getFrozenCash();
		$frozenCash->status = "open";
		$frozenCash->lastModified = date("Y-m-d H:i:s");
		$frozenCash->closed = null;
		$cashId = R::store( $frozenCash );
		return $cashId;
	}
	function saveCash($cashId, $initialCash, $finalCash, $cashExtraction){
		self::updateCashExpenses($cashId);
		$cash = self::getCash($cashId);
		$cash->initialCash = $initialCash;
		$cash->finalCash = $finalCash;
		$cash->cashFlow = $cash->finalCash - $cash->initialCash;
		$cash->calculatedSale = $cash->cashFlow + $cash->expenses;
		$cash->cashExtraction =  $cashExtraction;
		$cash->newInitialCash = $cash->finalCash - $cash->cashExtraction;		
		$cash->lastModified = date("Y-m-d H:i:s");
		$cashId = R::store( $cash );
		return $cashId;
	}
	function closeFrozenCash(){
		$frozenCash = self::getFrozenCash();
		$frozenCash->status = "closed";
		$frozenCash->lastModified = date("Y-m-d H:i:s");		
		$cashId = R::store( $frozenCash );
		return $cashId;
	}
	
	function updateRegisteredSale($cashId, $registeredSale){
		$cash = self::getCash($cashId);
		$cash->registeredSale = $registeredSale;
		$cash->lastModified = date("Y-m-d H:i:s");
		$id = R::store( $cash );		
		return $cash;
	}
	function updatePaidCredit($cashId, $paidCredit){
		$cash = self::getCash($cashId);
		$cash->paidCredit = $paidCredit;
		$cash->lastModified = date("Y-m-d H:i:s");
		$id = R::store( $cash );
		return $cash;
	}
	function updateInitialCash($cashId, $initialCash){
		$cash = self::getCash($cashId);
		$cash->initialCash = $initialCash;
		$cash->initialRegisteredCash = $initialCash;
		$cash->lastModified = date("Y-m-d H:i:s");
		$id = R::store( $cash );
		return $cash;
	}
	
	//Expense
	function getExpense($expenseId){
		$expense = R::load('expense', $expenseId);
		return $expense;
	}
	
	function getExpensesByCash($cashId){
		$expense = R::find( 'expense', ' cash_id = ? ORDER BY id', [ $cashId] );
		return $expense;
	}
	
	function createExpense($cashId, $description, $amount){
		$expense = R::dispense( 'expense' );
		$expense->cashId = $cashId;
		$expense->description = $description;
		$expense->amount = $amount;		
		$id = R::store( $expense );
		return $id;
	}
	function updateExpense($expenseId, $cashId, $description, $amount){
		$expense = self::getExpense($expenseId);
		$expense->cashId = $cashId;
		$expense->description = $description;
		$expense->amount = $amount;
		$id = R::store( $expense );
		return $id;
	}
	function deleteExpense($expenseId){
		$expense = self::getExpense($expenseId);
		R::trash( $expense );
	}
	
	function updateCashExpenses($cashId){	
		$expenses = self::getExpensesByCash($cashId);
		$total = 0.00;
		foreach( $expenses as $expense ) {
			$total += floatval($expense->amount);
		}
		$cash = self::getCash($cashId);
		$cash->expenses = $total;
		$id = R::store( $cash );
		$cash->fresh();
		return $id;
	}	
}

?>