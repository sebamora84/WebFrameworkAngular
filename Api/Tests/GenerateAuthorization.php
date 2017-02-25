<?php

include_once '../Models/UserManager.php';

$um = new UserManager();
$accounts = $um->createResource("accounts.html","Cuentas");
$cash = $um->createResource("cash.html","Caja");
$hall = $um->createResource("hall.html","Salon");
$products = $um->createResource("products.html","Productos");
$system = $um->createResource("system.html","Sistema");
$users = $um->createResource("users.html","Usuarios");
$profile = $um->createResource("profile.html","Perfil");

$administrador = $um->createRole("Administrador");
$encargado = $um->createRole("Encargado");
$usuario = $um->createRole("Usuario");

$fer = $um->createUser("fernando", "fermagna@hotmail.com", "fernando17");
$richard = $um->createUser("richard", "richardmagna@hotmail.com", "richard17");

$um->createRoleResource($administrador, $accounts);
$um->createRoleResource($administrador, $cash);
$um->createRoleResource($administrador, $hall);
$um->createRoleResource($administrador, $products);
$um->createRoleResource($administrador, $system);
$um->createRoleResource($administrador, $users);

$um->createRoleResource($encargado, $cash);
$um->createRoleResource($encargado, $hall);

$um->createRoleResource($usuario, $profile);

$um->createUserRole($fer, $administrador);
$um->createUserRole($fer, $usuario);
$um->createUserRole($richard, $encargado);
$um->createUserRole($richard, $usuario);


?>