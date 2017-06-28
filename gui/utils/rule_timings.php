<?php
include 'dblinker.php';

function fetch_rules(){
try {
	$ruleID = $_POST['ruleID'];

	$link = linkToTIS();
    $handle=$link->prepare("SELECT * FROM `rules` WHERE `RuleID`='$ruleID'"); 
    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo fetch_rules();
?>
