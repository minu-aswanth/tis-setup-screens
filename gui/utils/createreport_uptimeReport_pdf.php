<?php
  ob_start();
  include 'dblinker.php';
  include './tcpdf/tcpdf.php';

  $from = $_REQUEST['fromDate'];
  $to = $_REQUEST['toDate'];
  $username = $_REQUEST['username'];
  $module = $_REQUEST['deviceType'];
  $scn = $_REQUEST['scn'];
  
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
  $pdf->SetTitle('Uptime Report');
  $pdf->SetSubject('Report');
  $pdf->SetKeywords('PDF');
  $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, "Uptime Report", $string);
  
  $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
  
  $pdf->SetMargins(5,20,5,true);
  
  $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
  
  $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
  
  $pdf->setFontSubsetting(true);
  
  $pdf->SetFont('dejavusans', '', 8, '', true);

  $pdf->AddPage('L');
    
  $tbl_header = '<h1 align = "center">Uptime Report</h1>  <table border="1" align = "center">';
  $tbl_footer = '</table>';
  $tbl ='<tr><td><b>'."Device".'</b></td><td><b>'."Online Time (min)".'</b></td><td><b>'."Online %".'</b></td><td><b>'."Offline Time (min)".'</b></td><td><b>'."Offline %".'</b></td></tr>';
    
  $query = "SELECT `SystemCodeNumber`, COUNT(IF(FaultText = 'Device Online', 1, NULL)) as OnlineCount, COUNT(IF(FaultText = 'Device Offline', 1, NULL)) as OfflineCount, COUNT(IF(FaultText IN ('Device Online','Device Offline'), 1, NULL)) as TotalCount FROM tis_".$module."_fault WHERE LastUpdated > '$from' AND LastUpdated < '$to' ";

  if($scn != "All" && strlen($scn) != 0){
    $query=$query."AND SystemCodeNumber = '$scn' ";
  }

  $query=$query."GROUP BY `SystemCodeNumber`";

  $factor = (strtotime($to)-strtotime($from)+1)/60;
  $onlineTotal = 0;
  $offlineTotal = 0;

  $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    while($row = $handle->fetch()){
      $systemCodeNumber = $row['SystemCodeNumber'];
      $onlinePercent = round($row['OnlineCount']*100/$row['TotalCount'],2);
      $offlinePercent = round($row['OfflineCount']*100/$row['TotalCount'],2);
      $onlineTime = round($row['OnlineCount']*$factor/$row['TotalCount']);
      $offlineTime = round($row['OfflineCount']*$factor/$row['TotalCount']);

      $onlineTotal = $onlineTotal + $onlineTime;
      $offlineTotal = $offlineTotal + $offlineTime;

      $tbl .= '<tr nobr = "true"><td>'.$systemCodeNumber.'</td><td>'.$onlineTime.'</td><td>'.$onlinePercent.'</td><td>'.$offlineTime.'</td><td>'.$offlinePercent.'</td></tr>';
    }

    if($scn === "All"){
      $tbl .= '<tr nobr = "true"><td><b>All Devices</b></td><td><b>'.$onlineTotal.'</b></td><td><b>'.round($onlineTotal*100/($onlineTotal+$offlineTotal),2).'</b></td><td><b>'.$offlineTotal.'</b></td><td><b>'.round($offlineTotal*100/($onlineTotal+$offlineTotal),2).'</b></td></tr>';
    }

    $pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, true, false, '');
    //$pdf -> writeHTML($query);

  

  ob_get_contents();
  ob_end_clean();
  $pdf->Output('htms_uptime_report.pdf', 'I');

?>