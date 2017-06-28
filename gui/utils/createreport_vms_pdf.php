<?php
  ob_start();
  include 'dblinker.php';
  include './tcpdf/tcpdf.php';

  $from = $_REQUEST['fromDate'];
  $to = $_REQUEST['toDate'];
  $status = $_REQUEST['status'];
  $scn = $_REQUEST['scn'];
  $slide = $_REQUEST['slide'];
  $createdBy = $_REQUEST['createdBy'];
  $user = $_REQUEST['user'];
  $username = $_REQUEST['username'];

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
  $pdf->SetTitle('Variable Message Sign Report');
  $pdf->SetSubject('Report');
  $pdf->SetKeywords('PDF');
  $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, "Variable Message Sign Report", $string);
  
  $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
  
  $pdf->SetMargins(5,20,5,true);
  
  $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
  
  $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
  
  $pdf->setFontSubsetting(true);
  
  $pdf->SetFont('dejavusans', '', 8, '', true);

  $pdf->setCellHeightRatio(2.5);
  $pdf->Cell(30, 0, '1', 1, 1, 'C', 1, '', 0, false, 'T', 'C');
  $pdf->Ln(2);

  $pdf->AddPage('L');
      
    $tbl_header = '<h1 align = "center"><img src="../images/hcc.jpg" width ="280"></img><br><font size = "11">Variable Message Sign Summary</font> </h1>  <table border="1" align = "center">';
    $tbl_footer = '</table>';
    $tbl ='<tr><td><b>'.Status.'</b></td><td><b>'.SCN.'</b></td><td><b>'.Slide.'</b></td><td><b>'.Message_Text.'</b></td><td><b>'.Time.'</b></td><td><b>'.Created_by.'</b></td><td><b>'.Deleted_by.'</b></td><td><b>'.Created_On.'</b></td><td><b>'.Updated_On.'</b></td><td><b>'.Deleted_On.'</b></td></tr>';
    
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

    $query=$query."ORDER BY A.active DESC, A.CreationTime DESC";

    $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    while($row = $handle->fetch()){
        
      $ts = $row['active'];
      $rec = $row['SystemCodeNumber'];
      $rt = $row['slide'];
      $bat = $row['MessageText'];
      $at = $row['time'];
      $h = $row['creationUser'];
      $ws = $row['deletionUser'];
      $wd = $row['CreationTime'];
      $tt = $row['UpdationTime'];
      $sbt = $row['DeletionTime'];
      
      $tbl .= '<tr nobr = "true"><td>'.$ts.'</td><td>'.$rec.'</td><td>'.$rt.'</td><td>'.$bat.'</td><td>'.$at.'</td><td>'.$h.'</td><td>'.$ws.'</td><td>'.$wd.'</td><td>'.$tt.'</td><td>'.$sbt.'</td></tr>';
    }
    $pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, true, false, '');
  

  $pdf->AddPage('L');
  $tbl_header = '<h1 align = "center">Device Summary </h1> <table border="1" align = "center">';
  $tbl_footer = '</table>';
  $tbl ='<tr><td><b>'.SCN.'</b></td><td><b>'.Northing.'</b></td><td><b>'.Easting.'</b></td><td><b>'.Place.'</b></td></tr>';
  $query = "SELECT SystemCodeNumber, ROUND(Northing,6), ROUND(Easting,6), Place  FROM utmc_vms_static " ;
  $link = linkToTIS();
  $handle=$link->prepare($query);
  $handle->execute();
  while($row = $handle->fetch()){
    $scn = $row[0];
    $north = $row[1];
    $east = $row[2];
    $place = $row[3];
    $tbl .= '<tr><td>'.$scn.'</td><td>'.$north.'</td><td>'.$east.'</td><td>'.$place.'</td></tr>';
  }
  $pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, true, false, '');
  
  
  ob_get_contents();
  ob_end_clean();
  $pdf->Output('traffic_vms_report.pdf', 'I');

?>