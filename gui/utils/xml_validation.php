<?php
include 'dblinker.php';

function xml_import_validate(){
try {
	function validate($target_file){
		$xml=simplexml_load_file($target_file) or die("Error: Cannot create object");
		
		$valid = 0;
		
		if(!array_key_exists('junction', $xml)){
			$valid = 1;
		}
		
		if(!array_key_exists('tlLogic', $xml)){
			$valid = 1;
		}
		
		if(!array_key_exists('edge', $xml)){
			$valid = 1;
		}
		
		if(!array_key_exists('connection', $xml)){
			$valid = 1;
		}
		
		if($valid == 0){
			return "valid";

		}else{
			return "not valid";
		}
	}
	
	$target_dir = "../uploads/";
	
	$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
	$uploadOk = 1;
	$file_type = pathinfo($target_file,PATHINFO_EXTENSION);
	
	if($file_type == "xml") {
		$uploadOk = 1;
	} else {
		$uploadOk = 0;
	}
	
	
	if ($uploadOk == 0) {
		echo "Sorry, your file was not uploaded. File is not a xml file";
	// if everything is ok, try to upload file
	} else {
		if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
			echo validate($target_file);
			
		} else {
			echo "Sorry, there was an error uploading your file.";
		}
	}
}

catch(Exception $e){
        return "F";
    }
}
echo xml_import_validate();
?>