<?php
include 'dblinker.php';

function get_signals(){
	try {
		$link = linkToTIS();
	    $handle=$link->prepare("SELECT `utmc_traffic_signal_static`.*, `utmc_traffic_signal_groups`.`GroupName` FROM `utmc_traffic_signal_static` inner join `utmc_traffic_signal_groups` on `utmc_traffic_signal_groups`.`GroupID`= `utmc_traffic_signal_static`.`GroupID` "); 
	    $handle->execute();
		$result=$handle->fetchall(PDO::FETCH_ASSOC);
		return json_encode($result);
	}
	catch(Exception $e){
        return "F";
    }
}
echo get_signals();
?>
