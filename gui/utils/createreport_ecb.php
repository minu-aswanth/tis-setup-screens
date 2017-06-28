<?php
	include 'dblinker_ecb.php';

  $startDate = $_POST['formatted_startDate'];
  $endDate = $_POST['formatted_endDate'];
  $callType = $_POST['callType'];
  $dialNumber = $_POST['dialNumber'];
  $callerID = $_POST['callerID'];
  $device = $_POST['device'];
  $callStatus = $_POST['callStatus'];
  $tktSubject = $_POST['tktSubject'];
  $tktStatus = $_POST['tktStatus'];

  $query = "SELECT A.call_id, A.start_time,A.end_time,A.callerid,C.mst_chainage,A.calltype,A.dial_number,A.call_status,A.operator_talk_time AS Call_duration,A.call_recording,B.tkt_subject,B.tkt_status,B.tkt_reason,B.tkt_closed_date from ecb_call_record A LEFT JOIN ecb_ticket B on A.ticket_reference_no = B.tkt_reference_no JOIN ecb_master C ON A.callerid=C.mst_phone_number WHERE A.start_time > '$startDate' AND A.end_time < '$endDate' ";

  if($callType != null){
    $query=$query."AND A.calltype = '$callType' ";
  }
  if($dialNumber != null){
    $query=$query."AND A.dial_number = '$dialNumber' ";
  }
  if($callerID != null){
    $query=$query."AND A.callerid = '$callerID' ";
  }
  if($device != 'All'){
    $query=$query."AND C.mst_chainage = '$device' ";
  }
  if($callStatus != null){
    $query=$query."AND A.call_status = '$callStatus' ";
  }
  if($tktSubject != null){
    $query=$query."AND B.tkt_subject = '$tktSubject' ";
  }
  if($tktStatus != null){
    if($tktStatus === "unassigned"){
      $query=$query."AND B.tkt_status IS NULL ";  
    } else{
      $query=$query."AND B.tkt_status = '$tktStatus' ";
    }
  }
  $query=$query."ORDER BY A.call_id";

  $link = linkToTIS();
  $handle=$link->prepare($query);
  $handle->execute();
  $result=$handle->fetchall(PDO::FETCH_ASSOC);
  echo json_encode($result);

?>