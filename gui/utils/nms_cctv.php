<?php
include 'dblinker.php';

function login(){
try {

	$link = linkToTIS();
	/*$handle=$link->prepare("SELECT COUNT(DISTINCT SystemCodeNumber) FROM tis_cctv_fault");
	$handle->execute();
	if($handle->rowCount() > 1){
        return "";
    }
    $result=$handle->fetch(PDO::FETCH_ASSOC);
    $count = (int) $result['COUNT(DISTINCT SystemCodeNumber)'];

    $handle_2=$link->prepare("(SELECT DISTINCT(SystemCodeNumber),online,LastUpdated FROM tis_cctv_fault ORDER BY LastUpdated DESC LIMIT $count) ORDER BY SystemCodeNumber DESC"); 
    $handle_2->execute();
	$result_2=$handle_2->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result_2);*/
    /*$handle=$link->prepare("SELECT DISTINCT A.SystemCodeNumber, max(A.LastUpdated) as LastStatusChange, A.online, B.LastUpdated as LastUpdated from tis_cctv_fault A, htms_services B  WHERE B.Service = 'NMS' GROUP BY SystemCodeNumber ORDER BY SystemCodeNumber DESC"); */
    $handle=$link->prepare("SELECT d.`SystemCodeNumber`, d.`online`, d.`LastUpdated`, MAX(d.`LastStatusChange`) AS LastStatusChange FROM (SELECT DISTINCT A.`SystemCodeNumber`, A.`LastUpdated` as LastStatusChange, A.`online`, B.LastUpdated as LastUpdated  FROM `tis_cctv_fault` A, htms_services B WHERE B.Service = 'NMS' ORDER BY A.`LastUpdated` DESC ) d GROUP BY d.`SystemCodeNumber` ORDER BY d.`SystemCodeNumber` ASC");
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
