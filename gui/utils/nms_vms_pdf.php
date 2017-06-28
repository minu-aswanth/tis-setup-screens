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
  $pdf->SetTitle('VMS Status Report');
  $pdf->SetSubject('Report');
  $pdf->SetKeywords('PDF');
  $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, "VMS Status Report" , $string);

  $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
  
  $pdf->SetMargins(5,20,5,true);
  
  $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
  
  $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
  
  $pdf->setFontSubsetting(true);
  
  $pdf->SetFont('dejavusans', '', 8, '', true);

  $pdf->setCellHeightRatio(2.5);
  $pdf->Cell(30, 0, '1', 1, 1, 'C', 1, '', 0, false, 'T', 'C');
  $pdf->Ln(2);
   
  if($status == "all") {
  
  $pdf->AddPage('L');
    
    $tbl_header = '<h1 align = "center"><img src="../images/hcc.jpg" width ="280"></img><br><font size = "11">VMS Status Summary</font><br>(From: '.$from.' To: '.$to.')</h1>  <table border="1" align = "center">';
    $tbl_footer = '</table>';
    $tbl ='<tr><td><b>IP Address</b></td><td><b>Last Updated</b></td><td><b>Device Status</b></td></tr>';
    $query= "SELECT SystemCodeNumber, LastUpdated as Last_Updated, FaultText AS Fault_Text FROM tis_vms_fault WHERE LastUpdated >= '$from' AND LastUpdated < '$to'" ;
    if($status != "all"){
      $status = "Device ".$status;
      $query = $query." AND FaultText='$status'";
    }
    if($device != 'All'){
       $query = $query." AND SystemCodeNumber='$device'";
    }

    $query = $query." ORDER BY LastUpdated";

   //$pdf->writeHTML($query, true, false, true, false, '');
  
  $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    while($row = $handle->fetch()){

      $a_b = $row['SystemCodeNumber'];                
      $a_rt = $row['Last_Updated'];
      $a_at = $row['Fault_Text'];
     
      $tbl .= '<tr nobr = "true"><td>'.$a_b.'</td><td>'.$a_rt.'</td><td>'.$a_at.'</td></tr>';
    }
    
 } 
  $pdf->writeHTML($tbl_header.$tbl.$tbl_footer, true, false, true, false, '');
  
  
  ob_get_contents();
  ob_end_clean();
  $pdf->Output('VMS_Status_report.pdf', 'I');

?>