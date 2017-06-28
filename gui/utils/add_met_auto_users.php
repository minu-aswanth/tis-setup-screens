<?php
include 'dblinker.php';

function get_users(){
	try {
		$user = $_POST["user"];
		$frequency = $_POST["frequency"];
		$link = linkToTIS();
		$handle=$link->prepare("SELECT * FROM `tis_meteorological_auto_rep` WHERE `user`='$user'"); 
	    $handle->execute();
	    $result=$handle->fetchall(PDO::FETCH_ASSOC);
	    $count = (int)count($result);
	    if ($count > 0) {
	    	 return 'User Already Exists';
	    }
	   	else{
		    $handle=$link->prepare("INSERT INTO `tis_meteorological_auto_rep`(`user`, `frequency`) VALUES ('$user','$frequency')"); 
		    $handle->execute();
			return "Added User Successfully!";
		}
	}
	catch(Exception $e){
	        return 'F';
	}
}
echo get_users();
?>
