<?php
include 'dblinker.php';

function get_groups(){
	try{
		$link = linkToTIS();
	    $handle=$link->prepare("SELECT `GroupID`,`GroupName` FROM `utmc_traffic_signal_groups` WHERE 1"); 
	    $handle->execute();
		$result=$handle->fetchall(PDO::FETCH_ASSOC);
		return json_encode($result);
	}
	catch(Exception $e){
	    return "F";
	}
}
session_start();
echo get_groups();
?>
