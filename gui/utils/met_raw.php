<?php
include 'dblinker.php';

function login(){
try {

	$link = linkToTIS();
    $handle=$link->prepare("SELECT BattV_Avg, PTemp_C_Avg, AirTC_Avg, RH, WS_ms_Avg, WindDir, Visibility,TimeStamp FROM `tis_meteorological_dynamic_dump` ORDER BY TimeStamp DESC LIMIT 1"); 
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
