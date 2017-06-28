<?php

include 'dblinker.php';

function get_groupname_status(){
	try {
		$group_scn = $_POST['group_scn'];
		$link = linkToTIS();
		$handle=$link->prepare("SELECT * FROM `groups` WHERE `SCN`=:group_scn");
		$handle->bindParam(':group_scn', $group_scn);
		$handle->execute();
		$result=$handle->fetchall(PDO::FETCH_ASSOC);
		$count = count($result);
		return $count;
	}
	catch(Exception $e){
        return "F";
    }
}
echo get_groupname_status();
?>