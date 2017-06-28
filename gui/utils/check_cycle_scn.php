<?php

include 'dblinker.php';

function check_cycle_scn(){
	try {
		$scn = $_POST['cycle_scn'];
		$link = linkToTIS();
		$handle=$link->prepare("SELECT COUNT( * ) AS count FROM  `utmc_signal_profile_cycles` WHERE  `CycleSCN` = '$cycle_scn'");
		$handle->execute();
		$result=$handle->fetch(PDO::FETCH_ASSOC);
		$count = (int) $result['count'];
		return $count;
	}
	catch(Exception $e){
        return "F";
    }
}
echo check_cycle_scn();
?>