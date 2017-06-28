<?php

include 'dblinker.php';

function edit_cycle(){
	try {
		$cycle_id = $_POST['cycle_id'];
		$cycles_stages_str = $_POST['cycles_stages_str'];
		$link = linkToTIS();
		$handle=$link->prepare("DELETE FROM `utmc_signal_profile_data` WHERE `CycleID` = '$cycle_id'");
		$handle->execute();
		$json = json_decode($cycles_stages_str, true);
		foreach ($json as $item)
		{
			$stage_order = $item['stage_order'];
			$num_movements = $item['num_movements'];
			$stage_time = $item['stage_time'];
			$inter_stage_time = $item['inter_stage_time'];
			$veh_movements_str = $item['veh_movements_str'];
			$ped_movements_str = $item['ped_movements_str'];
			$handle=$link->prepare("INSERT INTO `utmc_signal_profile_data`(`CycleID`, `StageOrder`, `NumMovements`, `StageTime`, `InterStageTime`, `VehicleMovements`, `PedestrainMovements`) VALUES ('$cycle_id','$stage_order','$num_movements','$stage_time','$inter_stage_time','$veh_movements_str','$ped_movements_str')");
			$handle->execute();
		}
		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo edit_cycle();
?>