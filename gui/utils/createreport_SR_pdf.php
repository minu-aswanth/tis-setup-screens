<?php
  ob_start();
  include 'dblinker.php';
  include './tcpdf/tcpdf.php';

  $from = $_REQUEST['fromDate'];
  $to = $_REQUEST['toDate'];
  $username = $_REQUEST['username'];
  $module = $_REQUEST['deviceType'];
  $scn = $_REQUEST['scn'];
  $creator = $_REQUEST['creator'];
  $status = $_REQUEST['status'];
  
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
  $pdf->SetTitle('Service Request Report');
  $pdf->SetSubject('Report');
  $pdf->SetKeywords('PDF');
  $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, "Service Request Report", $string);
  
  $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
  
  $pdf->SetMargins(5,20,5,true);
  
  $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
  
  $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
  
  $pdf->setFontSubsetting(true);
  
  $pdf->SetFont('dejavusans', '', 8, '', true);

  $pdf->AddPage('L');
    
  $tbl_header = '<h1 align = "center">Service Request Summary </h1>  <table border="1" align = "center">';
  $tbl_footer = '</table>';
  $tbl ='<tr><td><b>'."SR Number".'</b></td><td><b>'."Module".'</b></td><td><b>'."Device".'</b></td><td><b>'."Created_By".'</b></td><td><b>'."Created On".'</b></td><td><b>'."Status".'</b></td><td><b>'."Closed By".'</b></td><td><b>'."Closed On".'</b></td><td><b>'."Subject".'</b></td><td><b>'."Details".'</b></td><td><b>'."Observation".'</b></td><td><b>'."Action".'</b></td></tr>';
    
  $query = "SELECT `sr_number`,`module`,`device`,`user_created`,`created_date`,`status`,`user_closed`,`closed_date`,`subject`,`details`,`Observation`,`Action` FROM `tis_maintenance_sr` WHERE created_date > '$from' AND created_date < '$to' ";

  if($module != "All"){
    $query=$query."AND module = '$module' ";
  }
  if($scn != "All"){
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
    while($row = $handle->fetch()){
      $sr_number = $row['sr_number'];
      $module = $row['module'];
      $device = $row['device'];
      $user_created = $row['user_created'];
      $created_date = $row['created_date'];
      $status = $row['status'];
      $user_closed = $row['user_closed'];
      $closed_date = $row['closed_date'];
      $subject = $row['subject'];
      $details = $row['details'];
      $Observation = $row['Observation'];
      $Action = $row['Action'];
      
      $tbl .= '<tr nobr = "true"><td>'.$sr_number.'</td><td>'.$module.'</td><td>'.$device.'</td><td>'.$user_created.'</td><td>'.$created_date.'</td><td>'.$status.'</td><td>'.$user_closed.'</td><td>'.$closed_date.'</td><td>'.$subject.'</td><td>'.$details.'</td><td>'.$Observation.'</td><td>'.$Action.'</td></tr>';
    }
    $pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, true, false, '');
    //$pdf -> writeHTML($query);

  

  ob_get_contents();
  ob_end_clean();
  $pdf->Output('htms_sr_report.pdf', 'I');

?>