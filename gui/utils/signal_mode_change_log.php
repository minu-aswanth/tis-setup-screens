<?php
include 'dblinker.php';

try {	
		session_start();
		$username = $_SESSION["username"];
		$signalId = $_POST["signalId"];
		$newMode = $_POST["mode"];
		
		$link = linkToTIS();
		$handle=$link->prepare("SELECT * FROM `tis_signal_mode_change_log` WHERE `signalId`=:signalId ORDER BY Timestamp DESC"); 
		$handle->bindParam(':signalId', $signalId);
		$handle->execute();
		$result=$handle->fetch(PDO::FETCH_ASSOC);
        $prevMode = $result['newMode'];
        
		if($newMode!=$prevMode){
		$link2 = linkToTIS();
		$handle2 = $link2->prepare("INSERT INTO tis_signal_mode_change_log (signalId,user,previousMode,newMode) VALUES (:signalId,:user,:previousMode,:newMode) ");
		$handle2->bindParam(':signalId', $signalId);
		$handle2->bindParam(':user', $username);
		$handle2->bindParam(':previousMode', $prevMode);
		$handle2->bindParam(':newMode', $newMode);
		$handle2->execute();
		}
		echo "success";
    }

catch(PDOException $e){
        echo "F";
    }
	
$link = null;
$link2 = null;
?>
