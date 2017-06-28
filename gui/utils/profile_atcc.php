<?php
include 'dblinker.php';

function fetch_devices(){
try {

	$profileID = $_POST['profileID'];
	
	$link = linkToTIS();

	if($profileID == ""){
		$handle=$link->prepare("SELECT * FROM `utmc_detector_profile_data` order by `ProfileId` DESC");
		//echo ("SELECT * FROM `utmc_meteorological_profile_data`");
    	$handle->execute();
		$result=$handle->fetchall(PDO::FETCH_ASSOC);
		return json_encode($result);	
	} else{
		$handle=$link->prepare("SELECT * FROM `utmc_detector_profile_data` where `ProfileId`='$profileID'"); 
		//echo ("SELECT * FROM `utmc_meteorological_profile_data` where `ProfileId`='$profileID'");
    	$handle->execute();
		$result=$handle->fetchall(PDO::FETCH_ASSOC);
		return json_encode($result);	
	}

    
}

catch(Exception $e){
        return "F";
    }
}
echo fetch_devices();
?>
