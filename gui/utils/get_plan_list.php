<?php

include 'dblinker.php';

function get_plan_list(){
	try {
		$group_scn = $_POST['group_scn'];
		$link = linkToTIS();
	    $handle=$link->prepare("SELECT * FROM `plans` WHERE `Group_SCN` = :group_scn"); 
	    $handle->bindParam(':group_scn', $group_scn);
	    $handle->execute();

	    $plan_list= $handle->dfetchall(PDO::FETCH_ASSOC);
	    
	    return json_encode($plan_list);
	}
	catch(Exception $e){
        return "F";
    }
}
echo get_plan_list();
?>