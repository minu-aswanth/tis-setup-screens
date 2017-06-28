<?php
include 'dblinker.php';

try {	
		$signalId = $_POST["signalId"];
		
		$link = linkToTIS();
		$handle=$link->prepare("SELECT * FROM `tis_signal_mode_change_log` WHERE `signalId`=:signalId ORDER BY Timestamp DESC"); 
		$handle->bindParam(':signalId', $signalId);
		$handle->execute();
		$result=$handle->fetch(PDO::FETCH_ASSOC);
        $mode = $result['newMode'];
		
		if($mode == ""){
			$link2 = linkToTIS();
			$handle2 = $link2->prepare("INSERT INTO tis_signal_mode_change_log (signalId,user,previousMode,newMode) VALUES (:signalId,'','','automatic') ");
			$handle2->bindParam(':signalId', $signalId);
			$handle2->execute();
			$mode = "automatic";
		}
        
		if($mode=="scheduled"){
			echo 1;
		}elseif($mode=="automatic"){
			echo 2;
		}else{
			echo 3;
		}
    }

catch(PDOException $e){
        echo "F";
    }
	
$link = null;
$link2 = null;
?>
