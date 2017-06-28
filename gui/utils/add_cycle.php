<?php

include 'dblinker.php';

function add_cycle(){
	try {
		$cycle_scn = $_POST['cycle_scn'];
		$cycle_desc = $_POST['cycle_desc'];
		$signal_id = $_POST['signal_id'];
		$cycles_stages_str = $_POST['cycles_stages_str'];
		$link = linkToTIS();
		$handle=$link->prepare("INSERT INTO `utmc_signal_profile_cycles` (`CycleSCN`, `CycleDescription`, `SignalID`) VALUES ('$cycle_scn','$cycle_desc','$signal_id');");
		$handle->execute();
		$handle=$link->prepare("SELECT CycleID as id FROM `utmc_signal_profile_cycles` WHERE `CycleSCN`='$cycle_scn'");
		$handle->execute();
		$result=$handle->fetch(PDO::FETCH_ASSOC);
		$cycle_id = (int) $result['id'];
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
echo add_cycle();
?>