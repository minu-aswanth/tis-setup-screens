<?php
include 'dblinker.php';

function get_cycles(){
	try{
		$link = linkToTIS();
	    $handle=$link->prepare("SELECT `utmc_signal_profile_cycles`.`CycleID` as CycleID, `utmc_signal_profile_cycles`.`CycleSCN` as CycleSCN, `utmc_signal_profile_cycles`.`CycleDescription` as CycleDescription, `utmc_traffic_signal_static`.`SCN` as SignalSCN, `utmc_traffic_signal_static`.`SignalID` as SignalID, `utmc_traffic_signal_static`.`NumLinks` as NumLinks FROM  `utmc_signal_profile_cycles` INNER JOIN `utmc_traffic_signal_static` WHERE `utmc_traffic_signal_static`.`SignalID` = `utmc_signal_profile_cycles`.`SignalID`"); 
	    $handle->execute();
		$result=$handle->fetchall(PDO::FETCH_ASSOC);
		return json_encode($result);
	}
	catch(Exception $e){
	    return "F";
	}
}

echo get_cycles();
?>
