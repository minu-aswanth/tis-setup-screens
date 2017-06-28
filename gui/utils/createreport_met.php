<?php
  include 'dblinker.php';
	
  $from = $_REQUEST['fromDate'];
  $to = $_REQUEST['toDate'];
  $timerange = $_REQUEST['timerange'];
  $parameter = $_REQUEST['parameter'];

  if($parameter == "all"){

    if($timerange == "Monthly"){
  
      $query = "SELECT YEAR(TimeStamp) as YEAR,DATE_FORMAT(TimeStamp,'%b') AS MONTH,
      ROUND(AVG(BattV_Avg),2) as AVG_BattV,ROUND(AVG(PTemp_C_Avg),2) as AVG_RoadTemp,ROUND(AVG(AirTC_Avg),2) as AVG_AirTemp,ROUND(AVG(RH),2) as AVG_Humidity,ROUND(AVG(WS_ms_Avg),2) as AVG_WindSpeed,ROUND(AVG(WindDir),2) as AVG_WindDirection,ROUND(AVG(Visibility),2) as AVG_Visibility,
      MIN(BattV_Avg) as MIN_BattV,MIN(PTemp_C_Avg) as MIN_RoadTemp,MIN(AirTC_Avg) as MIN_AirTemp,MIN(RH) as MIN_Humidity,MIN(WS_ms_Avg) as MIN_WindSpeed,MIN(WindDir) as MIN_WindDirection,MIN(Visibility) as MIN_Visibility,
      MAX(BattV_Avg) as MAX_BattV,MAX(PTemp_C_Avg) as MAX_RoadTemp,MAX(AirTC_Avg) as MAX_AirTemp,MAX(RH) as MAX_Humidity,MAX(WS_ms_Avg) as MAX_WindSpeed,MAX(WindDir) as MAX_WindDirection,MAX(Visibility) as MAX_Visibility
      FROM tis_meteorological_dynamic_dump WHERE TimeStamp >= '$from' AND TimeStamp <= '$to' GROUP BY YEAR(TimeStamp) , MONTH(TimeStamp) " ;
    
    $link = linkToTIS();
      $handle=$link->prepare($query);
      $handle->execute();
      $result=$handle->fetchall(PDO::FETCH_ASSOC);
      echo json_encode($result);
        
      }
      
    else if($timerange == "Weekly"){
      
        $query = "SELECT YEAR(TimeStamp) as YEAR, DATE_FORMAT(TimeStamp, '%d-%b') AS WEEK, 
        ROUND(AVG(BattV_Avg),2) as AVG_BattV,ROUND(AVG(PTemp_C_Avg),2) as AVG_RoadTemp,ROUND(AVG(AirTC_Avg),2) as AVG_AirTemp,ROUND(AVG(RH),2) as AVG_Humidity,ROUND(AVG(WS_ms_Avg),2) as AVG_WindSpeed,ROUND(AVG(WindDir),2) as AVG_WindDirection,ROUND(AVG(Visibility),2) as AVG_Visibility,
        MIN(BattV_Avg) as MIN_BattV,MIN(PTemp_C_Avg) as MIN_RoadTemp,MIN(AirTC_Avg) as MIN_AirTemp,MIN(RH) as MIN_Humidity,MIN(WS_ms_Avg) as MIN_WindSpeed,MIN(WindDir) as MIN_WindDirection,MIN(Visibility) as MIN_Visibility,
        MAX(BattV_Avg) as MAX_BattV,MAX(PTemp_C_Avg) as MAX_RoadTemp,MAX(AirTC_Avg) as MAX_AirTemp,MAX(RH) as MAX_Humidity,MAX(WS_ms_Avg) as MAX_WindSpeed,MAX(WindDir) as MAX_WindDirection,MAX(Visibility) as MAX_Visibility
        FROM tis_meteorological_dynamic_dump WHERE TimeStamp >= '$from' AND TimeStamp <= '$to' GROUP BY YEAR(TimeStamp) , WEEK(TimeStamp) " ;
      $link = linkToTIS();
      $handle=$link->prepare($query);
      $handle->execute();
      $result=$handle->fetchall(PDO::FETCH_ASSOC);
      echo json_encode($result);
        }


    else if($timerange == "Daily"){
      
      $query = "SELECT YEAR(TimeStamp) as YEAR,DATE_FORMAT(TimeStamp,'%b') AS MONTH,DAY(TimeStamp) as DAY,
      ROUND(AVG(BattV_Avg),2) as AVG_BattV,ROUND(AVG(PTemp_C_Avg),2) as AVG_RoadTemp,ROUND(AVG(AirTC_Avg),2) as AVG_AirTemp,ROUND(AVG(RH),2) as AVG_Humidity,ROUND(AVG(WS_ms_Avg),2) as AVG_WindSpeed,ROUND(AVG(WindDir),2) as AVG_WindDirection,ROUND(AVG(Visibility),2) as AVG_Visibility,
      MIN(BattV_Avg) as MIN_BattV,MIN(PTemp_C_Avg) as MIN_RoadTemp,MIN(AirTC_Avg) as MIN_AirTemp,MIN(RH) as MIN_Humidity,MIN(WS_ms_Avg) as MIN_WindSpeed,MIN(WindDir) as MIN_WindDirection,MIN(Visibility) as MIN_Visibility,
      MAX(BattV_Avg) as MAX_BattV,MAX(PTemp_C_Avg) as MAX_RoadTemp,MAX(AirTC_Avg) as MAX_AirTemp,MAX(RH) as MAX_Humidity,MAX(WS_ms_Avg) as MAX_WindSpeed,MAX(WindDir) as MAX_WindDirection,MAX(Visibility) as MAX_Visibility
      FROM tis_meteorological_dynamic_dump WHERE TimeStamp >= '$from' AND TimeStamp <= '$to' GROUP BY YEAR(TimeStamp) , MONTH(TimeStamp) , DAY(TimeStamp)" ;
      $link = linkToTIS();
      $handle=$link->prepare($query);
      $handle->execute();
      $result=$handle->fetchall(PDO::FETCH_ASSOC);
      echo json_encode($result);

      
    } else if($timerange == "Hourly"){
      
      $query = "SELECT YEAR(TimeStamp) as YEAR,DATE_FORMAT(TimeStamp,'%b') AS MONTH,DAY(TimeStamp) as DAY,HOUR(TimeStamp) as HOUR, 
      ROUND(AVG(BattV_Avg),2) as AVG_BattV,ROUND(AVG(PTemp_C_Avg),2) as AVG_RoadTemp,ROUND(AVG(AirTC_Avg),2) as AVG_AirTemp,ROUND(AVG(RH),2) as AVG_Humidity,ROUND(AVG(WS_ms_Avg),2) as AVG_WindSpeed,ROUND(AVG(WindDir),2) as AVG_WindDirection,ROUND(AVG(Visibility),2) as AVG_Visibility,
      MIN(BattV_Avg) as MIN_BattV,MIN(PTemp_C_Avg) as MIN_RoadTemp,MIN(AirTC_Avg) as MIN_AirTemp,MIN(RH) as MIN_Humidity,MIN(WS_ms_Avg) as MIN_WindSpeed,MIN(WindDir) as MIN_WindDirection,MIN(Visibility) as MIN_Visibility,
      MAX(BattV_Avg) as MAX_BattV,MAX(PTemp_C_Avg) as MAX_RoadTemp,MAX(AirTC_Avg) as MAX_AirTemp,MAX(RH) as MAX_Humidity,MAX(WS_ms_Avg) as MAX_WindSpeed,MAX(WindDir) as MAX_WindDirection,MAX(Visibility) as MAX_Visibility
      FROM tis_meteorological_dynamic_dump WHERE TimeStamp >= '$from' AND TimeStamp <= '$to' GROUP BY YEAR(TimeStamp) , MONTH(TimeStamp), DAY(TimeStamp), HOUR(TimeStamp) " ;
      $link = linkToTIS();
      $handle=$link->prepare($query);
      $handle->execute();
      $result=$handle->fetchall(PDO::FETCH_ASSOC);
      echo json_encode($result);
      
    } else if($timerange == "Raw_Data"){
      
      $query = "SELECT * FROM tis_meteorological_dynamic_dump WHERE TimeStamp >= '$from' AND TimeStamp <= '$to'" ;
      $link = linkToTIS();
      $handle=$link->prepare($query);
      $handle->execute();
      $result=$handle->fetchall(PDO::FETCH_ASSOC);
      echo json_encode($result);
      
    }

  } else {

    $query = "SELECT TimeStamp,$parameter FROM tis_meteorological_dynamic_dump WHERE TimeStamp >= '$from' AND TimeStamp <= '$to'" ;
    $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    $result=$handle->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($result);

  }
  
  



?>