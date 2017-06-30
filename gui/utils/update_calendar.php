<?php

include 'dblinker.php';

function update_calendar(){
	try {
		$calendar = json_decode($_POST['calendar']);
		$group_scn = $_POST['group_scn'];
		print_r($calendar);
		
		$link = linkToTIS();
		$handle=$link->prepare("DELETE FROM `calendar` WHERE `Group_SCN` = :group_scn");
		$handle->bindParam(':group_scn', $group_scn);
		$handle->execute();


		foreach ($calendar as $day) {
			$date = $day->day;
			$timetable_scn = $day->timetable_scn;
			foreach ($day->plan_info as $plan) {
				$handle=$link->prepare("INSERT INTO `calendar`(`Date`, `Group_SCN`, `TimeTable_SCN`, `Slot_Order`, `Plan_SCN`) VALUES (:date_day, :group_scn, :timetable_scn, :slot_order, :plan_scn )");
				$handle->bindParam(':date_day', $date);
				$handle->bindParam(':group_scn', $group_scn);
				$handle->bindParam(':timetable_scn', $timetable_scn);
				$handle->bindParam(':slot_order', $plan->slot_order);
				$handle->bindParam(':plan_scn', $plan->plan_scn);
				$handle->execute();
			}

		}
		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo update_calendar();
?>