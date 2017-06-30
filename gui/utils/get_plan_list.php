<?php

include 'dblinker.php';

function get_plan_list(){
	try {
		$link = linkToTIS();
	    $handle=$link->prepare("SELECT * FROM plans"); 
	    $handle->execute();

	    $plan_list= $handle->fetchall(PDO::FETCH_ASSOC);
	    
	    return json_encode($plan_list);
	}
	catch(Exception $e){
        return "F";
    }
}
echo get_plan_list();
?>