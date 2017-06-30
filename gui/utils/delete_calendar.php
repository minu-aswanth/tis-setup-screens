<?php

include 'dblinker.php';

function delete_calendar(){
	try {
		$calendar = json_decode($_POST['calendar']);
		$group_scn = $_POST['group_scn'];
		print_r($calendar);
		
		$link = linkToTIS();
		$handle=$link->prepare("DELETE FROM `calendar` WHERE `Group_SCN` = :group_scn");
		$handle->bindParam(':group_scn', $group_scn);
		$handle->execute();

		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo delete_calendar();
?>