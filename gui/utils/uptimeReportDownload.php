<?php
  include 'dblinker.php';

  $startDate = $_POST['formatted_startDate'];
  $endDate = $_POST['formatted_endDate'];
  $module = $_POST['deviceType'];
  $scn = $_POST['scn'];
  
  $query = "SELECT `SystemCodeNumber`, COUNT(IF(FaultText = 'Device Online', 1, NULL)) as OnlineCount, COUNT(IF(FaultText = 'Device Offline', 1, NULL)) as OfflineCount, COUNT(IF(FaultText IN ('Device Online','Device Offline'), 1, NULL)) as TotalCount FROM tis_".$module."_fault WHERE LastUpdated > '$startDate' AND LastUpdated < '$endDate' ";

  if($scn != "All" && strlen($scn) != 0){
    $query=$query."AND SystemCodeNumber = '$scn' ";
  }

  $query=$query."GROUP BY `SystemCodeNumber`";

  $onlinePercent = array();
  $offlinePercent = array();
  $onlineTime = array();
  $offlineTime = array();
  $devices = array();

  array_push($onlinePercent, "Online %");
  array_push($offlinePercent, "Offline %");
  array_push($onlineTime, "Online Time (min)");
  array_push($offlineTime, "Offline Time(min)");
  array_push($devices, "Device");

  $factor = (strtotime($endDate)-strtotime($startDate)+1)/60;

  $link = linkToTIS();
  $handle=$link->prepare($query);
  $handle->execute();
  $result=$handle->fetchall(PDO::FETCH_ASSOC);

  $count = 0;
  $onlineTotal = 0;
  $offlineTotal = 0;

  foreach ($result as $key => $value) {
    array_push($devices, $value['SystemCodeNumber']);

    array_push($onlinePercent,round($value['OnlineCount']*100/$value['TotalCount'],2));
    array_push($offlinePercent,round($value['OfflineCount']*100/$value['TotalCount'],2));

    array_push($onlineTime, round($value['OnlineCount']*$factor/$value['TotalCount']));
    array_push($offlineTime, round($value['OfflineCount']*$factor/$value['TotalCount']));

    $onlineTotal = $onlineTotal + round($value['OnlineCount']*$factor/$value['TotalCount']);
    $offlineTotal = $offlineTotal + round($value['OfflineCount']*$factor/$value['TotalCount']);

    $count=$count+1;

  }

  if($scn == "All"){
    $onlineTotalPercent = round($onlineTotal*100/($onlineTotal+$offlineTotal),2);
    $offlineTotalPercent = round($offlineTotal*100/($onlineTotal+$offlineTotal),2);

    array_push($devices,"All Devices");
    array_push($onlinePercent,$onlineTotalPercent);
    array_push($offlinePercent,$offlineTotalPercent);
    array_push($onlineTime,$onlineTotal);
    array_push($offlineTime, $offlineTotal);
  }
  
  $transposed = array_map(NULL, $devices,$onlineTime,$onlinePercent,$offlineTime,$offlinePercent);

  echo json_encode($transposed);

?>