<?php

include 'dblinker.php';

function update_special_event(){
	try {
		$group_scn = $_POST['group_scn'];
		$event_date = $_POST['event_date'];
		
		$link = linkToTIS();

		$handle=$link->prepare("DELETE FROM `special_event` WHERE `Group_SCN` = :group_scn AND `Date` = :event_date");
		$handle->bindParam(':event_date', $event_date);
		$handle->bindParam(':group_scn', $group_scn);
		$handle->execute();

		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo update_special_event();
?>