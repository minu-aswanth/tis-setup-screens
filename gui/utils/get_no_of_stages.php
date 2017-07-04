<?php
include 'dblinker.php';

function get_no_of_stages(){
try {
	$signal_scn = $_POST['signal_scn'];

	$link = linkToTIS();
    $handle=$link->prepare("SELECT utmc_traffic_signal_plans_stages.StageID, utmc_traffic_signal_plans_stages.SignalID	FROM `utmc_traffic_signal_plans_stages`	INNER JOIN `utmc_traffic_signal_static` ON (utmc_traffic_signal_static.SignalID = utmc_traffic_signal_plans_stages.SignalID AND utmc_traffic_signal_static.SCN = :signal_scn )");
    $handle->bindParam(':signal_scn', $signal_scn);
    $handle->execute();
    $result	= $handle->fetchall(PDO::FETCH_ASSOC);
	
	return json_encode(count($result));
}

catch(Exception $e){
        return "F";
    }
}
echo get_no_of_stages();
?>