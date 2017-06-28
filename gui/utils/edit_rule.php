<?php
include 'dblinker.php';

function login(){
try {
	$ruleID = $_POST['ruleID'];
	$shortDescription = $_POST['shortDescription'];
	$longDescription = $_POST['longDescription'];
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

	echo("UPDATE `rules` SET `Title`='$shortDescription',`LongDescription`='$longDescription',`LastUpdated`=now(),`FromTimeSun`='$sun_from',`ToTimeSun`='$sun_to',`FromTimeMon`='$mon_from',`ToTimeMon`='$mon_to',`FromTimeTue`='$tue_from',`ToTimeTue`='$tue_to',`FromTimeWed`='$wed_from',`ToTimeWed`='$wed_to',`FromTimeThu`='$thu_from',`ToTimeThu`='$thu_to',`FromTimeFri`='$fri_from',`ToTimeFri`='$fri_to',`FromTimeSat`='$sat_from',`ToTimeSat`='$sat_to' WHERE `RuleID`='$ruleID'");

	$handle=$link->prepare("UPDATE `rules` SET `Title`='$shortDescription',`LongDescription`='$longDescription',`LastUpdated`=now(),`FromTimeSun`='$sun_from',`ToTimeSun`='$sun_to',`FromTimeMon`='$mon_from',`ToTimeMon`='$mon_to',`FromTimeTue`='$tue_from',`ToTimeTue`='$tue_to',`FromTimeWed`='$wed_from',`ToTimeWed`='$wed_to',`FromTimeThu`='$thu_from',`ToTimeThu`='$thu_to',`FromTimeFri`='$fri_from',`ToTimeFri`='$fri_to',`FromTimeSat`='$sat_from',`ToTimeSat`='$sat_to' WHERE `RuleID`='$ruleID'"); 
    $handle->execute();
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo login();
?>
