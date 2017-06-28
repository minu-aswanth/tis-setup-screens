<?php
include 'dblinker.php';

function get_signal_stage_info(){
try {
	$signal_id = $_POST['signal_id'];
	$link = linkToTIS();
    $handle=$link->prepare("SELECT * FROM `utmc_traffic_signal_plans_stages` WHERE  `SignalID` = '$signal_id' ORDER BY `StageID`,`PlanID` ASC "); 
    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo get_signal_stage_info();
?>