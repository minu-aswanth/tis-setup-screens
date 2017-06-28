<?php
include 'dblinker.php';

function fetch_devices(){
try {

	$link = linkToTIS();
	
	$handle=$link->prepare("SELECT * FROM `nms_ip_address` order by `RowId` DESC");
	$handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);	
    
}

catch(Exception $e){
        return "F";
    }
}
echo fetch_devices();
?>
