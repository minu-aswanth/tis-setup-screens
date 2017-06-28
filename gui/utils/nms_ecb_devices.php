<?php
include 'dblinker_ecb.php';

function login(){
try {

	$link = linkToTIS();
	$handle=$link->prepare("SELECT distinct `mst_chainage` FROM `ecb_master`");
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
