<?php
include 'dblinker.php';

function get_accidents_types(){
	try {
		$link = linkToTIS();
	    $handle=$link->prepare("SELECT * FROM `tis_vehicle_setup`");
	    $handle->execute();
		$result=$handle->fetchall(PDO::FETCH_ASSOC);
		return json_encode($result);
	}
	catch(Exception $e){
        return "F";
    }
}
echo get_accidents_types();
?>