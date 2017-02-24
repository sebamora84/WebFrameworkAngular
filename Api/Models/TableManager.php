<?php
require_once '../Database/rb.php';
class TableManager 
{	
	function __construct(){
		require_once '../Database/dbsetup.php';
	}
	//Table		
	function getAllTable(){				
		$tables = R::findAll( 'table' );
		return $tables;
	}
	
	function getTable($id){				
		$table = R::load('table', $id);
		return $table;
	}
	
	function moveTable($id, $left ,$top ,$width ,$height){		
		  $table = R::load('table', $id);
		  $table->left = $left;
		  $table->top = $top;
		  $table->width = $width;
		  $table->height = $height;
		  R::store( $table );
		  $table->fresh();
		  return $table;
	}
	
	function createTable($description,$defaultConsumptionTypeId, $left ,$top ,$width ,$height){		
		  $table = R::dispense( 'table' );
		  $table->description = $description;
		  $table->defaultConsumptionTypeId = $defaultConsumptionTypeId;
		  $table->left = $left;
		  $table->top = $top;
		  $table->width = $width;
		  $table->height = $height;
		  $id = R::store( $table );
		  return $id;
	}
}

?>