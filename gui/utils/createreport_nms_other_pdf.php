<?php
  ob_start();
  include 'dblinker.php';
  include './tcpdf/tcpdf.php';
 
  $from = $_REQUEST['fromDate'];
  $to = $_REQUEST['toDate'];
  $uf_from =  $_REQUEST['uf_fromDate'];
  $uf_to =  $_REQUEST['uf_toDate'];
  $username = $_REQUEST['username'];
  $device = $_REQUEST['device'];
  $status = $_REQUEST['status'];
  $order = $_REQUEST['orderby'];

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
  $pdf->SetTitle('NMS Status Report');
  $pdf->SetSubject('Report');
  $pdf->SetKeywords('PDF');
  $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, "NMS Status Report" , $string);

  $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
  
  $pdf->SetMargins(5,20,5,true);
  
  $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
  
  $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
  
  $pdf->setFontSubsetting(true);
  
  $pdf->SetFont('dejavusans', '', 8, '', true);

  $pdf->setCellHeightRatio(2.5);
  $pdf->Cell(30, 0, '1', 1, 1, 'C', 1, '', 0, false, 'T', 'C');
  $pdf->Ln(2);
   
  //if($status == "all") {
  
  $pdf->AddPage('L');
    
    $tbl_header = '<h1 align = "center"><img src="../images/hcc.jpg" width ="280"></img><br><font size = "11">IP Addresses Status Summary</font><br>(From: '.$from.' To: '.$to.')</h1>  <table border="1" align = "center">';
    $tbl_footer = '</table>';
    $tbl ='<tr><td><b>IPAddress</b></td><td><b>Status Start Time</b></td><td><b>Status End Time</b></td><td><b>IsOnline</b></td></tr>';
    $query= "SELECT t2.IPAddress AS IPAddress,t1.online AS IsOnline,t2.time,t2.LastUpdated AS Last_Updated_Last,t1.LastUpdated AS Last_Updated_Old FROM nms_ip_fault AS t2,nms_ip_fault AS t1 WHERE t1.IPAddress = t2.IPAddress AND TIMESTAMPDIFF(minute,t1.lastUpdated,t2.LastUpdated) = t2.time AND t1.LastUpdated >= '$from' AND t1.LastUpdated <= '$to'" ;
   
     if($status != "all"){
      $query = $query." AND t2.online='$status'";
    }
    if($device != 'All'){
      $query = $query." AND t2.IPAddress='$device'";
    }

    if($order == 'ASC')
      $order = 'DESC';
    else
      $order = 'ASC';

    $query = $query." ORDER BY t2.LastUpdated"." $order";

   //$pdf->writeHTML($query, true, false, true, false, '');
  
  $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    while($row = $handle->fetch()){

      $a_b = $row['IPAddress'];                
      $a_rt = $row['Last_Updated_Last'];
      $a_lt = $row['Last_Updated_Old'];
      $a_at = $row['IsOnline'];
     
      $tbl .= '<tr nobr = "true"><td>'.$a_b.'</td><td>'.$a_lt.'</td><td>'.$a_rt.'</td></tr>';
    }
    
 //} 
  $pdf->writeHTML($tbl_header.$tbl.$tbl_footer, true, false, true, false, '');
  
  
  ob_get_contents();
  ob_end_clean();
  $pdf->Output('NMS_Status_report.pdf', 'I');

?>