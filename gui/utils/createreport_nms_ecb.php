<?php
  include 'dblinker.php';
	
  $from = $_REQUEST['fromDate'];
  $to = $_REQUEST['toDate'];
  $device = $_REQUEST['device'];
  $status = $_REQUEST['status'];
  //$timerange = $_REQUEST['timerange'];
  
  	$query = "SELECT SystemCodeNumber as SCN, LastUpdated as Last_Updated,online
    FROM tis_ecb_fault WHERE LastUpdated >= '$from' AND LastUpdated <= '$to'" ;

    if($status != "all"){
      $status = "Device ".$status;
      $query = $query." AND FaultText='$status'";
    }
    if($device != 'All'){
      $query = $query." AND SystemCodeNumber='$device'";
    }

    $query = $query." ORDER BY LastUpdated";
	
	$link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    $result=$handle->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($result);
?>