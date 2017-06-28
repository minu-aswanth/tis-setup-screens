<?php
include 'dblinker.php';

function get_roles(){
try {
		$username = $_SESSION["username"];
		if(strlen($username) > 30){
			return "";
		}else{
			$link = linkToTIS();
			$handle=$link->prepare("SELECT `user` FROM `user_login` WHERE `username`='$username'"); 
		    $handle->execute();

			$result=$handle->fetch(PDO::FETCH_ASSOC);
        	$user = $result['user'];
        	return $user;
			//$result=$handle->fetchall(PDO::FETCH_ASSOC);
			//return json_encode($result);
			//return $_SESSION["username"];
		}
			

    }

catch(Exception $e){
        return "F";
    }
}
session_start();
echo get_roles();
?>
