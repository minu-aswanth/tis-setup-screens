<?php
  include 'dblinker.php';
	
  $from = $_REQUEST['fromDate'];
  $to = $_REQUEST['toDate'];
  $device = $_REQUEST['device'];
  $status = $_REQUEST['status'];
  //$timerange = $_REQUEST['timerange'];
  $parameter = $_REQUEST['parameter'];
  $order = $_REQUEST['orderby'];
  $fg = $_REQUEST['forgraph'];


if($fg == '1'){
   $query = "SELECT IPAddress, LastUpdated as Last_Updated,online, `time` FROM nms_ip_fault WHERE LastUpdated >= '$from' AND LastUpdated <= '$to'" ;

  if($status != "all"){
    $query = $query." AND online='$status'";
  }
  if($device != 'All'){
    $query = $query." AND IPAddress='$device'";
  }


  $query = $query." ORDER BY";

  if($parameter == "1"){
    $query = $query." IPAddress,";
  } 

  $query = $query." LastUpdated"." $order";

}
else{
   $query = "SELECT t2.IPAddress,t1.online,t2.time,t2.LastUpdated AS Last_Updated_Last,t1.LastUpdated AS Last_Updated_Old FROM nms_ip_fault AS t2,nms_ip_fault AS t1 WHERE t1.IPAddress = t2.IPAddress AND TIMESTAMPDIFF(minute,t1.lastUpdated,t2.LastUpdated) = t2.time AND t1.LastUpdated >= '$from' AND t1.LastUpdated <= '$to'";
  
    // $query = "SELECT IPAddress, LastUpdated as Last_Updated,online, `time`
   //  FROM nms_ip_fault WHERE LastUpdated >= '$from' AND LastUpdated <= '$to'" ;

    if($status != "all"){
      $query = $query." AND t2.online='$status'";
    }
    if($device != 'All'){
      $query = $query." AND t2.IPAddress='$device'";
    }

    $query = $query." ORDER BY";

    if($parameter == "1"){
      $query = $query." t2.IPAddress,";
    } 

    $query = $query." t2.LastUpdated"." $order";
}
 
	
	$link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    $result=$handle->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($result);
?>