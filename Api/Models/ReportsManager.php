<?php
require_once '../Database/rb.php';
class ReportsManager 
{	
	function __construct(){
		require_once '../Database/dbsetup.php';
	}
	//Report		
	function getAllReports(){				
		$reports = R::findAll( 'report' );
		return $reports;
	}
	
	function getReport($reportId){				
		$report = R::load('report', $reportId);
		return $report;
	}
		
	function createReport($description,$sql, $parameters){		
		  $report = R::dispense( 'report' );
		  $report->description = $description;
		  $report->sql = $sql;
		  $id = R::store( $report );
		  return $id;
	}
	
	function modifyReport($reportId, $description, $sql, $parameters){
		$report = self::getReport($reportId);
		$report->description = $description;
		$report->sql = $sql;
		$id = R::store( $report );
		return $id;
	}
}

?>