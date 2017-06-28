<?php
include 'dblinker.php';

function login(){
try {
	$profileID = $_POST['profileID'];
	$scn = $_POST['scn'];
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
	$RoadTempLb = $_POST['RoadTempLb'];
	$RoadTempUb = $_POST['RoadTempUb'];
	$RoadTempPr = $_POST['RoadTempPr'];
	$VisibilityDistLb = $_POST['VisibilityDistLb'];
	$VisibilityDistUb = $_POST['VisibilityDistUb'];
	$VisibilityDistPr = $_POST['VisibilityDistPr'];
	$PrecipitationLb = $_POST['PrecipitationLb'];
	$PrecipitationUb = $_POST['PrecipitationUb'];
	$PrecipitationPr = $_POST['PrecipitationPr'];
	$AirTempLb = $_POST['AirTempLb'];
	$AirTempUb = $_POST['AirTempUb'];
	$AirTempPr = $_POST['AirTempPr'];
	$WindSpeedLb = $_POST['WindSpeedLb'];
	$WindSpeedUb = $_POST['WindSpeedUb'];
	$WindSpeedPr = $_POST['WindSpeedPr'];


	$link = linkToTIS();
    $handle=$link->prepare("UPDATE `utmc_meteorological_profile_data` SET `ShortDescription`='$shortDescription',`LongDescription`='$longDescription',`SystemCodeNumber`='$scn',`RoadTempLb`='$RoadTempLb',`RoadTempPr`='$RoadTempPr',`RoadTempUb`='$RoadTempUb',`VisibilityDistLb`='$VisibilityDistLb',`VisibilityDistPr`='$VisibilityDistPr',`VisibilityDistUb`='$VisibilityDistUb',`HumidityLb`='$PrecipitationLb',`HumidityPr`='$PrecipitationPr',`HumidityUb`='$PrecipitationUb',`AirTempLb`='$AirTempLb',`AirTempPr`='$AirTempPr',`AirTempUb`='$AirTempUb',`WindSpeedLb`='$WindSpeedLb',`WindSpeedPr`='$WindSpeedPr',`WindSpeedUb`='$WindSpeedUb',`FromTimeSun`='$sun_from',`ToTimeSun`='$sun_to',`FromTimeMon`='$mon_from',`ToTimeMon`='$mon_to',`FromTimeTue`='$tue_from',`ToTimeTue`='$tue_to',`FromTimeWed`='$wed_from',`ToTimeWed`='$wed_to',`FromTimeThu`='$thu_from',`ToTimeThu`='$thu_from',`FromTimeFri`='$fri_from',`ToTimeFri`='$fri_to',`FromTimeSat`='$sat_from',`ToTimeSat`='$sat_to' WHERE `ProfileId`='$profileID'"); 
    $handle->execute();
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo login();
?>