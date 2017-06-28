<?php
  include 'dblinker.php';

  $startDate = $_POST['formatted_startDate'];
  $endDate = $_POST['formatted_endDate'];
  $module = $_POST['deviceType'];
  $scn = $_POST['scn'];

  if($module == "other"){
    $query = "SELECT `IPAddress` FROM nms_ip_address order by `IPAddress`";
  } else {
    $query = "SELECT `SystemCodeNumber` FROM utmc_".$module."_static order by `SystemCodeNumber` $order";  
  }
  

  $link = linkToTIS();
  $handle=$link->prepare($query);
  $handle->execute();
  $result=$handle->fetchall(PDO::FETCH_ASSOC);
  echo json_encode($result);

?>