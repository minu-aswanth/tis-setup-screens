<?php
include 'dblinker.php';

function login(){
try {
	$signal_id = $_POST['signal_id'];
	$time = "'".$_POST['current_time']."'";
	$group_id = $_POST['groupid'];
	// echo $signal_id;
	//echo $times;
	// echo "\n",$group_id;
    $link = linkToTIS();
    
    // $handle=$link->prepare("SELECT `SystemCodeNumber`, `LastUpdated`, `online`, Northing, Easting FROM (SELECT DISTINCT A.`SystemCodeNumber`, A.`LastUpdated`, A.`online`, B.Northing, B.Easting  FROM `tis_detector_fault` A, utmc_detector_static B WHERE A.SystemCodeNumber=B.SystemCodeNumber ORDER BY `LastUpdated` DESC ) d GROUP BY d.`SystemCodeNumber`");

    $handle=$link->prepare("SELECT `stage`.`StageOrder`,`stage`.`Time`,`stage`.`VehicleMovements`,`plan`.`PlanID`,`plan`.`StartTime`,(SELECT GROUP_CONCAT( LinkName SEPARATOR  ';' ) FROM  `utmc_traffic_signal_static_links` WHERE  `SignalID` = $signal_id) AS `LinkNames` FROM `utmc_traffic_signal_plans_stages` AS `stage` INNER JOIN `utmc_traffic_signal_groups_plans` AS `plan` ON `plan`.`PlanID` = `stage`.`PlanID`WHERE $time BETWEEN `plan`.`StartTime` AND `plan`.`EndTime` AND `plan`.`GroupID` = $group_id AND `stage`.`SignalID` = $signal_id");
    //var_dump($handle);
    $handle->execute();
    
    $result=$handle->fetchall(PDO::FETCH_ASSOC);
    return json_encode($result);
    
}

catch(Exception $e){
        return "F";
    }
}
echo login();
?>

