<?php
include 'dblinker.php';

function fetch_devices(){
try {
    $ruleID = $_POST['ruleID'];
	
	$link = linkToTIS();

	$handle=$link->prepare("SELECT * FROM `re_rules` where `RuleId`='$ruleID' order by DummyId DESC");
	$handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo fetch_devices();
?>