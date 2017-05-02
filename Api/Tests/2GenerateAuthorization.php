<?php

include_once '../Models/UserManager.php';

$um = new UserManager();


$index = $um->createResource(1,"index.html","Inicio",true);


$reports = $um->createResource(10,"reports.html","Reportes",true);
$users = $um->createResource(11,"users.html","Usuarios",true);
$system = $um->createResource(12,"system.html","Sistema",true);
$profile = $um->createResource(20,"profile.html","Perfil",false);
$login = $um->createResource(21,"login.html","Iniciar Sesion",false);
$notAuthorized= $um->createResource(22,"notAuthorized.html","No Autorizado",false);
$underConstruction = $um->createResource(100,"underConstruction.html","En Construccion",false);

$administrador = $um->createRole("Administrador");
$operario = $um->createRole("Operario");
$usuario = $um->createRole("Usuario");


$um->createRoleResource($usuario, $index);
$um->createRoleResource($usuario, $profile);

//$um->createRoleResource($administrador, $hall);
//$um->createRoleResource($administrador, $credit);
//$um->createRoleResource($administrador, $cash);
//$um->createRoleResource($administrador, $products);
$um->createRoleResource($administrador, $reports);
$um->createRoleResource($administrador, $users);
$um->createRoleResource($administrador, $system);

$um->createRoleResource($operario, $reports);

$superuser = $um->getUserByName("superuser");
$um->createUserRole($superuser->id, $usuario);
$um->deleteUserRole($superuser,$usuario);

?>