<?php
include_once '../Models/ReportManager.php';
if(isset($_REQUEST['reportId']))
{
	$reportId = $_REQUEST['reportId'];
}
if(isset($_REQUEST['jsonParameters']))
{
	$parametersArray = $_REQUEST['jsonParameters'];
}
$rm = new ReportManager();
echo json_encode($rm->executeReport($reportId, $parametersArray));
return;
?>