<?php

include 'dblinker.php';

function update_plan(){
	try {
		$group_scn = $_POST['group_scn'];
		$plan_scn = $_POST['plan_scn'];
		$cycle_time = $_POST['cycle_time'];
		
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

		$handle=$link->prepare("INSERT INTO `plans`(`PlanSCN`, `Group_SCN`, `CycleTime`) VALUES (:plan_scn, :group_scn, :cycle_time)");
		$handle->bindParam(':group_scn', $group_scn);
		$handle->bindParam(':plan_scn', $plan_scn);
		$handle->bindParam(':cycle_time', $cycle_time);
		$handle->execute();

		$signals = json_decode($_POST['signals']);
		foreach ($signals as $signal) {
			$signal_scn = $signal->signal_scn;
			$signal_id = $signal->signal_id;
			$i = 1;
			foreach ($signal->timings as $time) {
				$handle=$link->prepare("INSERT INTO `signal_timings`(`SignalID`, `SignalSCN`, `Plan_SCN`, `StageNumber`, `StageTime`) VALUES (:signal_id, :signal_scn, :plan_scn, :stage_number, :stage_time)");
				$handle->bindParam(':signal_id', $signal_id);
				$handle->bindParam(':signal_scn', $signal_scn);
				$handle->bindParam(':plan_scn', $plan_scn);
				$handle->bindParam(':stage_number', $i);
				$handle->bindParam(':stage_time', $time);
				$handle->execute();
				$i++;
			}
		}

		$offsets = json_decode($_POST['offsets']);
		foreach ($offsets as $offset) {
			$handle=$link->prepare("INSERT INTO `offsets`(`Plan_SCN`, `Origin_Signal_SCN`, `Destination_Signal_SCN`, `OffsetTime`) VALUES (:plan_scn, :origin_signal_scn, :destination_signal_scn, :offset_time)");
			$handle->bindParam(':plan_scn', $plan_scn);
			$handle->bindParam(':origin_signal_scn', $offset->start_signal_scn);
			$handle->bindParam(':destination_signal_scn', $offset->end_signal_scn);
			$handle->bindParam(':offset_time', $offset->offset_time);
			$handle->execute();
		}

		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo update_plan();
?>