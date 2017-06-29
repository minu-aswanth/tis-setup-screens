<?php

include 'dblinker.php';

function delete_time_table(){
	try {
		$group_scn = $_POST['group_scn'];
		$timetable_scn = $_POST['timetable_scn'];
		
		$link = linkToTIS();
		$handle=$link->prepare("DELETE FROM `time_tables` WHERE `Group_SCN` = :group_scn AND `TimeTableSCN` = :timetable_scn");
		$handle->bindParam(':group_scn', $group_scn);
		$handle->bindParam(':timetable_scn', $timetable_scn);
		$handle->execute();
		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo delete_time_table();
?>