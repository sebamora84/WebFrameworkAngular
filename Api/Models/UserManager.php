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
		  $user->reset = true;
		  $id = R::store( $user );
		  return $id;
	}
	//Authorization

	function createResource($uri, $description){
		$resource = R::dispense( 'resource' );
		$resource->uri = $uri;
		$resource->description = $description;
		$id = R::store( $resource );
		return $id;
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
	
	function getUserAuthorizations($username){
		$sql = "SELECT resource.uri, resource.description FROM user
				INNER JOIN userrole ON user.id=userrole.user_id
				INNER JOIN role ON userrole.role_id=role.id
				INNER JOIN roleresource ON role.id=roleresource.role_id
				INNER JOIN resource ON roleresource.resource_id=resource.id
				WHERE user.username = ?";
		$userAuthorizations = R::getAll($sql, [$username]);
		return $userAuthorizations;		
	}	
}

?>
