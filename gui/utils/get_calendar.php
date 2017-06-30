<?php
include 'dblinker.php';

function get_calendar(){
try {
	$group_scn = $_POST['group_scn'];
	
    $link = linkToTIS();
    $handle=$link->prepare("SELECT DISTINCT Date,TimeTable_SCN FROM `calendar` WHERE `Group_SCN` = :group_scn ");
    $handle->bindParam(':group_scn', $group_scn);
    $handle->execute();

    $result = array();
    while ($row = $handle->fetch(PDO::FETCH_ASSOC)){
        $handle2 = $link->prepare("SELECT calendar. * , time_tables.StartTime, time_tables.EndTime FROM calendar INNER JOIN time_tables ON (calendar.TimeTable_SCN = time_tables.TimeTableSCN AND calendar.Slot_Order = time_tables.SlotOrder) AND (calendar.Date = :date_day AND calendar.Group_SCN = :group_scn)"); 
        $handle2->bindParam(':date_day', $row["Date"]);
        $handle2->bindParam(':group_scn', $group_scn);
        $handle2->execute();

        $day_object = array("day"=>$row["Date"],"timetable_scn"=>$row["TimeTable_SCN"],"plan_info"=>$handle2->fetchall(PDO::FETCH_ASSOC));
        array_push($result, $day_object);
    }

    return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo get_calendar();
?>