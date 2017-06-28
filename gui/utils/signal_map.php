<?php
include 'dblinker.php';

function login(){
try {

    $link = linkToTIS();
    $handle=$link->prepare("SELECT `SystemCodeNumber`, `LastUpdated`, `online`, Latitude, Longitude , GroupID , NumLinks , SignalID FROM (SELECT DISTINCT A.`SystemCodeNumber`, A.`LastUpdated`, A.`online`, B.Latitude, B.Longitude, B.GroupID, B.NumLinks, B.SignalID FROM `tis_traffic_signal_fault` A, utmc_traffic_signal_static B WHERE A.SystemCodeNumber=B.SCN ORDER BY `LastUpdated` DESC ) d GROUP BY d.`SystemCodeNumber`");
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