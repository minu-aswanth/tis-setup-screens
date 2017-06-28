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
    //"SELECT SystemCodeNumber as SCN, LastUpdated as Last_Updated,online, `time`
    //FROM tis_vms_fault WHERE LastUpdated >= '$from' AND LastUpdated <= '$to'"

  	// $query = "SELECT SystemCodeNumber as SCN, LastUpdated as Last_Updated,online, `time`
   //  FROM tis_vms_fault WHERE LastUpdated >= '$from' AND LastUpdated <= '$to'" ;

if($fg == '1'){
  $query = "SELECT SystemCodeNumber as SCN, LastUpdated as Last_Updated,online, `time` FROM tis_vms_fault WHERE LastUpdated >= '$from' AND LastUpdated <= '$to'" ;

  if($status != "all"){
    $query = $query." AND online='$status'";
  }
  if($device != 'All'){
    $query = $query." AND SystemCodeNumber='$device'";
  }


  $query = $query." ORDER BY";

  if($parameter == "1"){
    $query = $query." SystemCodeNumber,";
  } 

  $query = $query." LastUpdated"." $order";

}
else{
   $query = "SELECT t2.SystemCodeNumber AS SCN,t1.online,t2.time,t2.LastUpdated AS Last_Updated_Last,t1.LastUpdated AS Last_Updated_Old FROM tis_vms_fault AS t2,tis_vms_fault AS t1 WHERE t1.SystemCodeNumber = t2.SystemCodeNumber AND TIMESTAMPDIFF(minute,t1.lastUpdated,t2.LastUpdated) = t2.time AND t1.LastUpdated >= '$from' AND t1.LastUpdated <= '$to'";

  if($status != "all"){
    $query = $query." AND t2.online='$status'";
  }
  if($device != 'All'){
    $query = $query." AND t2.SystemCodeNumber='$device'";
  }


  $query = $query." ORDER BY";

  if($parameter == "1"){
    $query = $query." t2.SystemCodeNumber,";
  } 

  $query = $query." t2.LastUpdated"." $order";
}
 

  // if($status != "all"){
  //   $query = $query." AND t2.online='$status'";
  // }
  // if($device != 'All'){
  //   $query = $query." AND t2.SystemCodeNumber='$device'";
  // }


  // $query = $query." ORDER BY";

  // if($parameter == "1"){
  //   $query = $query." t2.SystemCodeNumber,";
  // } 

  // $query = $query." t2.LastUpdated"." $order";
    
	$link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    $result=$handle->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($result);
?>
