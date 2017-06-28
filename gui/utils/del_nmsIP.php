<?php
include 'dblinker.php';

function login(){
try {
	$profileID = $_POST['profileID'];
	
	$link = linkToTIS();
    $handle=$link->prepare("DELETE FROM `nms_ip_address` WHERE `RowId`='$profileID'"); 
    $handle->execute();
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo login();
?>