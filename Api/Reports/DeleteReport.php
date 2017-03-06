<?php
include_once '../Models/ReportManager.php';
if(isset($_REQUEST['reportId']))
{
	$reportId = $_REQUEST['reportId'];
}
$rm = new ReportManager();
$rm->deleteReport($reportId);
return;
?>