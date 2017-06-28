<?php
include 'dblinker.php';

try {	
		$site_id = $_POST["signalId"];
		$signalMode = $_POST["mode"];
		
		$link = linkToTIS();

		$handle3=$link->prepare("SELECT * FROM `utmc_traffic_signal_static` WHERE `SignalID`=:site_id"); 
		$handle3->bindParam(':site_id', $site_id);
		$handle3->execute();
		$result3=$handle3->fetch(PDO::FETCH_ASSOC);
		$signalId = $result3["SCN"];

		$link = linkToTIS();
		$handle=$link->prepare("SELECT * FROM `utmc_traffic_signal_dynamic` WHERE `SystemCodeNumber`=:signalId"); 
		$handle->bindParam(':signalId', $signalId);
		$handle->execute();
		$result=$handle->fetch(PDO::FETCH_ASSOC);
		
		if($signalMode == "automatic"){
			
			$column = $result["StartAuto"];
			$value = $result["ForceBidAuto"];

			$link2 = linkToUG405();
			$sql = "INSERT INTO `utcControlTable`(`id`, `site_id`, `utcControlTimeStamp`, `".$column."`) VALUES (1,".$site_id.",1,".$value.") ";
			$handle2 = $link2->prepare($sql);
			$handle2->execute();
			echo "automatic";
		}
        if($signalMode == "manual"){
			
			$column = $result["StartManual"];
			$value = $result["ForceBidMaunal"];

			$link2 = linkToUG405();
			$sql = "INSERT INTO `utcControlTable`(`id`, `site_id`, `utcControlTimeStamp`, `".$column."`) VALUES (1,".$site_id.",1,".$value.") ";
			$handle2 = $link2->prepare($sql);
			$handle2->execute();
		}
		if($signalMode == "scheduled"){
			
			$column = $result["StartScheduled"];
			$value = $result["ForceBidScheduled"];

			$link2 = linkToUG405();
			$sql = "INSERT INTO `utcControlTable`(`id`, `site_id`, `utcControlTimeStamp`, `".$column."`) VALUES (1,".$site_id.",1,".$value.") ";
			$handle2 = $link2->prepare($sql);
			$handle2->execute();
			sleep(2);
			$command = escapeshellcmd('python script.py');
			$output = shell_exec($command);
			echo $output;
		}

    }

catch(PDOException $e){
        echo "Error: " . $e->getMessage();
    }
	
$link = null;
$link2 = null;
?>
