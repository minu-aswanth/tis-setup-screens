<?php

include 'dblinker.php';

function update_group(){
	try {
		$group_scn = $_POST['group_scn'];
		$signal_scn = $_POST['signal_scn'];
		$link = linkToTIS();
		$handle=$link->prepare("UPDATE `utmc_traffic_signal_static` SET `Group_SCN`= :group_scn WHERE `SCN`= :signal_scn");
		$handle->bindParam(':group_scn', $group_scn);
		$handle->bindParam(':signal_scn', $signal_scn);
		$handle->execute();

		$handle=$link->prepare("SELECT SignalID FROM `utmc_traffic_signal_static` WHERE `SCN`= :signal_scn");
		$handle->bindParam(':signal_scn', $signal_scn);
		$handle->execute();
		$row = $handle->fetch(PDO::FETCH_ASSOC);
		$signal_id = $row["SignalID"];

		$plan_info = json_decode($_POST['plan_info']);
		print_r($plan_info);
		foreach ($plan_info as $plan) {
			$plan_scn = $plan->plan_scn;
			$i = 1;
			foreach ($plan->timings as $time) {
				$handle=$link->prepare("INSERT INTO `signal_timings`(`SignalID`, `SignalSCN`, `Plan_SCN`, `StageNumber`, `StageTime`) VALUES (:signal_id, :signal_scn, :plan_scn, :stage_number, :stage_time)");
				$handle->bindParam(':signal_id', $signal_id);
				$handle->bindParam(':signal_scn', $signal_scn);
				$handle->bindParam(':plan_scn', $plan_scn);
				$handle->bindParam(':stage_number', $i);
				$handle->bindParam(':stage_time', $time);
				$handle->execute();
				$i++;
			}

			$offset = $plan->offset_info;
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
echo update_group();
?>