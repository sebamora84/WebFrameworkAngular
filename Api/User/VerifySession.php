<?php
function verifySession(){
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
	
	header("Location:/notAuthorized.html?uri=".$uri);
	exit();
}

function showUserName(){
	if(isset($_SESSION["username"])){
		echo "Bienvenido ".$_SESSION["username"].". ";
		return;
	}
	else{
		echo "Inicie Sesion. ";
		return;
	}
}

function showButtonName(){
	if(isset($_SESSION["username"])){
		echo "Cerrar Sesion";
		return;
	}
	else{
		echo "Iniciar Sesion";
		return;
	}
}

function destroySession(){
	session_start();
	if(	session_id()){
		// remove all session variables
		session_unset();
		// destroy the session
		session_destroy();
	}
}
?>
