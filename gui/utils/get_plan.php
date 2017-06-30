<?php
include 'dblinker.php';

function get_plan(){
try {
	$plan_scn = $_POST['plan_scn'];
	$link = linkToTIS();
    $handle=$link->prepare("SELECT  * FROM  `plans` WHERE `PlanSCN` = :plan_scn "); 
    $handle->bindParam(':plan_scn', $plan_scn);
    $handle->execute();
    $plan_result = $handle->fetch(PDO::FETCH_ASSOC);

    $handle2=$link->prepare("SELECT  * FROM  `signal_timings` WHERE `Plan_SCN` = :plan_scn "); 
    $handle2->bindParam(':plan_scn', $plan_scn);
    $handle2->execute();
    $signal_timings_result = $handle2->fetchall(PDO::FETCH_ASSOC);

    $handle3=$link->prepare("SELECT  * FROM  `offsets` WHERE `Plan_SCN` = :plan_scn "); 
    $handle3->bindParam(':plan_scn', $plan_scn);
    $handle3->execute();
    $offset_result = $handle3->fetchall(PDO::FETCH_ASSOC);

    $result = array('plan_scn'=>$plan_result["PlanSCN"],'cycle_time'=>$plan_result["CycleTime"],'signals'=>$signal_timings_result,'offsets'=>$offset_result);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo get_plan();
?>