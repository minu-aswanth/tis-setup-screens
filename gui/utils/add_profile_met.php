<?php
include 'dblinker.php';

function add_vms_device(){
try {
    
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

	$handle=$link->prepare("INSERT INTO `utmc_meteorological_profile_data`(`ShortDescription`, `LongDescription`, `SystemCodeNumber`, `RoadTempLb`, `RoadTempPr`, `RoadTempUb`, `VisibilityDistLb`, `VisibilityDistPr`, `VisibilityDistUb`, `HumidityLb`, `HumidityPr`, `HumidityUb`, `AirTempLb`, `AirTempPr`, `AirTempUb`, `WindSpeedLb`, `WindSpeedPr`, `WindSpeedUb`, `FromTimeSun`, `ToTimeSun`, `FromTimeMon`, `ToTimeMon`, `FromTimeTue`, `ToTimeTue`, `FromTimeWed`, `ToTimeWed`, `FromTimeThu`, `ToTimeThu`, `FromTimeFri`, `ToTimeFri`, `FromTimeSat`, `ToTimeSat`) VALUES ('$shortDescription','$longDescription','$scn','$RoadTempLb','$RoadTempPr','$RoadTempUb','$VisibilityDistLb','$VisibilityDistPr','$VisibilityDistUb','$PrecipitationLb','$PrecipitationPr','$PrecipitationUb','$AirTempLb','$AirTempPr','$AirTempUb','$WindSpeedLb','$WindSpeedPr','$WindSpeedUb','$sun_from','$sun_to','$mon_from','$mon_to','$tue_from','$tue_to','$wed_from','$wed_to','$thu_from','$thu_to','$fri_from','$fri_to','$sat_from','$sat_to')");
	$handle->execute();
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo add_vms_device();
?>