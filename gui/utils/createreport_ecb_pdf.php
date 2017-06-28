<?php
  ob_start();
  include 'dblinker_ecb.php';
  include './tcpdf/tcpdf.php';

  $from = $_REQUEST['fromDate'];
  $to = $_REQUEST['toDate'];
  $username = $_REQUEST['username'];
  $callType = $_REQUEST['callType'];
  $dialNumber = $_REQUEST['dialNumber'];
  $callerID = $_REQUEST['callerID'];
  $device = $_REQUEST['device'];
  $callStatus = $_REQUEST['callStatus'];
  $tktSubject = $_REQUEST['tktSubject'];
  $tktStatus = $_REQUEST['tktStatus'];

  date_default_timezone_set("Asia/Kolkata");
  $time = date("d/m/Y h:i:sa");

  $string = 'Downloaded by '.$username.' on '.$time;
  
  $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
  
  $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
  $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
  
  $pdf->SetHeaderMargin("4");
  $pdf->SetFooterMargin("10");

  $pdf->SetCreator(PDF_CREATOR);
  $pdf->SetAuthor('ITSPE');
  $pdf->SetTitle('Emergency Call Box Report');
  $pdf->SetSubject('Report');
  $pdf->SetKeywords('PDF');
  $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, "Emergency Call Box Report", $string);
  
  $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
  
  $pdf->SetMargins(5,20,5,true);
  
  $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
  
  $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
  
  $pdf->setFontSubsetting(true);
  
  $pdf->SetFont('dejavusans', '', 8, '', true);

  $pdf->AddPage('L');
    
  $tbl_header = '<h1 align = "center">Emergency Call Box Summary </h1>  <table border="1" align = "center">';
  $tbl_footer = '</table>';
  $tbl ='<tr><td><b>'."Call ID".'</b></td><td><b>'."Start Time".'</b></td><td><b>'."End Time".'</b></td><td><b>'."Caller ID".'</b></td><td><b>'."Call Type".'</b></td><td><b>'."Dial Number".'</b></td><td><b>'."ECB Device".'</b></td><td><b>'."Call Status".'</b></td><td><b>'."Call Duration".'</b></td><td><b>'."Ticket Subject".'</b></td><td><b>'."Ticket Status".'</b></td><td><b>'."Ticket Reason".'</b></td><td><b>'."Ticket Closed Date".'</b></td></tr>';
    
  $query = "SELECT A.call_id, A.start_time,A.end_time,A.callerid,C.mst_chainage,A.calltype,A.dial_number,A.call_status,A.operator_talk_time AS Call_duration,A.call_recording,B.tkt_subject,B.tkt_status,B.tkt_reason,B.tkt_closed_date from ecb_call_record A LEFT JOIN ecb_ticket B on A.ticket_reference_no = B.tkt_reference_no JOIN ecb_master C ON A.callerid=C.mst_phone_number WHERE A.start_time > '$from' AND A.end_time < '$to' ";

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
    while($row = $handle->fetch()){
      $call_id = $row['call_id'];
      $start_time = $row['start_time'];
      $end_time = $row['end_time'];
      $callerid = $row['callerid'];
      $callType = $row['calltype'];
      $dial_number = $row['dial_number'];
      $device = $row['mst_chainage'];
      $call_status = $row['call_status'];
      $Call_duration = $row['Call_duration'];
      $tkt_subject = $row['tkt_subject'];
      $tkt_status = $row['tkt_status'];
      $tkt_reason = $row['tkt_reason'];
      $tkt_closed_date = $row['tkt_closed_date'];
      
      $tbl .= '<tr nobr = "true"><td>'.$call_id.'</td><td>'.$start_time.'</td><td>'.$end_time.'</td><td>'.$callerid.'</td><td>'.$callType.'</td><td>'.$dial_number.'</td><td>'.$device.'</td><td>'.$call_status.'</td><td>'.$Call_duration.'</td><td>'.$tkt_subject.'</td><td>'.$tkt_status.'</td><td>'.$tkt_reason.'</td><td>'.$tkt_closed_date.'</td></tr>';
    }
    $pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, true, false, '');
    //$pdf -> writeHTML($query);

  

  ob_get_contents();
  ob_end_clean();
  $pdf->Output('htms_ecb_report.pdf', 'I');

?>