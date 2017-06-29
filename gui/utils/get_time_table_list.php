<?php

include 'dblinker.php';

function get_time_table_list(){
	try {
		$group_scn = $_POST['group_scn'];
		$link = linkToTIS();
	    $handle=$link->prepare("SELECT DISTINCT TimeTableSCN FROM `time_tables` WHERE `Group_SCN` = :group_scn "); 
	    $handle->bindParam(':group_scn', $group_scn);
	    $handle->execute();

	    $timetables = array();

		while ($row = $handle->fetch(PDO::FETCH_ASSOC)){
			$handle2=$link->prepare("SELECT * FROM `time_tables` WHERE `Group_SCN` = :group_scn AND `TimeTableSCN` = :timetable_scn"); 
		    $handle2->bindParam(':group_scn', $group_scn);
		    $handle2->bindParam(':timetable_scn', $row["TimeTableSCN"]);
		    $handle2->execute();

		    $timings = array();
		    while ($row2 = $handle2->fetch(PDO::FETCH_ASSOC)) {
		    	$time = array($row2["StartTime"],$row2["EndTime"]);
		    	array_push($timings, $time);
		    }

		    $timetable_row = array('timetable_scn' => $row["TimeTableSCN"],'time_slots' => $timings);
		    array_push($timetables, $timetable_row);
		}

		return json_encode($timetables);
	}
	catch(Exception $e){
        return "F";
    }
}
echo get_time_table_list();
?>