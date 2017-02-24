<?php

include_once '../Models/UserManager.php';

$um = new UserManager();
$accounts = $um->createResource("/accounts.html");
$cash = $um->createResource("/cash.html");
$hall = $um->createResource("/hall.html");
$products = $um->createResource("/products.html");
$system = $um->createResource("/system.html");
$users = $um->createResource("/users.html");

$administrador = $um->createRole("Administrador");
$encargado = $um->createRole("Encargado");

$fer = $um->createUser("fernando", "fermagna@hotmail.com", "fernando17");
$richard = $um->createUser("richard", "richardmagna@hotmail.com", "richard17");

$um->createRoleResource($administrador, $accounts);
$um->createRoleResource($administrador, $cash);
$um->createRoleResource($administrador, $hall);
$um->createRoleResource($administrador, $products);
$um->createRoleResource($administrador, $system);
$um->createRoleResource($administrador, $users);

$um->createRoleResource($administrador, $cash);
$um->createRoleResource($administrador, $hall);

$um->createUserRole($fer, $administrador);
$um->createUserRole($richard, $encargado);


?>