<?php
include 'dblinker.php';

function login(){
try {
	$ruleID = $_POST['ruleID'];
	
	$link = linkToTIS();
    
    $handle=$link->prepare("DELETE FROM `rules` WHERE `RuleID`='$ruleID'"); 
    $handle->execute();
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo login();
?>
