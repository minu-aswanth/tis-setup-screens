<?php
include 'dblinker.php';

function get_accidents_types(){
	try {
		$link = linkToTIS();
		$type_input = (string)$_POST['type'];
		$table = "utmc_".$type_input."_types";
		//echo $table;
	    $handle=$link->prepare("SELECT * FROM `$table`");
	    $handle->execute();
		$result=$handle->fetchall(PDO::FETCH_ASSOC);
		return json_encode($result);
	}
	catch(Exception $e){
        return $e;
    }
}
echo get_accidents_types();
?>