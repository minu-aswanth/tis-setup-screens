<?php

include 'dblinker.php';

function update_group(){
	try {
		$group_name = $_POST['group_name'];
		$group_description = $_POST['group_description'];
		$group_scn = $_POST['group_scn'];
		$link = linkToTIS();
		$handle=$link->prepare("UPDATE `groups` SET `Name`= :group_name,`Description`= :group_description WHERE `SCN`=:group_scn");
		$handle->bindParam(':group_scn', $group_scn);
		$handle->bindParam(':group_name', $group_name);
		$handle->bindParam(':group_description', $group_description);
		$handle->execute();
		// $handle=$link->prepare("SELECT GroupID as id FROM `utmc_traffic_signal_groups` ORDER BY `GroupID` DESC LIMIT 1;");
		// $handle->execute();
		// $result=$handle->fetch(PDO::FETCH_ASSOC);
		// $id = (int) $result['id'];
		// $json = json_decode($string, true);
		// foreach ($json as $item)
		// {
		// 	$planorder = $item['order'];
		// 	$start = $item['start'];
		// 	$end = $item['end'];
		// 	$handle=$link->prepare("INSERT INTO `utmc_traffic_signal_groups_plans` (`PlanOrder`, `GroupID`, `StartTime`, `EndTime`) VALUES ('$planorder','$id','$start','$end');");
		// 	$handle->execute();
		// }
		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo update_group();
?>