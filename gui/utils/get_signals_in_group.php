<?php
include 'dblinker.php';

function get_signal_scns(){
try {
	$group_scn = $_POST['group_scn'];
	$link = linkToTIS();
    $handle=$link->prepare("SELECT  `SignalID` ,  `SCN` ,  `ShortDescription` FROM  `utmc_traffic_signal_static` WHERE `Group_SCN` = :group_scn "); 
    $handle->bindParam(':group_scn', $group_scn);
    $handle->execute();
    $result = array();
    while ($row = $handle->fetch(PDO::FETCH_ASSOC)){
    	$handle2=$link->prepare("SELECT * FROM `utmc_traffic_signal_plans_stages` WHERE `SignalID` = :signalid"); 
		$handle2->bindParam(':signalid', $row["SignalID"]);
		$handle2->execute();
		$count = $handle2->fetchall(PDO::FETCH_ASSOC);
		$result_row = ['SignalID'=>$row["SignalID"],'SCN'=>$row["SCN"],'ShortDescription'=>$row["ShortDescription"],'StagesNumber'=>count($count)];
		array_push($result, $result_row);
    }
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo get_signal_scns();
?>