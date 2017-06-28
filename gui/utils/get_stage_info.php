<?php
include 'dblinker.php';

function get_stage_info(){
try {
	$cycle_id = $_POST['cycle_id'];
	$link = linkToTIS();
    $handle=$link->prepare("SELECT * FROM `utmc_signal_profile_data` WHERE  `CycleID` = '$cycle_id' ORDER BY `StageOrder` ASC "); 
    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo get_stage_info();
?>