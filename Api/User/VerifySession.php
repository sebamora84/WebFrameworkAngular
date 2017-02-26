<?php
function verifySession(){
	if (isset($_SESSION['discard_after']) && time() > $_SESSION['discard_after']) {
		session_start();
		// remove all session variables
		session_unset();
		// destroy the session
		session_destroy();
		header("Location:/notAuthorized.html?uri=".$uri."&m=expired");
		exit();
	}
	session_start();
	
	$uri=explode("?",substr($_SERVER['REQUEST_URI'], 1))[0];
	if(!isset($_SESSION["username"])){
		header("Location:/login.html?uri=".$uri);
		exit();
	}
	//The resource was already checked
	if($uri=="notAuthorized.html"||$uri=="underConstruction.html"){
		return;
	}
	//The super user has access to all
	if($_SESSION["username"]=="superuser"){
		return;
	}
	//Check the authorization to the resource	
	$resources = $_SESSION["resources"];
	foreach ($resources as &$resource){
		if($resource["uri"]==$uri){
			return;
		}
	}
	
	header("Location:/notAuthorized.html?uri=".$uri."&m=nauth");
	exit();
}

function destroySession(){
	session_start();
	// remove all session variables
	session_unset();
	// destroy the session
	session_destroy();
}
?>
