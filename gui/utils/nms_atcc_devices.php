<?php
include 'dblinker.php';

function login(){
try {

	$link = linkToTIS();
	$handle=$link->prepare("SELECT DISTINCT (SystemCodeNumber) FROM tis_detector_fault order by SystemCodeNumber");
	$handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}

/* Update Crontab timings for pingHTMLS
$val;

exec("php /var/www/html/htms/background/nms/nms.php ".$val);*/

echo login();
?>
