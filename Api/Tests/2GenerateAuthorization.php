<?php

include_once '../Models/UserManager.php';

$um = new UserManager();

$index = $um->createResource(10,"index.html","Inicio",false);


$reports = $um->createResource(15,"reports.html","Reportes",true);
$users = $um->createResource(16,"users.html","Usuarios",true);
$system = $um->createResource(17,"system.html","Sistema",true);

$root = $um->createResource(20,"","Root",false);
$profile = $um->createResource(21,"profile.html","Perfil",false);
$login = $um->createResource(22,"login.html","Iniciar Sesion",false);
$notAuthorized= $um->createResource(23,"notAuthorized.html","No Autorizado",false);
$underConstruction = $um->createResource(24,"underConstruction.html","En Construccion",false);

$administrador = $um->createRole("Administrador");
$operario = $um->createRole("Operario");
$usuario = $um->createRole("Usuario");

$um->createRoleResource($usuario, $index);
$um->createRoleResource($usuario, $root);
$um->createRoleResource($usuario, $profile);

$um->createRoleResource($administrador, $reports);
$um->createRoleResource($administrador, $users);
$um->createRoleResource($administrador, $system);

$um->createRoleResource($operario, $reports);

$superuser = $um->getUserByName("superuser");
$um->createUserRole($superuser->id, $usuario);
$um->deleteUserRole($superuser,$usuario);

?>