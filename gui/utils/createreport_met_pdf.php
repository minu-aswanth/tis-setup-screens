<?php
  ob_start();
  include 'dblinker.php';
  include './tcpdf/tcpdf.php';

  $from = $_REQUEST['fromDate'];
  $to = $_REQUEST['toDate'];
  $timerange = $_REQUEST['timerange'];
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
  $pdf->SetTitle('Meteorlogical Detector Report');
  $pdf->SetSubject('Report');
  $pdf->SetKeywords('PDF');
  $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, "Meteorlogical Detector Report", $string);
  
  $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
  
  $pdf->SetMargins(5,20,5,true);
  
  $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
  
  $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
  
  $pdf->setFontSubsetting(true);
  
  $pdf->SetFont('dejavusans', '', 8, '', true);

  $pdf->setCellHeightRatio(2.5);
  $pdf->Cell(30, 0, '1', 1, 1, 'C', 1, '', 0, false, 'T', 'C');
  $pdf->Ln(2);

  if($timerange == "Monthly"){
  
  $pdf->AddPage('L');
    
    //$tbl_header = '<h1 align = "center">Monthly Meteorlogical Detector Summary </h1>  <table border="1" align = "center">';
    $tbl_header = '<h1 align = "center"><img src="../images/hcc.jpg" width ="280"></img><br><font size = "11">Monthly Meteorlogical Detector Summary</font><br>(From: '.$from.' To: '.$to.')</h1>  <table border="1" align = "center">';
    $tbl_footer = '</table>';
    $tbl ='<tr><td><b>'.Year.'</b></td><td><b>'.Month.'</b></td><td><b>'."Avg Battery Volt".'</b></td><td><b>'."Avg Road Temp".'</b></td><td><b>'."Avg Air Temp".'</b></td><td><b>'."Avg Humidity".'</b></td><td><b>'."Avg Wind Speed".'</b></td><td><b>'."Avg Wind Direction".'</b></td><td><b>'."Avg Visibility".'</b></td><td><b>'."Min Battery Volt".'</b></td><td><b>'."Min Road Temp".'</b></td><td><b>'."Min Air Temp".'</b></td><td><b>'."Min Humidity".'</b></td><td><b>'."Min Wind Speed".'</b></td><td><b>'."Min Wind Direction".'</b></td><td><b>'."Min Visibility".'</b></td><td><b>'."Max Battery Volt".'</b></td><td><b>'."Max Road Temp".'</b></td><td><b>'."Max Air Temp".'</b></td><td><b>'."Max Humidity".'</b></td><td><b>'."Max Wind Speed".'</b></td><td><b>'."Max Wind Direction".'</b></td><td><b>'."Max Visibility".'</b></td></tr>';
    $query = "SELECT YEAR(TimeStamp) as YEAR,DATE_FORMAT(TimeStamp,'%b') AS MONTH,
    ROUND(AVG(BattV_Avg),2) as AVG_BattV,ROUND(AVG(PTemp_C_Avg),2) as AVG_RoadTemp,ROUND(AVG(AirTC_Avg),2) as AVG_AirTemp,ROUND(AVG(RH),2) as AVG_Humidity,ROUND(AVG(WS_ms_Avg),2) as AVG_WindSpeed,ROUND(AVG(WindDir),2) as AVG_WindDirection,ROUND(AVG(Visibility),2) as AVG_Visibility,
    MIN(BattV_Avg) as MIN_BattV,MIN(PTemp_C_Avg) as MIN_RoadTemp,MIN(AirTC_Avg) as MIN_AirTemp,MIN(RH) as MIN_Humidity,MIN(WS_ms_Avg) as MIN_WindSpeed,MIN(WindDir) as MIN_WindDirection,MIN(Visibility) as MIN_Visibility,
    MAX(BattV_Avg) as MAX_BattV,MAX(PTemp_C_Avg) as MAX_RoadTemp,MAX(AirTC_Avg) as MAX_AirTemp,MAX(RH) as MAX_Humidity,MAX(WS_ms_Avg) as MAX_WindSpeed,MAX(WindDir) as MAX_WindDirection,MAX(Visibility) as MAX_Visibility
    FROM tis_meteorological_dynamic_dump WHERE TimeStamp >= '$from' AND TimeStamp <= '$to' GROUP BY YEAR(TimeStamp) , MONTH(TimeStamp) " ;
  
  $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    while($row = $handle->fetch()){
      $year = $row['YEAR'];
      $month = $row['MONTH'];
      
      $a_b = $row['AVG_BattV'];
      $a_rt = $row['AVG_RoadTemp'];
      $a_at = $row['AVG_AirTemp'];
      $a_h = $row['AVG_Humidity'];
      $a_ws = $row['AVG_WindSpeed'];
      $a_wd = $row['AVG_WindDirection'];
      $a_v = $row['AVG_Visibility'];

      $n_b = $row['MIN_BattV'];
      $n_rt = $row['MIN_RoadTemp'];
      $n_at = $row['MIN_AirTemp'];
      $n_h = $row['MIN_Humidity'];
      $n_ws = $row['MIN_WindSpeed'];
      $n_wd = $row['MIN_WindDirection'];
      $n_v = $row['MIN_Visibility'];

      $x_b = $row['MAX_BattV'];
      $x_rt = $row['MAX_RoadTemp'];
      $x_at = $row['MAX_AirTemp'];
      $x_h = $row['MAX_Humidity'];
      $x_ws = $row['MAX_WindSpeed'];
      $x_wd = $row['MAX_WindDirection'];
      $x_v = $row['MAX_Visibility'];

      $tbl .= '<tr nobr = "true"><td>'.$year.'</td><td>'.$month.'</td><td>'.$a_b.'</td><td>'.$a_rt.'</td><td>'.$a_at.'</td><td>'.$a_h.'</td><td>'.$a_ws.'</td><td>'.$a_wd.'</td><td>'.$a_v.'</td><td>'.$n_b.'</td><td>'.$n_rt.'</td><td>'.$n_at.'</td><td>'.$n_h.'</td><td>'.$n_ws.'</td><td>'.$n_wd.'</td><td>'.$n_v.'</td><td>'.$x_b.'</td><td>'.$x_rt.'</td><td>'.$x_at.'</td><td>'.$x_h.'</td><td>'.$x_ws.'</td><td>'.$x_wd.'</td><td>'.$x_v.'</td></tr>';
    }
    $pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, true, false, '');

  } else if($timerange == "Weekly"){
    
    $pdf->AddPage('L');
      
      //$tbl_header = '<h1 align = "center">Weekly Meteorlogical Detector Summary </h1>  <table border="1" align = "center">';
      $tbl_header = '<h1 align = "center"><img src="../images/hcc.jpg" width ="280"></img><br><font size = "11">Weekly Meteorlogical Detector Summary </font></h1>  <table border="1" align = "center">';
      $tbl_footer = '</table>';
      $tbl ='<tr><td><b>'.Year.'</b></td><td><b>'.Week.'</b></td><td><b>'."Avg Battery Volt".'</b></td><td><b>'."Avg Road Temp".'</b></td><td><b>'."Avg Air Temp".'</b></td><td><b>'."Avg Humidity".'</b></td><td><b>'."Avg Wind Speed".'</b></td><td><b>'."Avg Wind Direction".'</b></td><td><b>'."Avg Visibility".'</b></td><td><b>'."Min Battery Volt".'</b></td><td><b>'."Min Road Temp".'</b></td><td><b>'."Min Air Temp".'</b></td><td><b>'."Min Humidity".'</b></td><td><b>'."Min Wind Speed".'</b></td><td><b>'."Min Wind Direction".'</b></td><td><b>'."Min Visibility".'</b></td><td><b>'."Max Battery Volt".'</b></td><td><b>'."Max Road Temp".'</b></td><td><b>'."Max Air Temp".'</b></td><td><b>'."Max Humidity".'</b></td><td><b>'."Max Wind Speed".'</b></td><td><b>'."Max Wind Direction".'</b></td><td><b>'."Max Visibility".'</b></td></tr>';
      $query = "SELECT YEAR(TimeStamp) as YEAR, DATE_FORMAT(TimeStamp, '%d-%b') AS WEEK, 
      ROUND(AVG(BattV_Avg),2) as AVG_BattV,ROUND(AVG(PTemp_C_Avg),2) as AVG_RoadTemp,ROUND(AVG(AirTC_Avg),2) as AVG_AirTemp,ROUND(AVG(RH),2) as AVG_Humidity,ROUND(AVG(WS_ms_Avg),2) as AVG_WindSpeed,ROUND(AVG(WindDir),2) as AVG_WindDirection,ROUND(AVG(Visibility),2) as AVG_Visibility,
      MIN(BattV_Avg) as MIN_BattV,MIN(PTemp_C_Avg) as MIN_RoadTemp,MIN(AirTC_Avg) as MIN_AirTemp,MIN(RH) as MIN_Humidity,MIN(WS_ms_Avg) as MIN_WindSpeed,MIN(WindDir) as MIN_WindDirection,MIN(Visibility) as MIN_Visibility,
      MAX(BattV_Avg) as MAX_BattV,MAX(PTemp_C_Avg) as MAX_RoadTemp,MAX(AirTC_Avg) as MAX_AirTemp,MAX(RH) as MAX_Humidity,MAX(WS_ms_Avg) as MAX_WindSpeed,MAX(WindDir) as MAX_WindDirection,MAX(Visibility) as MAX_Visibility
      FROM tis_meteorological_dynamic_dump WHERE TimeStamp >= '$from' AND TimeStamp <= '$to' GROUP BY YEAR(TimeStamp) , WEEK(TimeStamp) " ;
    $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    while($row = $handle->fetch()){
      $year = $row['YEAR'];
      $week = $row['WEEK'];
      
      $a_b = $row['AVG_BattV'];
      $a_rt = $row['AVG_RoadTemp'];
      $a_at = $row['AVG_AirTemp'];
      $a_h = $row['AVG_Humidity'];
      $a_ws = $row['AVG_WindSpeed'];
      $a_wd = $row['AVG_WindDirection'];
      $a_v = $row['AVG_Visibility'];

      $n_b = $row['MIN_BattV'];
      $n_rt = $row['MIN_RoadTemp'];
      $n_at = $row['MIN_AirTemp'];
      $n_h = $row['MIN_Humidity'];
      $n_ws = $row['MIN_WindSpeed'];
      $n_wd = $row['MIN_WindDirection'];
      $n_v = $row['MIN_Visibility'];

      $x_b = $row['MAX_BattV'];
      $x_rt = $row['MAX_RoadTemp'];
      $x_at = $row['MAX_AirTemp'];
      $x_h = $row['MAX_Humidity'];
      $x_ws = $row['MAX_WindSpeed'];
      $x_wd = $row['MAX_WindDirection'];
      $x_v = $row['MAX_Visibility'];


        $tbl .= '<tr nobr = "true"><td>'.$year.'</td><td>'.$week.'</td><td>'.$a_b.'</td><td>'.$a_rt.'</td><td>'.$a_at.'</td><td>'.$a_h.'</td><td>'.$a_ws.'</td><td>'.$a_wd.'</td><td>'.$a_v.'</td><td>'.$n_b.'</td><td>'.$n_rt.'</td><td>'.$n_at.'</td><td>'.$n_h.'</td><td>'.$n_ws.'</td><td>'.$n_wd.'</td><td>'.$n_v.'</td><td>'.$x_b.'</td><td>'.$x_rt.'</td><td>'.$x_at.'</td><td>'.$x_h.'</td><td>'.$x_ws.'</td><td>'.$x_wd.'</td><td>'.$x_v.'</td></tr>';
      }
      $pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, true, false, '');

  } else if($timerange == "Daily"){
    
    $pdf->AddPage('L');
      
      //$tbl_header = '<h1 align = "center">Daily Meteorlogical Detector Summary </h1>  <table border="1" align = "center">';
      $tbl_header = '<tr><h1 align = "center"><img src="../images/hcc.jpg" width ="280"></img><br><font size = "11"> Daily Meteorlogical Detector Summary</font> </h1>  <table border="1" align = "center">';
      $tbl_footer = '</table>';
      $tbl ='<tr><td><b>'.Year.'</b></td><td><b>'.Month.'</b></td><td><b>'.Date.'</b></td><td><b>'."Avg Battery Volt".'</b></td><td><b>'."Avg Road Temp".'</b></td><td><b>'."Avg Air Temp".'</b></td><td><b>'."Avg Humidity".'</b></td><td><b>'."Avg Wind Speed".'</b></td><td><b>'."Avg Wind Direction".'</b></td><td><b>'."Avg Visibility".'</b></td><td><b>'."Min Battery Volt".'</b></td><td><b>'."Min Road Temp".'</b></td><td><b>'."Min Air Temp".'</b></td><td><b>'."Min Humidity".'</b></td><td><b>'."Min Wind Speed".'</b></td><td><b>'."Min Wind Direction".'</b></td><td><b>'."Min Visibility".'</b></td><td><b>'."Max Battery Volt".'</b></td><td><b>'."Max Road Temp".'</b></td><td><b>'."Max Air Temp".'</b></td><td><b>'."Max Humidity".'</b></td><td><b>'."Max Wind Speed".'</b></td><td><b>'."Max Wind Direction".'</b></td><td><b>'."Max Visibility".'</b></td></tr>';
      $query = "SELECT YEAR(TimeStamp) as YEAR,DATE_FORMAT(TimeStamp,'%b') AS MONTH,DAY(TimeStamp) as DAY,
    ROUND(AVG(BattV_Avg),2) as AVG_BattV,ROUND(AVG(PTemp_C_Avg),2) as AVG_RoadTemp,ROUND(AVG(AirTC_Avg),2) as AVG_AirTemp,ROUND(AVG(RH),2) as AVG_Humidity,ROUND(AVG(WS_ms_Avg),2) as AVG_WindSpeed,ROUND(AVG(WindDir),2) as AVG_WindDirection,ROUND(AVG(Visibility),2) as AVG_Visibility,
    MIN(BattV_Avg) as MIN_BattV,MIN(PTemp_C_Avg) as MIN_RoadTemp,MIN(AirTC_Avg) as MIN_AirTemp,MIN(RH) as MIN_Humidity,MIN(WS_ms_Avg) as MIN_WindSpeed,MIN(WindDir) as MIN_WindDirection,MIN(Visibility) as MIN_Visibility,
    MAX(BattV_Avg) as MAX_BattV,MAX(PTemp_C_Avg) as MAX_RoadTemp,MAX(AirTC_Avg) as MAX_AirTemp,MAX(RH) as MAX_Humidity,MAX(WS_ms_Avg) as MAX_WindSpeed,MAX(WindDir) as MAX_WindDirection,MAX(Visibility) as MAX_Visibility
    FROM tis_meteorological_dynamic_dump WHERE TimeStamp >= '$from' AND TimeStamp <= '$to' GROUP BY YEAR(TimeStamp) , MONTH(TimeStamp) , DAY(TimeStamp)" ;
    $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    while($row = $handle->fetch()){
      $year = $row['YEAR'];
      $month = $row['MONTH'];
      $day = $row['DAY'];

      $a_b = $row['AVG_BattV'];
      $a_rt = $row['AVG_RoadTemp'];
      $a_at = $row['AVG_AirTemp'];
      $a_h = $row['AVG_Humidity'];
      $a_ws = $row['AVG_WindSpeed'];
      $a_wd = $row['AVG_WindDirection'];
      $a_v = $row['AVG_Visibility'];

      $n_b = $row['MIN_BattV'];
      $n_rt = $row['MIN_RoadTemp'];
      $n_at = $row['MIN_AirTemp'];
      $n_h = $row['MIN_Humidity'];
      $n_ws = $row['MIN_WindSpeed'];
      $n_wd = $row['MIN_WindDirection'];
      $n_v = $row['MIN_Visibility'];

      $x_b = $row['MAX_BattV'];
      $x_rt = $row['MAX_RoadTemp'];
      $x_at = $row['MAX_AirTemp'];
      $x_h = $row['MAX_Humidity'];
      $x_ws = $row['MAX_WindSpeed'];
      $x_wd = $row['MAX_WindDirection'];
      $x_v = $row['MAX_Visibility'];

        $tbl .= '<tr nobr = "true"><td>'.$year.'</td><td>'.$month.'</td><td>'.$day.'</td><td>'.$a_b.'</td><td>'.$a_rt.'</td><td>'.$a_at.'</td><td>'.$a_h.'</td><td>'.$a_ws.'</td><td>'.$a_wd.'</td><td>'.$a_v.'</td><td>'.$n_b.'</td><td>'.$n_rt.'</td><td>'.$n_at.'</td><td>'.$n_h.'</td><td>'.$n_ws.'</td><td>'.$n_wd.'</td><td>'.$n_v.'</td><td>'.$x_b.'</td><td>'.$x_rt.'</td><td>'.$x_at.'</td><td>'.$x_h.'</td><td>'.$x_ws.'</td><td>'.$x_wd.'</td><td>'.$x_v.'</td></tr>';

      
      }
      $pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, true, false, '');
    
  } else if($timerange == "Hourly"){
    
      $pdf->AddPage('L');
      
      //$tbl_header = '<h1 align = "center">Hourly Meteorlogical Detector Summary </h1>  <table border="1" align = "center">';
      $tbl_header = '<h1 align = "center"><img src="../images/hcc.jpg" width ="280"></img><br><font size = "11">Hourly Meteorlogical Detector Summary </font></h1>  <table border="1" align = "center">';
      $tbl_footer = '</table>';
      $tbl ='<tr><td><b>'.Year.'</b></td><td><b>'.Month.'</b></td><td><b>'.Date.'</b></td><td><b>'.Hour.'</b></td><td><b>'."Avg Battery Volt".'</b></td><td><b>'."Avg Road Temp".'</b></td><td><b>'."Avg Air Temp".'</b></td><td><b>'."Avg Humidity".'</b></td><td><b>'."Avg Wind Speed".'</b></td><td><b>'."Avg Wind Direction".'</b></td><td><b>'."Avg Visibility".'</b></td><td><b>'."Min Battery Volt".'</b></td><td><b>'."Min Road Temp".'</b></td><td><b>'."Min Air Temp".'</b></td><td><b>'."Min Humidity".'</b></td><td><b>'."Min Wind Speed".'</b></td><td><b>'."Min Wind Direction".'</b></td><td><b>'."Min Visibility".'</b></td><td><b>'."Max Battery Volt".'</b></td><td><b>'."Max Road Temp".'</b></td><td><b>'."Max Air Temp".'</b></td><td><b>'."Max Humidity".'</b></td><td><b>'."Max Wind Speed".'</b></td><td><b>'."Max Wind Direction".'</b></td><td><b>'."Max Visibility".'</b></td></tr>';
      $query = "SELECT YEAR(TimeStamp) as YEAR,DATE_FORMAT(TimeStamp,'%b') AS MONTH,DAY(TimeStamp) as DAY,HOUR(TimeStamp) as HOUR, 
    ROUND(AVG(BattV_Avg),2) as AVG_BattV,ROUND(AVG(PTemp_C_Avg),2) as AVG_RoadTemp,ROUND(AVG(AirTC_Avg),2) as AVG_AirTemp,ROUND(AVG(RH),2) as AVG_Humidity,ROUND(AVG(WS_ms_Avg),2) as AVG_WindSpeed,ROUND(AVG(WindDir),2) as AVG_WindDirection,ROUND(AVG(Visibility),2) as AVG_Visibility,
    MIN(BattV_Avg) as MIN_BattV,MIN(PTemp_C_Avg) as MIN_RoadTemp,MIN(AirTC_Avg) as MIN_AirTemp,MIN(RH) as MIN_Humidity,MIN(WS_ms_Avg) as MIN_WindSpeed,MIN(WindDir) as MIN_WindDirection,MIN(Visibility) as MIN_Visibility,
    MAX(BattV_Avg) as MAX_BattV,MAX(PTemp_C_Avg) as MAX_RoadTemp,MAX(AirTC_Avg) as MAX_AirTemp,MAX(RH) as MAX_Humidity,MAX(WS_ms_Avg) as MAX_WindSpeed,MAX(WindDir) as MAX_WindDirection,MAX(Visibility) as MAX_Visibility
    FROM tis_meteorological_dynamic_dump WHERE TimeStamp >= '$from' AND TimeStamp <= '$to' GROUP BY YEAR(TimeStamp) , MONTH(TimeStamp), DAY(TimeStamp), HOUR(TimeStamp) " ;
    $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    while($row = $handle->fetch()){
        
        $year = $row['YEAR'];
        $month = $row['MONTH'];
        $day = $row['DAY'];
        $hour = $row['HOUR'];

        $a_b = $row['AVG_BattV'];
        $a_rt = $row['AVG_RoadTemp'];
        $a_at = $row['AVG_AirTemp'];
        $a_h = $row['AVG_Humidity'];
        $a_ws = $row['AVG_WindSpeed'];
        $a_wd = $row['AVG_WindDirection'];
        $a_v = $row['AVG_Visibility'];

        $n_b = $row['MIN_BattV'];
        $n_rt = $row['MIN_RoadTemp'];
        $n_at = $row['MIN_AirTemp'];
        $n_h = $row['MIN_Humidity'];
        $n_ws = $row['MIN_WindSpeed'];
        $n_wd = $row['MIN_WindDirection'];
        $n_v = $row['MIN_Visibility'];

        $x_b = $row['MAX_BattV'];
        $x_rt = $row['MAX_RoadTemp'];
        $x_at = $row['MAX_AirTemp'];
        $x_h = $row['MAX_Humidity'];
        $x_ws = $row['MAX_WindSpeed'];
        $x_wd = $row['MAX_WindDirection'];
        $x_v = $row['MAX_Visibility'];


        $tbl .= '<tr nobr = "true"><td>'.$year.'</td><td>'.$month.'</td><td>'.$day.'</td><td>'.$hour.'</td><td>'.$a_b.'</td><td>'.$a_rt.'</td><td>'.$a_at.'</td><td>'.$a_h.'</td><td>'.$a_ws.'</td><td>'.$a_wd.'</td><td>'.$a_v.'</td><td>'.$n_b.'</td><td>'.$n_rt.'</td><td>'.$n_at.'</td><td>'.$n_h.'</td><td>'.$n_ws.'</td><td>'.$n_wd.'</td><td>'.$n_v.'</td><td>'.$x_b.'</td><td>'.$x_rt.'</td><td>'.$x_at.'</td><td>'.$x_h.'</td><td>'.$x_ws.'</td><td>'.$x_wd.'</td><td>'.$x_v.'</td></tr>';
      }
      $pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, true, false, '');
    
  } else if($timerange == "Raw_Data"){
    
      $pdf->AddPage('L');
      
      //$tbl_header = '<h1 align = "center">Raw Data - Meteorlogical Detector </h1>  <table border="1" align = "center">';
      $tbl_header = '<h1 align = "center"><img src="../images/hcc.jpg" width ="280"></img><br><font size = "11">Hourly Meteorlogical Detector Summary</font> </h1>  <table border="1" align = "center">';
      $tbl_footer = '</table>';
      $tbl ='<tr><td><b>'.TimeStamp.'</b></td><td><b>'.Record.'</b></td><td><b>'.BattV_Avg.'</b></td><td><b>'.PTemp_C_Avg.'</b></td><td><b>'.AirTC_Avg.'</b></td><td><b>'.RH.'</b></td><td><b>'.WS_ms_Avg.'</b></td><td><b>'.WindDir.'</b></td><td><b>'.TT_C_Avg.'</b></td><td><b>'.SBT_C_Avg.'</b></td><td><b>'.Visibility.'</b></td></tr>';
      $query = "SELECT TimeStamp, Record, BattV_Avg, PTemp_C_Avg, AirTC_Avg, RH, WS_ms_Avg, WindDir, TT_C_Avg, SBT_C_Avg, Visibility
      FROM tis_meteorological_dynamic_dump WHERE TimeStamp >= '$from' AND TimeStamp <= '$to'" ;
      $link = linkToTIS();
      $handle=$link->prepare($query);
      $handle->execute();
      while($row = $handle->fetch()){
        
        $ts = $row['TimeStamp'];
        $rec = $row['Record'];
        
        $bat = $row['BattV_Avg'];
        $rt = $row['PTemp_C_Avg'];
        $at = $row['AirTC_Avg'];
        $h = $row['RH'];
        $ws = $row['WS_ms_Avg'];
        $wd = $row['WindDir'];
        $tt = $row['TT_C_Avg'];
        $sbt = $row['SBT_C_Avg'];
        $v = $row['Visibility'];



        $tbl .= '<tr nobr = "true"><td>'.$ts.'</td><td>'.$rec.'</td><td>'.$bat.'</td><td>'.$rt.'</td><td>'.$at.'</td><td>'.$h.'</td><td>'.$ws.'</td><td>'.$wd.'</td><td>'.$tt.'</td><td>'.$sbt.'</td><td>'.$v.'</td></tr>';
      }
      $pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, true, false, '');
    
  }

  $pdf->AddPage('L');
  $tbl_header = '<h1 align = "center">Detector Summary </h1> <table border="1" align = "center">';
  $tbl_footer = '</table>';
  $tbl ='<tr><td><b>'.SCN.'</b></td><td><b>'.Northing.'</b></td><td><b>'.Easting.'</b></td><td><b>'.Place.'</b></td></tr>';
  $query = "SELECT SystemCodeNumber, ROUND(Northing,6), ROUND(Easting,6), Place  FROM utmc_meteorological_static " ;
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
  $pdf->Output('traffic_meteorological_report.pdf', 'I');

?>