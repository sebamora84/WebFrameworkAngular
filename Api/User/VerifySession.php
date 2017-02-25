<?php
include_once '../Models/UserManager.php';
function verifySession(){
	session_start();
	if(!isset($_SESSION["username"])){
		header("Location:/login.html?rdr=".substr($_SERVER['REQUEST_URI'], 1));
		exit();
	}	
	return;
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
