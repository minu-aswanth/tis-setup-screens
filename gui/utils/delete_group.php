<?php
include 'dblinker.php';

function delete_group(){
try {
	$group_scn = $_POST['group_scn'];
	$link = linkToTIS();
    $handle=$link->prepare("DELETE FROM `groups` WHERE `SCN` = :group_scn"); 
    $handle->bindParam(':group_scn', $group_scn);
	$handle->execute();
    // $handle=$link->prepare("DELETE FROM `utmc_traffic_signal_groups_plans` WHERE `GroupID` = '$group_id'"); 
    // $handle->execute();
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo delete_group();
?>