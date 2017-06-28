<?php
	include 'dblinker.php';

  $from = $_REQUEST['fromDate'];
  $to = $_REQUEST['toDate'];
  $timerange = $_REQUEST['timerange'];
  $vClass = $_REQUEST['vClass'];
  $direction = $_REQUEST['direction'];
  $dayOfWeek = $_REQUEST['dayOfWeek'];
  $scn = $_REQUEST['scn'];
  $lane = $_REQUEST['lane'];
  $error = $_REQUEST['error'];

  
  if($timerange == "Monthly"){
    
    $query = "SELECT A.SCN, YEAR(A.TimeStamp) as Year, DATE_FORMAT(A.TimeStamp,'%b') as Month, COUNT(A.ID) as Total_FLow, 
    ROUND(AVG(NULLIF(A.Speed ,0))) as Avg_Speed, ROUND(AVG(NULLIF(A.VehicleLength ,0))) as Avg_Length, MAX(A.Speed) as Max_Speed, MAX(A.VehicleLength) as Max_Length, ROUND(MIN(NULLIF(A.Speed, 0))) as Min_Speed, ROUND(MIN(NULLIF(A.VehicleLength, 0))) as Min_Length FROM tis_detector_dynamic_vbv A, tis_detector_class_config B WHERE A.ClassByAxle = B.binNumber AND A.TimeStamp >= '$from' AND A.TimeStamp <= '$to' " ;

    if($vClass != 'all'){
      $query=$query."AND B.binName = '$vClass' ";
    }
    if($direction != 'both'){
      $query=$query."AND A.TowardsToll = '$direction' ";
    }
    if($dayOfWeek != 'all'){
      $query=$query."AND DAYOFWEEK(A.TimeStamp) = '$dayOfWeek' ";
    }
    if($scn != 'All'){
      $query=$query."AND A.SCN = '$scn' "; 
    }

    $query=$query."GROUP BY A.SCN , YEAR(A.TimeStamp) , MONTH(A.TimeStamp) "; 

    $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    $result=$handle->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($result);
  } 
  else if($timerange == "Weekly"){

    $query = "SELECT A.SCN, YEAR(A.TimeStamp) as Year, DATE_FORMAT(A.TimeStamp,'%d-%b') as Week, COUNT(A.ID) as Total_FLow, 
    ROUND(AVG(NULLIF(A.Speed ,0))) as Avg_Speed, ROUND(AVG(NULLIF(A.VehicleLength ,0))) as Avg_Length, MAX(A.Speed) as Max_Speed, MAX(A.VehicleLength) as Max_Length, ROUND(MIN(NULLIF(A.Speed, 0))) as Min_Speed, ROUND(MIN(NULLIF(A.VehicleLength, 0))) as Min_Length FROM tis_detector_dynamic_vbv A, tis_detector_class_config B WHERE A.ClassByAxle = B.binNumber AND A.TimeStamp >= '$from' AND A.TimeStamp <= '$to' " ;

    if($vClass != 'all'){
      $query=$query."AND B.binName = '$vClass' ";
    }
    if($direction != 'both'){
      $query=$query."AND A.TowardsToll = '$direction' ";
    }
    if($dayOfWeek != 'all'){
      $query=$query."AND DAYOFWEEK(A.TimeStamp) = '$dayOfWeek' ";
    }
    if($scn != 'All'){
      $query=$query."AND A.SCN = '$scn' "; 
    }

    $query=$query."GROUP BY A.SCN , YEAR(A.TimeStamp) , WEEK(A.TimeStamp) "; 

    $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    $result=$handle->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($result); 
  }
  else if($timerange == "Daily"){

    $query = "SELECT A.SCN, YEAR(A.TimeStamp) as Year, DATE_FORMAT(A.TimeStamp,'%b') as Month, DAY(A.TimeStamp) as Day, COUNT(A.ID) as Total_FLow, ROUND(AVG(NULLIF(A.Speed ,0))) as Avg_Speed, ROUND(AVG(NULLIF(A.VehicleLength ,0))) as Avg_Length, MAX(A.Speed) as Max_Speed, MAX(A.VehicleLength) as Max_Length, ROUND(MIN(NULLIF(A.Speed, 0))) as Min_Speed, ROUND(MIN(NULLIF(A.VehicleLength, 0))) as Min_Length FROM tis_detector_dynamic_vbv A, tis_detector_class_config B WHERE A.ClassByAxle = B.binNumber AND A.TimeStamp >= '$from' AND A.TimeStamp <= '$to' " ;

    if($vClass != 'all'){
      $query=$query."AND B.binName = '$vClass' ";
    }
    if($direction != 'both'){
      $query=$query."AND A.TowardsToll = '$direction' ";
    }
    if($dayOfWeek != 'all'){
      $query=$query."AND DAYOFWEEK(A.TimeStamp) = '$dayOfWeek' ";
    }
    if($scn != 'All'){
      $query=$query."AND A.SCN = '$scn' "; 
    }

    $query=$query."GROUP BY A.SCN , YEAR(A.TimeStamp) , MONTH(A.TimeStamp), DAY(A.TimeStamp) "; 

    $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    $result=$handle->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($result);
  } 
  else if($timerange == "Hourly"){

    $query = "SELECT A.SCN, YEAR(A.TimeStamp) as Year, DATE_FORMAT(A.TimeStamp,'%b') as Month, DAY(A.TimeStamp) as Day, HOUR(A.TimeStamp) as Hour, COUNT(A.ID) as Total_FLow, ROUND(AVG(NULLIF(A.Speed ,0))) as Avg_Speed, ROUND(AVG(NULLIF(A.VehicleLength ,0))) as Avg_Length, MAX(A.Speed) as Max_Speed, MAX(A.VehicleLength) as Max_Length, ROUND(MIN(NULLIF(A.Speed, 0))) as Min_Speed, ROUND(MIN(NULLIF(A.VehicleLength, 0))) as Min_Length FROM tis_detector_dynamic_vbv A, tis_detector_class_config B WHERE A.ClassByAxle = B.binNumber AND A.TimeStamp >= '$from' AND A.TimeStamp <= '$to' " ;

    if($vClass != 'all'){
      $query=$query."AND B.binName = '$vClass' ";
    }
    if($direction != 'both'){
      $query=$query."AND A.TowardsToll = '$direction' ";
    }
    if($dayOfWeek != 'all'){
      $query=$query."AND DAYOFWEEK(A.TimeStamp) = '$dayOfWeek' ";
    }
    if($scn != 'All'){
      $query=$query."AND A.SCN = '$scn' "; 
    }

    $query=$query."GROUP BY A.SCN , YEAR(A.TimeStamp) , MONTH(A.TimeStamp), DAY(A.TimeStamp), HOUR(A.TimeStamp) "; 

    $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    $result=$handle->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($result); 
  }
  else if($timerange == "Raw_Data"){
    $query = "SELECT A.SCN, A.TowardsToll, A.Lane, C.errorName as ErrorLoop, A.Speed, A.VehicleLength, B.binName as Class, A.NumberOfAxle, A.TimeStamp FROM tis_detector_dynamic_vbv A, tis_detector_class_config B, tis_detector_error_config C WHERE A.ClassByAxle = B.binNumber AND A.errorCode = C.errorCode AND A.TimeStamp >= '$from' AND A.TimeStamp <= '$to' " ;

    if($vClass != 'all'){
      $query=$query."AND B.binName = '$vClass' ";
    }
    if($direction != 'both'){
      $query=$query."AND A.TowardsToll = '$direction' ";
    }
    if($dayOfWeek != 'all'){
      $query=$query."AND DAYOFWEEK(A.TimeStamp) = '$dayOfWeek' ";
    }
    if($scn != 'All'){
      $query=$query."AND A.SCN = '$scn' "; 
    }
    if($lane != 'all'){
      $query=$query."AND A.Lane = '$lane' "; 
    }
    if($error != 'all'){
      $query=$query."AND A.errorCode = '$error' "; 
    }

    //echo($from);
    //echo($to);


    //echo($query);

    $link = linkToTIS();
    $handle=$link->prepare($query);
    $handle->execute();
    $result=$handle->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($result); 
  }

?>