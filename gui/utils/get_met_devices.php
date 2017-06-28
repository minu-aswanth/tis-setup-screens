<?php
include 'dblinker.php';

function get_vms(){
try {

	$link = linkToTIS();
    $handle=$link->prepare("SELECT SystemCodeNumber,DummyId FROM utmc_meteorological_static"); 
    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo get_vms();
?>
