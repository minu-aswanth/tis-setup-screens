<?php
include 'dblinker.php';

function get_group(){
try {
	$group_id = $_POST['group_id'];
	$link = linkToTIS();
    $handle=$link->prepare("SELECT `utmc_traffic_signal_groups_plans`.`StartTime`, `utmc_traffic_signal_groups_plans`.`EndTime` FROM `utmc_traffic_signal_groups` inner join `utmc_traffic_signal_groups_plans` on `utmc_traffic_signal_groups_plans`.`GroupID`=`utmc_traffic_signal_groups`.`GroupID` WHERE `utmc_traffic_signal_groups`.`GroupID`=$group_id"); 
    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo get_group();
?>