<?php
require_once '../Database/rb.php';
class UserManager 
{	
	function __construct(){
		require_once '../Database/dbsetup.php';
	}
	
	function getUserByName($user_name){
		$user = R::findOne( 'user', 'username=?', [ $user_name] );
		return $user;		
	}

	function isAuthenticated($username, $password){
		$user = R::findOne( 'user', 'username=?', [ $username] );
		return password_verify($password, $user->password);
	}		
	
	function getUser($id){				
		$user = R::load('user', $id);;
		return $user;
	}
	function getAllUsers(){
		$users = R::find( 'user', 'username!="superuser" ORDER BY id');
		return $users;
	}
	
	function createUser($username, $email, $password){		
		  $user = R::dispense( 'user' );
		  $user->username = $username;
		  $user->email = $email;
		  $user->password = password_hash($password , PASSWORD_DEFAULT);
		  $id = R::store( $user );
		  return $id;
	}
	//Authorization
	function getResourceByUri($uri){
		$resource = R::findOne( 'resource', 'uri=? ORDER BY id',[$uri]);
		return $resource;
	}
	function createResource($uri){
		$resource = R::dispense( 'resource' );
		$resource->uri = $uri;
		$id = R::store( $resource );
		return $id;
	}
	
	function getRolesByResource($resourceId){
		$users = R::find( 'role', 'resource_id=? ORDER BY id',[$resourceId]);
		return $users;
	}
	function getRole($id){
		$role = R::load('role', $id);;
		return $role;
	}
	function createRole($description){
		$role = R::dispense( 'role' );
		$role->description = $description;
		$id = R::store( $role );
		return $id;
	}
	function createRoleResource( $roleId, $resourceId){
		$roleresource = R::dispense( 'roleresource' );
		$roleresource->roleId = $roleId;
		$roleresource->resourceId = $resourceId;
		$id = R::store( $roleresource );
		return $id;		
	}
	function createUserRole($userId, $roleId){
		$userrole = R::dispense( 'userrole' );
		$userrole->roleId = $roleId;
		$userrole->userId = $userId;
		$id = R::store( $userrole );
		return $id;
	}
	
	function isAuthorized($username, $uri){
		$resource = self::getResourceByUri($uri);
		$authorizedRoles = self::getRolesByResource($resource->id);
		$user = self::getUserByName($username);
	}
	
}

?>
