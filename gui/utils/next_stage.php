<?php
include 'dblinker.php';

try {	
		$site_id = $_POST["signalId"];
		
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
		
		$column = $result["NextStagePin"];
		$first_value = $result["ForceBidNextStagePin"];
		$second_value = 1-$first_value;

		$link2 = linkToUG405();
		$sql = "INSERT INTO `utcControlTable`(`id`, `site_id`, `utcControlTimeStamp`, `".$column."`) VALUES (1,".$site_id.",1,".$first_value.") ";
		$handle2 = $link2->prepare($sql);
		$handle2->execute();
		echo date('h:i:s');
		sleep(1);

		$link3 = linkToUG405();
		$sql = "INSERT INTO `utcControlTable`(`id`, `site_id`, `utcControlTimeStamp`, `".$column."`) VALUES (1,".$site_id.",1,".$second_value.") ";
		$handle3 = $link2->prepare($sql);
		$handle3->execute();
		echo date('h:i:s');

    }

catch(PDOException $e){
        echo "Error: " . $e->getMessage();
    }
?>
