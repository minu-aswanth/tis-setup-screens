<?php

include 'dblinker.php';

function delete_plan(){
	try {
		$plan_scn = $_POST['plan_scn'];
		
		$link = linkToTIS();
		
		$handle=$link->prepare("DELETE FROM `plans` WHERE `PlanSCN` = :plan_scn");
		$handle->bindParam(':plan_scn', $plan_scn);
		$handle->execute();

		$handle=$link->prepare("DELETE FROM `signal_timings` WHERE `Plan_SCN` = :plan_scn");
		$handle->bindParam(':plan_scn', $plan_scn);
		$handle->execute();

		$handle=$link->prepare("DELETE FROM `offsets` WHERE `Plan_SCN` = :plan_scn");
		$handle->bindParam(':plan_scn', $plan_scn);
		$handle->execute();

		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo delete_plan();
?>