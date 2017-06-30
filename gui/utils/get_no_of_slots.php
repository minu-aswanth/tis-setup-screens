<?php
include 'dblinker.php';

function get_timetable_slot_number(){
try {
	$timetable_scn = $_POST['timetable_scn'];
	$link = linkToTIS();
    $handle=$link->prepare("SELECT * FROM `time_tables` WHERE `TimeTableSCN` = :timetable_scn "); 
    $handle->bindParam(':timetable_scn', $timetable_scn);
    $handle->execute();
    $result = $handle->fetchall(PDO::FETCH_ASSOC);

	return json_encode(count($result));
}

catch(Exception $e){
        return "F";
    }
}
echo get_timetable_slot_number();
?>