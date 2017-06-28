<?php
include 'dblinker.php';

function login(){
try {

    $module = $_REQUEST['module'];
    $device = $_REQUEST['device'];
    $startDate = $_REQUEST['startDate'];

	$link = linkToTIS();

    if($module == "other"){
        $handle=$link->prepare("select IPAddress,`online` from nms_ip_fault WHERE LastUpdated < '$startDate' AND IPAddress = '$device'");
    }else{
        $handle=$link->prepare("select SystemCodeNumber,`online` from tis_".$module."_fault WHERE LastUpdated < '$startDate' AND SystemCodeNumber = '$device'");    
    }

	

    //echo("select `online` from tis_".$module."_fault WHERE LastUpdated < '$startDate' AND SystemCodeNumber = '$device'");

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
