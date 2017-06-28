<?php

include 'dblinker.php';

function add_signal(){
	try {
		$ip = $_POST['ip'];
		$scn = $_POST['scn'];
		$signal_group = $_POST['signal_group'];
		$short_desc = $_POST['short_desc'];
		$long_desc = $_POST['long_desc'];
		$supplier = $_POST['supplier'];
		$lat = $_POST['lat'];
		$lng = $_POST['lng'];
		$num_links = $_POST['num_links'];
		$offset = $_POST['offset'];
		$links_json = $_POST['links_json'];
		$plan_stage_json = $_POST['plan_stage_json'];
		$old_signal_id = $_POST['signal_id'];
		$link = linkToTIS();
		$handle=$link->prepare("INSERT INTO `utmc_traffic_signal_static`(`SCN`, `IPAddress`, `GroupID`, `ShortDescription`, `LongDescription`, `Supplier`, `Latitude`, `Longitude`, `NumLinks`,`SignalOffset`) VALUES ('$scn','$ip','$signal_group','$short_desc','$long_desc','$supplier','$lat','$lng','$num_links','$offset')");
		$handle->execute();
		$handle=$link->prepare("SELECT SignalID as id FROM `utmc_traffic_signal_static` WHERE `SCN`='$scn'");
		$handle->execute();
		$result=$handle->fetch(PDO::FETCH_ASSOC);
		$signal_id = (int) $result['id'];
		$json = json_decode($links_json, true);
		foreach ($json as $item)
		{
			$link_order = $item['order'];
			$link_name = $item['link_name'];
			$handle=$link->prepare("INSERT INTO `utmc_traffic_signal_static_links` (`LinkOrder`, `SignalID`, `LinkName`) VALUES ('$link_order','$signal_id','$link_name');");
			$handle->execute();
		}
		$json2 = json_decode($plan_stage_json, true);
		foreach ($json2 as $item2)
		{
			$plan_id = $item2['plan_id'];
			$stage_order = $item2['stage_order'];
			$num_movements = $item2['num_movements'];
			$stage_time = $item2['stage_time'];
			$inter_stage_time = $item2['inter_stage_time'];
			$veh_movements_str = $item2['veh_movements_str'];
			$ped_movements_str = $item2['ped_movements_str'];
			$handle=$link->prepare("INSERT INTO `utmc_traffic_signal_plans_stages`(`SignalID`, `PlanID`, `StageOrder`, `NumMovements`, `Time`, `InterStageTime`, `VehicleMovements`, `PedestrainMovements`) VALUES ('$signal_id','$plan_id','$stage_order','$num_movements','$stage_time','$inter_stage_time','$veh_movements_str','$ped_movements_str');");
			$handle->execute();
		}
		$handle2=$link->prepare("UPDATE `utmc_signal_movements` SET `signal_id` = :new_signal_id WHERE `signal_id` = :old_signal_id"); 
		$handle2->bindParam(':old_signal_id', $old_signal_id);
		$handle2->bindParam(':new_signal_id', $signal_id);
		$handle2->execute();
		
		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo add_signal();
?>