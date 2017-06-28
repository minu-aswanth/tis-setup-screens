<?php
include 'dblinker.php';

function login(){
try {

	$link = linkToTIS();
    // $handle=$link->prepare("SELECT A.id as ID, A.username as Username, A.user as user, A.email as Email, B.role as Role, B.modules as Module, A.created as Created, A.modified as Modified from user_login A, roles B, mapping_user C where A.id=C.user_id and B.id=C.role_id order by A.id DESC"); 

    $handle=$link->prepare("SELECT A.id as ID, A.username as Username, A.user as user, A.email as Email, B.role as Role, GROUP_CONCAT(B.modules SEPARATOR ', ') as Module, A.created as Created, A.modified as Modified from user_login A, roles B, mapping_user C where A.id=C.user_id and B.id=C.role_id GROUP by A.id order by A.id  DESC;"); 

    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo login();
?>
 