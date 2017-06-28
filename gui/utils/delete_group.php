<?php
include 'dblinker.php';

function login(){
try {
	$group_id = $_POST['group_id'];
	$link = linkToTIS();
    $handle=$link->prepare("DELETE FROM `utmc_traffic_signal_groups` WHERE `GroupID` = '$group_id'"); 
    $handle->execute();
    $handle=$link->prepare("DELETE FROM `utmc_traffic_signal_groups_plans` WHERE `GroupID` = '$group_id'"); 
    $handle->execute();
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo login();
?>