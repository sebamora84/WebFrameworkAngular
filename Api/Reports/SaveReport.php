<?php
include_once '../Models/ReportManager.php';
if(isset($_REQUEST['jsonReport']))
{
	$jsonReport = $_REQUEST['jsonReport'];
}
$rm = new ReportManager();
if($jsonReport["id"]=="")
{
	$jsonReport["id"] = $rm->createReport($jsonReport["description"],$jsonReport["sql"],$jsonReport["parameters"]);
}
else{
	$rm->modifyReport($jsonReport["id"], $jsonReport["description"],$jsonReport["sql"],$jsonReport["parameters"]);
}

return;
?>