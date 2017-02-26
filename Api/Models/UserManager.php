<?php
require_once '../Database/rb.php';
class UserManager 
{	
	function __construct(){
		require_once '../Database/dbsetup.php';
	}
	
	function getUserByName($username){
		$user = R::findOne( 'user', 'username=?', [ $username] );
		return $user;		
	}

	function isAuthenticated($username, $password){
		$user = R::findOne( 'user', 'username=?', [ $username] );
		$auth = $user->ownAuthorizationList[0];
		return password_verify($password, $auth->hash);
	}		
	
	function getUser($id){				
		$user = R::load('user', $id);;
		return $user;
	}
	function getAllUsers(){
		$users = R::find( 'user', 'username!="superuser" ORDER BY id');
		return $users;
	}
	
	function createUser($username, $password){		
		  $user = R::dispense( 'user' );
		  $user->username = $username;
		  $user->reset = true;
		  $user->sharedRoleList=array();
		  $id = R::store( $user );

		  $auth = R::dispense( 'authentication' );
		  $auth->user=$user;
		  $auth->hash=password_hash($password , PASSWORD_DEFAULT);
		  R::store( $auth );
		  
		  return $id;
	}
	
	//Authorization
	
	function createRole($description){
		$role = R::dispense( 'role' );
		$role->description = $description;
		$role->sharedResourceList=array();
		$id = R::store( $role );
		return $id;
	}
	function createUserRole($userId, $roleId){
		$user = R::load('user', $userId);
		$user->sharedRoleList[]=R::load('role', $roleId);
		$id = R::store( $user );
		return $id;
	}
	function createResource($uri, $description){
		$resource = R::dispense( 'resource' );
		$resource->uri = $uri;
		$resource->description = $description;
		$id = R::store( $resource );
		return $id;
	}
	function createRoleResource($roleId, $resourceId){
		$role = R::load('role', $roleId);
		$role->sharedResourceList[]=R::load('resource', $resourceId);
		$id = R::store( $role );
		return $id;
	}
	function getUserAuthorizations($username){
		$sql = "SELECT role.description as role, resource.description as resource, resource.uri FROM user
				INNER JOIN role_user ON user.id=role_user.user_id
				INNER JOIN role ON role_user.role_id=role.id
				INNER JOIN resource_role ON role.id=resource_role.role_id
				INNER JOIN resource ON resource_role.resource_id=resource.id
				WHERE user.username = ?";
		$userAuthorizations = R::getAll($sql, [$username]);
		return $userAuthorizations;
	}
}

?>
