<?php
include 'dblinker.php';

function add_vms_device(){
try {
	$user = $_POST["user"];
	$link = linkToTIS();
	
	$handle=$link->prepare("DELETE FROM `tis_meteorological_auto_rep` WHERE `user` = '$user'");
	$handle->execute();

	return "success";
}

catch(Exception $e){
        return $e;
    }
}
echo add_vms_device();
?>