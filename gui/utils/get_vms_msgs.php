<?php
include 'dblinker.php';

function get_msgs(){
try {

	$link = linkToTIS();
    $handle=$link->prepare("SELECT `topLineText`,`midLineText`,`botLineText` FROM `utmc_vms_messages_support_static` Where active=1"); 
    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo get_msgs();
?>