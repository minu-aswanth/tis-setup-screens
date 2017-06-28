<?php
include 'dblinker.php';

function get_signal_scns(){
try {
	$group_scn = $_POST['group_scn'];
	$link = linkToTIS();
    $handle=$link->prepare("SELECT  `SignalID` ,  `SCN` ,  `ShortDescription` FROM  `utmc_traffic_signal_static` WHERE `Group_SCN` = :group_scn "); 
    $handle->bindParam(':group_scn', $group_scn);
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