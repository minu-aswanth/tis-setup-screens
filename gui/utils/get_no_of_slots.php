<?php
include 'dblinker.php';

function get_timetable_slot_number(){
try {
	$timetable_scn = $_POST['timetable_scn'];
	$link = linkToTIS();
    $handle=$link->prepare("SELECT `SlotOrder`,`StartTime`,`EndTime` FROM `time_tables` WHERE `TimeTableSCN` = :timetable_scn "); 
    $handle->bindParam(':timetable_scn', $timetable_scn);
    $handle->execute();
    $slots_array = $handle->fetchall(PDO::FETCH_ASSOC);

    $result = array('count'=>count($slots_array),'slots'=>$slots_array);

	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo get_timetable_slot_number();
?>