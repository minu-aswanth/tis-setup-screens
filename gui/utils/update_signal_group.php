<?php

include 'dblinker.php';

function update_group(){
	try {
		$group_scn = $_POST['group_scn'];
		$signal_scn = $_POST['signal_scn'];
		$link = linkToTIS();
		$handle=$link->prepare("UPDATE `utmc_traffic_signal_static` SET `Group_SCN`= :group_scn WHERE `SCN`= :signal_scn");
		$handle->bindParam(':group_scn', $group_scn);
		$handle->bindParam(':signal_scn', $signal_scn);
		$handle->execute();
		
		return "success";
	}
	catch(Exception $e){
        return "F";
    }
}
echo update_group();
?>