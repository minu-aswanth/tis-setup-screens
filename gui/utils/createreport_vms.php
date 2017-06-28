<?php
  include 'dblinker.php';
	
  $from = $_REQUEST['fromDate'];
  $to = $_REQUEST['toDate'];
  $status = $_REQUEST['status'];
  $scn = $_REQUEST['scn'];
  $slide = $_REQUEST['slide'];
  $createdBy = $_REQUEST['createdBy'];
  $username = $_REQUEST['username'];
  
  $query = "SELECT A.*, B.MessageText FROM `utmc_vms_message_list_support_static` A, utmc_vms_messages_support_static B WHERE A.MessageID = B.MessageID ";
      
    if($from != null){
      $query=$query."AND A.CreationTime > '$from' ";
    }
    if($to != null){
      $query=$query."AND A.CreationTime < '$to' ";
    }
    if($status != 'All'){
      $query=$query."AND A.active = '$status' ";
    }
    if($scn != 'All'){
      $query=$query."AND A.SystemCodeNumber = '$scn' ";
    }
    if($slide != 'All'){
      $query=$query."AND A.slide = '$slide' ";
    }
    if($createdBy != 'All'){
      if($createdBy === 'manual'){
        $query=$query."AND A.creationUser = '$username' ";  
      } else{
        $query=$query."AND A.creationUser = 'ruleEngine' ";  
      }  
    }

    $query=$query."ORDER BY A.active, A.CreationTime";  

    //echo $query;

    $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    $result=$handle->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($result);
  
?>