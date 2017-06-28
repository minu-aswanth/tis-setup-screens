<?php
include 'dblinker.php';

function get_signal_scns(){
try {

	$link = linkToTIS();
    $handle=$link->prepare("SELECT  `SignalID` ,  `SCN` ,  `NumLinks` FROM  `utmc_traffic_signal_static` WHERE 1 "); 
    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo get_signal_scns();
?>