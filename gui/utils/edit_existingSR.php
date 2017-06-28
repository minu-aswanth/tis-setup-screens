<?php
include 'dblinker.php';

function login(){
try {
	$sr = $_POST['sr'];
	$module = $_POST['module'];
	$device = $_POST['device'];
	$subject = $_POST['subject'];
	$status = $_POST['status'];
	$username = $_POST['username'];
	$observation = $_POST['observation'];
	$action = $_POST['action'];
	
	$link = linkToTIS();
    $handle=$link->prepare("UPDATE `tis_maintenance_sr` SET `status`='Closed',`user_closed`='$username',`closed_date`=now(),`Observation`='$observation',`Action`='$action' WHERE `sr_number`='$sr'"); 
    $handle->execute();
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo login();
?>