<?php
		require_once '../Database/dbdata.php';
		R::setup('mysql:host='.$dbhost.';dbname='.$dbname, $username, $password);
		//R::debug(1); 
?>