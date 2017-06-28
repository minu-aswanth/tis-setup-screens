<?php
include 'dblinker.php';

function login(){
try {
	$ruleID = $_POST['ruleID'];
	
	$link = linkToTIS();
    
    $handle=$link->prepare("SELECT * FROM `rules` where `RuleID`='$ruleID'"); 
    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	return json_encode($result);
}

catch(Exception $e){
        return "F";
    }
}
echo login();
?>
