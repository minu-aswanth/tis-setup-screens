<?php

include 'dblinker.php';

function delete_cycle(){
	try {
		$cycle_id = $_POST['cycle_id'];
		$link = linkToTIS();
		$handle=$link->prepare("DELETE FROM `utmc_signal_profile_data` WHERE `CycleID` = '$cycle_id'");
		$handle->execute();
		$handle=$link->prepare("DELETE FROM `utmc_signal_profile_cycles` WHERE `CycleID` = '$cycle_id'");
		$handle->execute();
		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo delete_cycle();
?>