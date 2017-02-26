<?php
require_once '../Database/rb.php';
class ProductManager 
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
	//Product	
	function getProduct($productId){				
		$product = R::load('product', $productId);
		return $product;
	}
	function getAllProducts(){
		$products = R::findAll( 'product' );
		return $products;
	}	
	function createProduct($description){		
		  $product = R::dispense( 'product' );
		  $product->description = $description;
		  //$product->xownPriceList = array();
		  $id = R::store( $product );
		  return $id;
	}
	function updateProduct($productId, $description){
		$product = self::getProduct($productId);
		$product->description = $description;
		$id = R::store( $product );
		return $id;
	}
	function deleteProduct($productId){
		$product = self::getProduct($productId);
		R::trash( $product );
	}
	
	//Price
	function getPrice($priceId){
		$price = R::load('price', $priceId);
		return $price;
	}	
	function createPrice($productId, $consumptionTypeId, $amount){
		$price = R::dispense( 'price' );
		$price->amount = $amount;
		$price->consumptionType = R::load('consumptiontype', $consumptionTypeId);
		$product = R::load('product', $productId);
		$product->xownPriceList[]=$price;
		R::store($product);
		$price->fresh();
		return $price->id;
		//$id = R::store( $price );
		//return $id;
	}
	function updatePrice($priceId, $amount){
		$price = self::getPrice($priceId);
		$price->amount = $amount;
		$id = R::store( $price );
		return $id;
	}
	function getPriceByConsumptionType($productId, $consumptionTypeId){
		$price = R::findOne('price','product_id = ? AND consumption_type_id = ? ORDER BY id DESC', [$productId, $consumptionTypeId]);;
		return $price;
	}
	function getPricesByProduct($productId){
		$prices = R::find('price','product_id = ? ORDER BY id',[$productId]);
		return $prices;
	}
}

?>