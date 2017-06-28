<?php
include 'dblinker.php';

function get_users(){
try {
	$link = linkToTIS();
    $handle=$link->prepare("SELECT * FROM `tis_detector_auto_rep`"); 
    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
	}
catch(Exception $e){
        return 'F';
    }
}
echo get_users();
?>
