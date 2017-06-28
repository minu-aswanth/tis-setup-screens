<?php
include 'dblinker.php';

function delete_signal(){
try {
	$signal_id = $_POST['signal_id'];
	$link = linkToTIS();
    $handle=$link->prepare("DELETE FROM `utmc_traffic_signal_static` WHERE `SignalID` = '$signal_id'"); 
    $handle->execute();
    $handle=$link->prepare("DELETE FROM `utmc_traffic_signal_static_links` WHERE `SignalID` = '$signal_id'"); 
    $handle->execute();
    $handle=$link->prepare("DELETE FROM `utmc_traffic_signal_plans_stages` WHERE `SignalID` = '$signal_id'"); 
    $handle->execute();
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo delete_signal();
?>