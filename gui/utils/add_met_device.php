<?php
include 'dblinker.php';

function add_met_device(){
try {
    $scn = $_POST['scn'];
	$short_descrip = $_POST['shortDescription'];
	//$long_descrip = $_POST['longDescription'];
	//$ds_type_id = $_POST['dataSourceTypeID'];
	$northing = $_POST['latitude'];
	$easting = $_POST['longitude'];
	$deletion_date = $_POST['deletionDate'];
	$ip = $_POST['ipAddress'];
	$port = $_POST['port'];
	$place= $_POST['place'];
	//$del_date = $_POST['deletionDate'];
	//$qs_id = $_POST['qualityStatementID'];
	
	$link = linkToTIS();
	$active = 1;
	$handle=$link->prepare("INSERT INTO `utmc_meteorological_static` (`SystemCodeNumber`, `ShortDescription`, `Northing`, `Easting`, `IPAddress`, `Port`, `Place`, `Active`,`CreationDate`) VALUES ('$scn', '$short_descrip', '$northing', '$easting', '$ip', '$port', '$place', '$active',now())");
	$handle->execute();
	
	$handle2=$link->prepare("INSERT INTO `tis_meteorological_fault`(`SystemCodeNumber`, `LastUpdated`, `online`, `time`) VALUES ('$scn',now(),1,0)");
	$handle2->execute();
	
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo add_met_device();
?>