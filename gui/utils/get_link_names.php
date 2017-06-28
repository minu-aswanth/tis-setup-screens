<?php
include 'dblinker.php';

function get_link_names(){
try {
	$signal_id = $_POST['signal_id'];
	$link = linkToTIS();
    $handle=$link->prepare("SELECT `LinkName` FROM `utmc_traffic_signal_static_links` WHERE  `SignalID` = '$signal_id' ORDER BY `LinkOrder` ASC "); 
    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo get_link_names();
?>