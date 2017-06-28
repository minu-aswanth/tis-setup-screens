<?php
include 'dblinker.php';

function fetch_rules(){
try {

	$link = linkToTIS();
    $handle=$link->prepare("SELECT RuleID as RuleID, Title as ShortDesc, LongDescription as LongDesc FROM `rules` order by RuleID DESC"); 
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
