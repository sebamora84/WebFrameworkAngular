<?php
include_once '../Models/ReportManager.php';
$rm = new ReportManager();
$reports = $rm->getAllReports();
echo json_encode($reports);
?>