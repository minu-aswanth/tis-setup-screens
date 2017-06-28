<?php
include 'dblinker.php';

function add_vms_device(){
try {
    
    $ip = $_POST['ip'];
	$desc1 = $_POST['desc1'];
	$desc2 = $_POST['desc2'];
	

	$link = linkToTIS();
	
	$handle=$link->prepare("INSERT INTO `nms_ip_address`(`IPAddress`, `Description1`, `Description2`) VALUES ('$ip','$desc1','$desc2')");
	$handle->execute();
	
	$handle2=$link->prepare("INSERT INTO `nms_ip_fault`(`IPAddress`, `LastUpdated`, `online`, `time`) VALUES ('$ip',now(),1,0)");
	$handle2->execute();
	
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo add_vms_device();
?>