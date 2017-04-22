<?php
require_once '../Database/rb.php';
class ConsumptionManager 
{	
	function __construct(){
		require_once '../Database/dbsetup.php';
	}
	//ConsumptionType
	function getConsumptionType($id){				
		$consumptionType = R::load('consumptiontype', $id);;
		return $consumptionType;
	}
	function getAllConsumptionTypes(){
		$consumptionTypes = R::findAll( 'consumptiontype' );
		return $consumptionTypes;
	}	
	function createConsumptionType($description){		
		  $consumptionType = R::dispense( 'consumptiontype' );
		  $consumptionType->description = $description;
		  $id = R::store( $consumptionType );
		  return $id;
	}
	
	//Consumption
	function getOpenConsumptionByTable($tableId){				
		$consumption = R::findOne('consumption','table_id = ? AND status = "open" ORDER BY id DESC', [$tableId]);
		return $consumption;
	}

	function getAllOpenConsumptions(){
		$consumptions = R::find( 'consumption', 'status="open" ORDER BY id DESC');
		return $consumptions;
	}
		
	function getConsumption($consumptionId){				
		$consumption = R::load('consumption', $consumptionId);
		return $consumption;
	}	
	function getClosedConsumptionsTotalByCash($cashId){
		$sql = 'SELECT SUM(consumption.total) as total FROM consumption
				WHERE status="close" AND cash_id = ?';
		return R::getCell($sql, [$cashId]);
	}
	
	function getPaidCreditTotalByCash($cashId){
		$sql = 'SELECT SUM(credititem.amount) as total FROM credititem
				WHERE type="Pago" AND cash_id = ?';
		return R::getCell($sql,[$cashId]);
	}
	function getClosedConsumptionsByCash($cashId){
		$consumptions = R::find( 'consumption', 'status="close" AND cash_id = ? ORDER BY id DESC', [$cashId] );
		return $consumptions;
	}
	
	function createConsumption($cashId, $tableId, $tableDescription, $consumptionTypeId, $consumptionTypeDescription){
		  $consumption = R::dispense( 'consumption' );
		  $consumption->cash = R::load('cash', $cashId);
		  $consumption->tableId = $tableId;
		  $consumption->tableDescription = $tableDescription;
		  $consumption->consumptionTypeId = $consumptionTypeId;
		  $consumption->consumptionTypeDescription = $consumptionTypeDescription;
		  $consumption->subtotal = 0.00;
		  $consumption->discountDescription = "Descuento";
		  $consumption->discount = 0.00;
		  $consumption->total = 0.00;
		  $consumption->status = "open";
		  $consumption->created = date("Y-m-d H:i:s");		  
		  $id = R::store( $consumption );
		  return $id;
	}
	function updateConsumptionTotal($consumptionId){
		$consumption = self::getConsumption($consumptionId);
		$subtotal = 0.00;		
		foreach( $consumption->xownItemList as $item ) {
			$subtotal += floatval($item->subtotal);
		}	
		$consumption->subtotal = $subtotal;
		$consumption->total = $consumption->subtotal - $consumption->discount;
		$consumption->lastModified = date("Y-m-d H:i:s");
		R::store( $consumption );
		$consumption->fresh();
		return $consumption;		
	}	
	function updateConsumptionType($consumptionId, $consumptionTypeId, $consumptionTypeDescription){
		$consumption = self::getConsumption($consumptionId);
		$consumption->consumptionTypeId = $consumptionTypeId;
		$consumption->consumptionTypeDescription = $consumptionTypeDescription;
		$consumption->lastModified = date("Y-m-d H:i:s");
		R::store( $consumption );
		$consumption->fresh();
		return $consumption;
	}
	function updateConsumptionDiscount($consumptionId, $discountDescription, $discount){
		$consumption = self::getConsumption($consumptionId);
		$consumption->discountDescription = $discountDescription;
		$consumption->discount = $discount;
		$consumption->lastModified = date("Y-m-d H:i:s");
		R::store( $consumption );
		$consumption = self::updateConsumptionTotal($consumptionId);
		return $consumption;
	}
	function updateConsumptionCash($consumptionId, $cashId){
		$consumption = self::getConsumption($consumptionId);
		$consumption->cash = R::load('cash', $cashId);
		$consumption->lastModified = date("Y-m-d H:i:s");
		R::store( $consumption );
		$consumption = self::updateConsumptionTotal($consumptionId);
		return $consumption;
	}
	function closeConsumption($consumptionId){
		$consumption = self::getConsumption($consumptionId);
		$consumption->status="close";
		$consumption->closed = date("Y-m-d H:i:s");
		R::store( $consumption );
		$consumption->fresh();
		return $consumption;
	}	
	function cancelConsumption($id){
		$consumption = self::getConsumption($id);
		$consumption->status="cancel";
		$consumption->lastModified = date("Y-m-d H:i:s");
		R::store( $consumption );
		$consumption->fresh();
		return $consumption;
	}
	
	function creditConsumption($consumptionId, $creditId, $cashId){
		$consumption = self::getConsumption($consumptionId);
		$consumption->status="credit";
		$consumption->credit=R::load('credit', $creditId);
		$consumption->lastModified = date("Y-m-d H:i:s");
		R::store( $consumption );
		$descriptionPrefix= $consumption->tableDescription.' - '.$consumption->consumptionTypeDescription;
		if($consumption->discount<>0){
			self::createCreditItem($creditId, $cashId, "Descuento",$descriptionPrefix ,$consumption->discount );
		}
		foreach ($consumption->ownItemList as &$item){
			$description=$descriptionPrefix.' - '.$item->productDescription.' x'.$item->quantity;
			$amount= floatval($item->subtotal) * (-1);
			self::createCreditItem($creditId, $cashId, "Consumo",$description ,$amount );
		}
		
		return $consumption;
	}
	
	
	//Item
	function getItemsByConsumption($consumptionId){				
		$consumptions = R::find( 'item', ' consumption_id = ? ORDER BY id', [ $consumptionId] );
		return $consumptions;
	}
	function getItemByProductId($consumptionId, $productId){
		$item = R::findOne('item','consumption_id = ? AND product_id = ? ORDER BY id DESC', [$consumptionId, $productId]);;
		return $item;
	}
	function getItem($itemId){				
		$item = R::load('item', $itemId);;
		return $item;
	}
	function createItem($consumptionId, $productId, $productDescription, $productUnitPrice){		
		  $item = R::dispense( 'item' );
		  $item->consumption = self::getConsumption($consumptionId);
		  $item->productId = $productId;
		  $item->productDescription = $productDescription;
		  $item->productUnitPrice = $productUnitPrice;
		  $item->quantity = 0;
		  $item->subtotal = 0.0;
		  $id = R::store( $item );
		  return $id;
	}
	function increaseItemQuantity($itemId){
		$item = self::getItem($itemId);
		$item->quantity++;
		$item->subtotal = $item->quantity * $item->productUnitPrice;
		R::store( $item );
		$item->fresh();
		self::updateConsumptionTotal($item->consumptionId);
		return $item;
	}
	function decreaseItemQuantity($itemId){
		$item = self::getItem($itemId);
		$item->quantity--;
		$item->subtotal = $item->quantity * $item->productUnitPrice;
		R::store( $item );
		$item->fresh();
		if($item->quantity==0){
			R::trash( $item );
		}
		self::updateConsumptionTotal($item->consumptionId);		
		return $item;
	}
	function updateItemPrice($itemId, $priceAmount){
		$item = self::getItem($itemId);
		$item->productUnitPrice = $priceAmount;
		$item->subtotal = $item->quantity * $item->productUnitPrice;
		R::store( $item );
		$item->fresh();
		self::updateConsumptionTotal($item->consumptionId);
		return $item;
	}
	
	//credit
	function createCredit($description){
		$credit = R::dispense( 'credit' );
		$credit->description = $description;
		$credit->created = date("Y-m-d H:i:s");
		$id = R::store( $credit );
		return $id;
	}
	function getAllCredits(){
		return R::findAll( 'credit' );
	}
	function createCreditItem($creditId, $cashId, $type, $description, $amount){
		$item = R::dispense( 'credititem' );
		$item->credit = R::load('credit',$creditId);
		$item->cash = R::load('cash',$cashId);
		$item->type = $type;
		$item->description = $description;
		$item->amount = $amount;
		$item->created = date("Y-m-d H:i:s");
		$id = R::store( $item );
		return $id;
	}

	function updateCreditItemCash($creditItemId, $cashId){
		$item = R::load('credititem',$creditItemId);
		$item->cash = R::load('cash', $cashId);
		R::store( $item );
		return $item;
	}
	function getCreditSheet($creditId){
		$sql='SELECT "" as created, "Total" as type, "" as description, SUM(amount) as amount FROM credititem WHERE credit_id=:creditId
		UNION SELECT created, type, description, amount FROM credititem WHERE credit_id=:creditId';
		return R::getAll($sql, [':creditId'=>$creditId]);
	}
}
?>