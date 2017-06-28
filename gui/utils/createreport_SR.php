<?php
  include 'dblinker.php';

  $startDate = $_POST['formatted_startDate'];
  $endDate = $_POST['formatted_endDate'];
  $module = $_POST['deviceType'];
  $scn = $_POST['scn'];
  $creator = $_POST['creator'];
  $status = $_POST['status'];
  
  $query = "SELECT `sr_number`,`module`,`device`,`user_created`,`created_date`,`status`,`user_closed`,`closed_date`,`subject`,`details`,`Observation`,`Action` FROM `tis_maintenance_sr` WHERE created_date > '$startDate' AND created_date < '$endDate' ";

  if($module != "all"){
    $query=$query."AND module = '$module' ";
  }
  if($scn != "All" && strlen($scn) != 0){
    $query=$query."AND device = '$scn' ";
  }
  if($creator != "all"){
    if($creator == "automatic"){
      $query=$query."AND user_created = 'System' ";  
    } else{
      $query=$query."AND user_created != 'System' ";   
    }
  }
  if($status != 'all'){
    $query=$query."AND status = '$status' ";
  }
  
  $query=$query."ORDER BY sr_number";

  $link = linkToTIS();
  $handle=$link->prepare($query);
  $handle->execute();
  $result=$handle->fetchall(PDO::FETCH_ASSOC);
  echo json_encode($result);

?>