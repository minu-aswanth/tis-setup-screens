<?php

include 'dblinker.php';

function update_time_table(){
	try {
		$group_scn = $_POST['group_scn'];
		$timetable_scn = $_POST['timetable_scn'];
		$time_slots = json_decode($_POST['time_slots']);
		
		$link = linkToTIS();
		$handle=$link->prepare("INSERT INTO `time_tables`(`TimeTableSCN`, `Group_SCN`, `StartTime`, `EndTime`) VALUES (:timetable_scn,:group_scn,:start_time,:end_time)");
		$handle->bindParam(':group_scn', $group_scn);
		$handle->bindParam(':timetable_scn', $timetable_scn);
		$handle->execute();
		
		foreach ($time_slots as $slot) {
			$handle=$link->prepare("INSERT INTO `time_tables`(`TimeTableSCN`, `Group_SCN`, `StartTime`, `EndTime`) VALUES (:timetable_scn,:group_scn,:start_time,:end_time)");
			$handle->bindParam(':group_scn', $group_scn);
			$handle->bindParam(':timetable_scn', $timetable_scn);
			$handle->bindParam(':start_time', $slot[0]);
			$handle->bindParam(':end_time', $slot[1]);
			$handle->execute();
		}
		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo update_time_table();
?>