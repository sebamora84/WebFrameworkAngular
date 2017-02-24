<?php
require_once '../Database/rb.php';
class ProductManager 
{	
	function __construct(){
		require_once '../Database/dbsetup.php';
	}
	//Product	
	function getProduct($productId){				
		$product = R::load('product', $productId);;
		return $product;
	}
	function getAllProduct(){
		$products = R::findAll( 'product' );
		return $products;
	}	
	function createProduct($description){		
		  $product = R::dispense( 'product' );
		  $product->description = $description;
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
		$price = R::load('price', $priceId);;
		return $price;
	}	
	function createPrice($productId, $consumptionTypeId, $amount){
		$price = R::dispense( 'price' );
		$price->productId = $productId;
		$price->consumptionTypeId = $consumptionTypeId;
		$price->amount = $amount;
		$id = R::store( $price );
		return $id;
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