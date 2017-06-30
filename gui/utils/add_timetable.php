<?php

include 'dblinker.php';

function add_time_table(){
	try {
		$group_scn = $_POST['group_scn'];
		$timetable_scn = $_POST['timetable_scn'];
		$time_slots = json_decode($_POST['time_slots']);
		$link = linkToTIS();
		$i = 1;
		foreach ($time_slots as $slot) {
			$handle=$link->prepare("INSERT INTO `time_tables`(`TimeTableSCN`, `Group_SCN`, `SlotOrder`, `StartTime`, `EndTime`) VALUES (:timetable_scn,:group_scn,:slot_order,:start_time,:end_time)");
			$handle->bindParam(':group_scn', $group_scn);
			$handle->bindParam(':timetable_scn', $timetable_scn);
			$handle->bindParam(':slot_order', $i);
			$handle->bindParam(':start_time', $slot[0]);
			$handle->bindParam(':end_time', $slot[1]);
			$handle->execute();
			$i++;
		}
		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo add_time_table();
?>