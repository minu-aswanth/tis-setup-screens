<?php
include 'dblinker.php';

function get_groups(){
	try{
		$group_id = $_POST['group_id'];
		$link = linkToTIS();
	    $handle=$link->prepare("SELECT `PlanID`,`StartTime`,`EndTime` FROM `utmc_traffic_signal_groups_plans` WHERE `GroupId`='$group_id'"); 
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
