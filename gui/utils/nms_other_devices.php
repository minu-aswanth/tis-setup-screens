<?php
include 'dblinker.php';

function login(){
try {

	$link = linkToTIS();
	$handle=$link->prepare("SELECT DISTINCT (IPAddress) FROM nms_ip_fault order by IPAddress");
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
