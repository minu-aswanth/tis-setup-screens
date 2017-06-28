<?php
  ob_start();
  include 'dblinker.php';
  include './tcpdf/tcpdf.php';

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
  $pdf->SetTitle('Open Service Request Report');
  $pdf->SetSubject('Report');
  $pdf->SetKeywords('PDF');
  $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, "Open Service Request Report", $string);
  
  $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
  
  $pdf->SetMargins(5,20,5,true);
  
  $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
  
  $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
  
  $pdf->setFontSubsetting(true);
  
  $pdf->SetFont('dejavusans', '', 8, '', true);

  $pdf->AddPage('L');  
  $tbl_header = '<h1 align = "center"><img src="../images/hcc.jpg" width ="280"></img><br><font size = "11">Open Service Request Summary</font></h1>  <table border="1" align = "center">';
  $tbl_footer = '</table>';
  $tbl ='<tr><td><b>'."SR Number".'</b></td><td><b>'."Module".'</b></td><td><b>'."Device".'</b></td><td><b>'."Subject".'</b></td><td><b>'."SR Status".'</b></td><td><b>'."Created By".'</b></td><td><b>'."Created On".'</b></td><td><b>'."Device Status".'</b></td><td><b>'."Last Checked".'</b></td></tr>';
    
  $query = "SELECT B.modules FROM roles B, mapping_user C, user_login D where D.user='$username' and D.id=C.user_id and C.role_id=B.id";

  $link = linkToTIS();
  $handle=$link->prepare($query);
  $handle->execute();
  while($row = $handle->fetch()){

    $moduleUser = $row['modules'];

    if((strcmp(trim($moduleUser),"CCTV") === 0) or (strcmp(trim($moduleUser),"Admin") === 0) or (strcmp(trim($moduleUser),"Maintenance") === 0)){

        $handleCCTV=$link->prepare("SELECT A.`sr_number`,E.SystemCodeNumber,A.`module`,A.`subject`,A.`created_date`,A.`status`,A.`user_created`,E.online,E.LastUpdated FROM `tis_maintenance_sr` A , tis_cctv_fault E JOIN (select SystemCodeNumber, MAX(LastUpdated) as LastUpdated from tis_cctv_fault GROUP BY SystemCodeNumber) t2 ON E.LastUpdated = t2.LastUpdated and E.SystemCodeNumber=t2.SystemCodeNumber WHERE A.module='CCTV' and A.status='Open' and A.`device`=E.SystemCodeNumber order by A.sr_number Desc");

        $handleCCTV->execute();
        while($row = $handleCCTV->fetch()){
          $sr_number = $row['sr_number'];
          $SystemCodeNumber = $row['SystemCodeNumber'];
          $module = $row['module'];
          $subject = $row['subject'];
          $created_date = $row['created_date'];
          $status = $row['status'];
          $user_created = $row['user_created'];
          $online = $row['online'];
          $LastUpdated = $row['LastUpdated'];

          $tbl .= '<tr nobr = "true"><td>'.$sr_number.'</td><td>'.$SystemCodeNumber.'</td><td>'.$module.'</td><td>'.$subject.'</td><td>'.$created_date.'</td><td>'.$status.'</td><td>'.$user_created.'</td><td>'.$online.'</td><td>'.$LastUpdated.'</td></tr>';

        }
    }
    if((strcmp(trim($moduleUser),"VMS") === 0) or (strcmp(trim($moduleUser),"Admin") === 0) or (strcmp(trim($moduleUser),"Maintenance") === 0)){

        $handleVMS=$link->prepare("SELECT A.`sr_number`,E.SystemCodeNumber,A.`module`,A.`subject`,A.`created_date`,A.`status`,A.`user_created`,E.online,E.LastUpdated FROM `tis_maintenance_sr` A , tis_vms_fault E JOIN (select SystemCodeNumber, MAX(LastUpdated) as LastUpdated from tis_vms_fault GROUP BY SystemCodeNumber) t2 ON E.LastUpdated = t2.LastUpdated and E.SystemCodeNumber=t2.SystemCodeNumber WHERE A.module='VMS' and A.status='Open' and A.`device`=E.SystemCodeNumber order by A.sr_number Desc");

        $handleVMS->execute();
        while($row = $handleVMS->fetch()){
          $sr_number = $row['sr_number'];
          $SystemCodeNumber = $row['SystemCodeNumber'];
          $module = $row['module'];
          $subject = $row['subject'];
          $created_date = $row['created_date'];
          $status = $row['status'];
          $user_created = $row['user_created'];
          $online = $row['online'];
          $LastUpdated = $row['LastUpdated'];

          $tbl .= '<tr nobr = "true"><td>'.$sr_number.'</td><td>'.$SystemCodeNumber.'</td><td>'.$module.'</td><td>'.$subject.'</td><td>'.$created_date.'</td><td>'.$status.'</td><td>'.$user_created.'</td><td>'.$online.'</td><td>'.$LastUpdated.'</td></tr>';

        }
    }

    if((strcmp(trim($moduleUser),"ATCC") === 0) or (strcmp(trim($moduleUser),"Admin") === 0) or (strcmp(trim($moduleUser),"Maintenance") === 0)){

        $handleATCC=$link->prepare("SELECT A.`sr_number`,E.SystemCodeNumber,A.`module`,A.`subject`,A.`created_date`,A.`status`,A.`user_created`,E.online,E.LastUpdated FROM `tis_maintenance_sr` A , tis_detector_fault E JOIN (select SystemCodeNumber, MAX(LastUpdated) as LastUpdated from tis_detector_fault GROUP BY SystemCodeNumber) t2 ON E.LastUpdated = t2.LastUpdated and E.SystemCodeNumber=t2.SystemCodeNumber WHERE A.module='ATCC' and A.status='Open' and A.`device`=E.SystemCodeNumber order by A.sr_number Desc");

        $handleATCC->execute();
        while($row = $handleATCC->fetch()){
          $sr_number = $row['sr_number'];
          $SystemCodeNumber = $row['SystemCodeNumber'];
          $module = $row['module'];
          $subject = $row['subject'];
          $created_date = $row['created_date'];
          $status = $row['status'];
          $user_created = $row['user_created'];
          $online = $row['online'];
          $LastUpdated = $row['LastUpdated'];

          $tbl .= '<tr nobr = "true"><td>'.$sr_number.'</td><td>'.$SystemCodeNumber.'</td><td>'.$module.'</td><td>'.$subject.'</td><td>'.$created_date.'</td><td>'.$status.'</td><td>'.$user_created.'</td><td>'.$online.'</td><td>'.$LastUpdated.'</td></tr>';

        }
    }

    if((strcmp(trim($moduleUser),"MET") === 0) or (strcmp(trim($moduleUser),"Admin") === 0) or (strcmp(trim($moduleUser),"Maintenance") === 0)){

        $handleMET=$link->prepare("SELECT A.`sr_number`,E.SystemCodeNumber,A.`module`,A.`subject`,A.`created_date`,A.`status`,A.`user_created`,E.online,E.LastUpdated FROM `tis_maintenance_sr` A , tis_meteorological_fault E JOIN (select SystemCodeNumber, MAX(LastUpdated) as LastUpdated from tis_meteorological_fault GROUP BY SystemCodeNumber) t2 ON E.LastUpdated = t2.LastUpdated and E.SystemCodeNumber=t2.SystemCodeNumber WHERE A.module='MET' and A.status='Open' and A.`device`=E.SystemCodeNumber order by A.sr_number Desc");

        $handleMET->execute();
        while($row = $handleMET->fetch()){
          $sr_number = $row['sr_number'];
          $SystemCodeNumber = $row['SystemCodeNumber'];
          $module = $row['module'];
          $subject = $row['subject'];
          $created_date = $row['created_date'];
          $status = $row['status'];
          $user_created = $row['user_created'];
          $online = $row['online'];
          $LastUpdated = $row['LastUpdated'];

          $tbl .= '<tr nobr = "true"><td>'.$sr_number.'</td><td>'.$SystemCodeNumber.'</td><td>'.$module.'</td><td>'.$subject.'</td><td>'.$created_date.'</td><td>'.$status.'</td><td>'.$user_created.'</td><td>'.$online.'</td><td>'.$LastUpdated.'</td></tr>';

        }
    }

    if((strcmp(trim($moduleUser),"ECB") === 0) or (strcmp(trim($moduleUser),"Admin") === 0) or (strcmp(trim($moduleUser),"Maintenance") === 0)){

        $handleECB=$link->prepare("SELECT A.`sr_number`,E.SystemCodeNumber,A.`module`,A.`subject`,A.`created_date`,A.`status`,A.`user_created`,E.online,E.LastUpdated FROM `tis_maintenance_sr` A , tis_ecb_fault E JOIN (select SystemCodeNumber, MAX(LastUpdated) as LastUpdated from tis_ecb_fault GROUP BY SystemCodeNumber) t2 ON E.LastUpdated = t2.LastUpdated and E.SystemCodeNumber=t2.SystemCodeNumber WHERE A.module='ECB' and A.status='Open' and A.`device`=E.SystemCodeNumber order by A.sr_number Desc");

        $handleECB->execute();
        while($row = $handleECB->fetch()){
          $sr_number = $row['sr_number'];
          $SystemCodeNumber = $row['SystemCodeNumber'];
          $module = $row['module'];
          $subject = $row['subject'];
          $created_date = $row['created_date'];
          $status = $row['status'];
          $user_created = $row['user_created'];
          $online = $row['online'];
          $LastUpdated = $row['LastUpdated'];

          $tbl .= '<tr nobr = "true"><td>'.$sr_number.'</td><td>'.$SystemCodeNumber.'</td><td>'.$module.'</td><td>'.$subject.'</td><td>'.$created_date.'</td><td>'.$status.'</td><td>'.$user_created.'</td><td>'.$online.'</td><td>'.$LastUpdated.'</td></tr>';

        }
    }
      
  }
  
  $pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, true, false, '');
  
  ob_get_contents();
  ob_end_clean();
  $pdf->Output('HTMS_OpenSR_Report.pdf', 'I');

?>