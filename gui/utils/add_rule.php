<?php
include 'dblinker.php';

function add_rule(){
try {
    $short_descrip = $_POST['shortDescription'];
	$long_descrip = $_POST['longDescription'];
	$sun_from = $_POST['sun_from'];
	$sun_to = $_POST['sun_to'];
	$mon_from = $_POST['mon_from'];
	$mon_to = $_POST['mon_to'];
	$tue_from = $_POST['tue_from'];
	$tue_to = $_POST['tue_to'];
	$wed_from = $_POST['wed_from'];
	$wed_to = $_POST['wed_to'];
	$thu_from = $_POST['thu_from'];
	$thu_to = $_POST['thu_to'];
	$fri_from = $_POST['fri_from'];
	$fri_to = $_POST['fri_to'];
	$sat_from = $_POST['sat_from'];
	$sat_to = $_POST['sat_to'];

	$link = linkToTIS();

	$handle=$link->prepare("INSERT INTO `rules`(`Title`, `LongDescription`, `LastUpdated`, `FromTimeSun`, `ToTimeSun`, `FromTimeMon`, `ToTimeMon`, `FromTimeTue`, `ToTimeTue`, `FromTimeWed`, `ToTimeWed`, `FromTimeThu`, `ToTimeThu`, `FromTimeFri`, `ToTimeFri`, `FromTimeSat`, `ToTimeSat`) VALUES ('$short_descrip','$long_descrip',now(),'$sun_from','$sun_to','$mon_from','$mon_to','$tue_from','$tue_to','$wed_from','$wed_to','$thu_from','$thu_to','$fri_from','$fri_to','$sat_from','$sat_to')");
	$handle->execute();

	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo add_rule();
?>