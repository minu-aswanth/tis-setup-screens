<?php

include 'dblinker.php';

function add_special_event(){
	try {
		$calendar = json_decode($_POST['calendar']);
		$group_scn = $_POST['group_scn'];
		$event_date = $_POST['event_date'];
		$timetable_scn = $_POST['timetable_scn'];
		
		$link = linkToTIS();
	
		foreach ($calendar as $plan) {
			$handle=$link->prepare("INSERT INTO `special_event` (`Date`, `Group_SCN`, `TimeTable_SCN`, `slot_order`, `Plan_SCN`) VALUES (:date_day, :group_scn, :timetable_scn, :slot_order, :plan_scn )");
			$handle->bindParam(':date_day', $event_date);
			$handle->bindParam(':group_scn', $group_scn);
			$handle->bindParam(':timetable_scn', $timetable_scn);
			$handle->bindParam(':slot_order', $plan->slot_order);
			$handle->bindParam(':plan_scn', $plan->plan_scn);
			$handle->execute();
			print_r($plan);

		}

	
		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo add_special_event();
?>