<?php
include 'dblinker.php';

function login(){
try {

	$link = linkToTIS();
	$handle=$link->prepare("SELECT DISTINCT (SystemCodeNumber) FROM tis_meteorological_fault order by SystemCodeNumber");
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
