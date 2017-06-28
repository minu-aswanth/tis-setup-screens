<?php
include 'dblinker.php';

function login(){
try {
	$profileID = $_POST['profileID'];
	
	$link = linkToTIS();
    $handle=$link->prepare("DELETE FROM `utmc_detector_profile_data` WHERE `ProfileId`='$profileID'"); 
    $handle->execute();
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo login();
?>