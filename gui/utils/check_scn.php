<?php

include 'dblinker.php';

function check_scn(){
	try {
		$scn = $_POST['scn'];
		$link = linkToTIS();
		$handle=$link->prepare("SELECT count(*) as count FROM `utmc_traffic_signal_static` WHERE `SCN`='$scn'");
		$handle->execute();
		$result=$handle->fetch(PDO::FETCH_ASSOC);
		$count = (int) $result['count'];
		return $count;
	}
	catch(Exception $e){
        return "F";
    }
}
echo check_scn();
?>