<?php

include 'dblinker.php';

function get_groupname_status(){
	try {
		$group_scn = $_POST['group_scn'];
		$link = linkToTIS();
		$handle=$link->prepare("SELECT count(*) as count FROM `groups` WHERE `SCN`=':group_scn'");
		$handle->bindParam(':group_scn', $group_scn);
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