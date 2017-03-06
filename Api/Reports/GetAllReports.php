<?php
include_once '../Models/ReportManager.php';
$rm = new ReportsManager();
$reports = $rm->getAllReports();
echo json_encode($reports);
?>