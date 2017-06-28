<?php

include 'dblinker.php';

function get_groupname_status(){
	try {
		$group_name = $_POST['group_name'];
		$link = linkToTIS();
		$handle=$link->prepare("SELECT count(*) as count FROM `utmc_traffic_signal_groups` WHERE `GroupName`='$group_name'");
		$handle->execute();
		$result=$handle->fetch(PDO::FETCH_ASSOC);
		$count = (int) $result['count'];
		return $count;
	}
	catch(Exception $e){
        return "F";
    }
}
echo get_groupname_status();
?>