<?php
include 'dblinker.php';

function login(){
try {

    $link = linkToTIS();
    $handle=$link->prepare("SELECT `SystemCodeNumber`, `LastUpdated`, `online`, Northing, Easting FROM (SELECT DISTINCT A.`SystemCodeNumber`, A.`LastUpdated`, A.`online`, B.Northing, B.Easting  FROM `tis_meteorological_fault` A, utmc_meteorological_static B WHERE A.SystemCodeNumber=B.SystemCodeNumber ORDER BY `LastUpdated` DESC ) d GROUP BY d.`SystemCodeNumber`");
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