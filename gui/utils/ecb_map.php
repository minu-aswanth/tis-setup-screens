<?php
include 'dblinker_ecb.php';

function login(){
try {

	$link = linkToTIS();
	$handle=$link->prepare("SELECT `mst_chainage`,`mst_latitude`,`mst_longitude`,`mst_online_offline`,`mst_onoff_updated_date` FROM `ecb_master`");
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
