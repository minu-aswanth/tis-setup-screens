<?php

include 'dblinker.php';

function add_time_table(){
	try {
		$group_scn = $_POST['group_scn'];
		$timetable_scn = $_POST['timetable_scn'];
		$time_slots = $_POST['time_slots'];
		$link = linkToTIS();
		foreach ($time_slots as $slot) {
			echo $slot[0].",";
			echo $slot[1].",";
		}
		// $handle=$link->prepare("INSERT INTO `time_tables`(`TimeTableSCN`, `Group_SCN`, `StartTime`, `EndTime`) VALUES (:timetable_scn,:group_scn,:start_time,:end_time)");
		// $handle->bindParam(':group_scn', $group_scn);
		// $handle->bindParam(':timetable_scn', $timetable_scn);
		// $handle->bindParam(':start_time', $start_time);
		// $handle->bindParam(':end_time', $end_time);
		// $handle->execute();




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
echo add_time_table();
?>