<?php
include 'dblinker.php';

function add_vms_device(){
try {
	$user = $_POST["user"];
	$frequency = $_POST["frequency"];
	$link = linkToTIS();
	
	$handle=$link->prepare("DELETE FROM `tis_meteorological_auto_rep` WHERE `user` = '$user'");
	$handle->execute();

	$handle1=$link->prepare("INSERT INTO `tis_meteorological_auto_rep`(`user`, `frequency`) VALUES ('$user','$frequency')");
	$handle1->execute();

	return "success";
}

catch(Exception $e){
        return $e;
    }
}
echo add_vms_device();
?>