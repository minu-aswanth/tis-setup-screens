<?php
include 'dblinker.php';

function get_msgs(){
try {
	$link = linkToTIS();
    $handle=$link->prepare("SELECT * FROM  `groups`"); 
    // $handle=$link->prepare("SELECT * FROM  `utmc_traffic_signal_groups`"); 
    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo get_msgs();
?>