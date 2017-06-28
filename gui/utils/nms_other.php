<?php
include 'dblinker.php';

function login(){
try {

	$link = linkToTIS();
	/*$handle=$link->prepare("SELECT COUNT(DISTINCT IPAddress) FROM nms_ip_fault");
	$handle->execute();
	if($handle->rowCount() > 1){
        return "";
    }
    $result=$handle->fetch(PDO::FETCH_ASSOC);
    $count = (int) $result['COUNT(DISTINCT IPAddress)'];

    $handle_2=$link->prepare("(SELECT DISTINCT(A.IPAddress) as `IPAddress`, B.Description1 as Description, A.online as online, A.LastUpdated as LastUpdated, B.RowID FROM nms_ip_fault A, nms_ip_address B WHERE A.IPAddress = B.IPAddress ORDER BY A.LastUpdated DESC LIMIT $count) ORDER BY RowID DESC"); 
    $handle_2->execute();
	$result_2=$handle_2->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result_2);*/
    /*$handle=$link->prepare("SELECT DISTINCT A.IPAddress, C.Description1 as Description, max(A.LastUpdated) as LastStatusChange, A.online, B.LastUpdated as LastUpdated, C.RowID from nms_ip_fault A, htms_services B, nms_ip_address C  WHERE B.Service = 'NMS' AND A.IPAddress = C.IPAddress GROUP BY IPAddress ORDER BY IPAddress DESC"); */
    $handle=$link->prepare("SELECT `IPAddress`, Description, `online`, `LastUpdated`, `LastStatusChange`, RowID FROM (SELECT DISTINCT A.`IPAddress`, C.Description1 as Description, A.`LastUpdated` as LastStatusChange, A.`online`, B.LastUpdated as LastUpdated, C.RowID  FROM `nms_ip_fault` A, htms_services B, nms_ip_address C WHERE B.Service = 'NMS' AND A.IPAddress = C.IPAddress ORDER BY `LastUpdated` DESC ) d GROUP BY d.`IPAddress` ORDER BY d.`IPAddress` DESC");
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
