<?php
include 'dblinker.php';
include 'gPoint.php';

function xml_import(){
try {
	$target_file = "../uploads/" . basename($_FILES["fileToUpload"]["name"]);
	echo $target_file;
	$xml=simplexml_load_file($target_file) or die("Error: Cannot create object");
	$utm_coords = explode(",",(string)$xml->location[netOffset]);
	
	function leg_count($val,$xml_data){
		$count = 0;
		foreach($xml_data->edge as $edge){
			if((string)$edge["from"] == $val){
				$count=$count+1;
			}
		}
		return $count;
	}
	
	function offset($val,$xml_data){
		foreach($xml_data->tlLogic as $tl){
			if((string)$tl["id"] == $val){
				return $tl["offset"];
				break;
			}
		}
	}
	
	function connection($signal_id,$val,$xml_data,$signal_links_array){
		$links = array();
		foreach($xml_data->connection as $connection){
			if((string)$connection["tl"] == $val){
				$from = $connection["from"];
				$to = $connection["to"];
				$from = $val.str_replace($val,"",$from);
				
				$to_id = array_search($to,$signal_links_array);
				++$to_id;
				$from_id = array_search($from,$signal_links_array);
				++$from_id;
				
				if(in_array($to_id.$from_id, $links)){
					
				}else{
					echo $from_id."-".$to_id.",";
					array_push($links,$to_id.$from_id);
					$link = linkToTIS();
					$handle4=$link->prepare("INSERT INTO `utmc_signal_movements`(`signal_id`, `from_link`, `to_link`) VALUES (:signal_id,:from,:to)");
					$handle4->bindParam(':signal_id', $signal_id);
					$handle4->bindParam(':from', $from_id);
					$handle4->bindParam(':to', $to_id);
					$handle4->execute();
				}
				
			}
		}
	}

	function pedestrain_movements($signal_id,$val,$xml_data,$signal_links_array){
		foreach($xml_data->edge as $edge_cross){
			if (!empty($edge_cross["crossingEdges"])) {
				$edges = explode(" ", (string)$edge_cross["crossingEdges"]);
				foreach ($edges as $crossing_edge) {
					echo $crossing_edge;
					$edge_id = array_search($crossing_edge,$signal_links_array);
					if(isset($edge_id)){
						$edge_id++;
						$link = linkToTIS();
						$handle5=$link->prepare("INSERT INTO `utmc_signal_movements`(`signal_id`, `from_link`, `to_link`, `is_pedestrain`, `is_vehicle`) VALUES (:signal_id,:from,:to,1,0)");
						$handle5->bindParam(':signal_id', $signal_id);
						$handle5->bindParam(':from', $edge_id);
						$handle5->bindParam(':to', $edge_id);
						$handle5->execute();
					}	
				}
			}
		}
	}


	
	function links($signal_id,$scn,$xml_data){
		$count = 0;
		$signal_links_array = array();
		foreach($xml_data->edge as $edge){

			if((string)$edge["from"] == $scn){
				$count=$count+1;
				array_push($signal_links_array,(string)$edge["id"]);
				$link = linkToTIS();
				$handle2=$link->prepare("INSERT INTO `utmc_traffic_signal_static_links`(`LinkOrder`, `SignalID`) VALUES (:linkorder, :signalid)");
				$handle2->bindParam(':linkorder', $count);
				$handle2->bindParam(':signalid', $signal_id);
				$handle2->execute();
			}
		}
		print_r($signal_links_array);
		return $signal_links_array;
	}
	
	
	
	$valcount = 0;
	foreach($xml->junction as $tl){
		
		if((string)$tl["type"]=="traffic_light"){
			$scn = $tl["id"];
			$no_of_legs = leg_count($scn,$xml);
			$offset = offset($scn,$xml);
			$point = new gPoint();
			$easting = (int)$tl["x"]-(int)$utm_coords[0];
			$northing = (int)$tl["y"]-(int)$utm_coords[1];
			// echo $easting.",".$northing;
			// echo $easting.",";
			$point->setUTM((int)$easting,(int)$northing,"44Q");
			// $point->setLongLat(78.471997,17.408569);
			$point->convertTMtoLL();
			// $point->convertLLtoTM();
			// echo $valcount++.",";
			// echo $point->Z().",";
			// echo $point->E().",";
			// echo $point->N().",";
			// echo $point->Lat().",";
			// echo $point->Long().",";
			// echo $scn.",".$no_of_legs.";\n";
			
			$link = linkToTIS();
			$handle=$link->prepare("INSERT INTO `utmc_traffic_signal_static`(`SCN`, `Latitude`, `Longitude`, `NumLinks`, `SignalOffset`) VALUES (:SCN, :latitude, :longitude, :numlinks, :offset)");
			$handle->bindParam(':SCN', $scn);
			$handle->bindParam(':latitude', $point->Lat());
			$handle->bindParam(':longitude', $point->Long());
			$handle->bindParam(':numlinks', $no_of_legs);
			$handle->bindParam(':offset', $offset);
			$handle->execute();
			
			$handle3=$link->prepare("SELECT * FROM `utmc_traffic_signal_static` WHERE `SCN` = :SCN"); 
			$handle3->bindParam(':SCN', $scn);
			$handle3->execute();
			$result=$handle3->fetch(PDO::FETCH_ASSOC);
			$signal_id=$result["SignalID"];
			$signal_links_array = links($signal_id,$scn,$xml);
			
			pedestrain_movements($signal_id,$scn,$xml,$signal_links_array);
			connection($signal_id,$scn,$xml,$signal_links_array);
			
		}
	}
	
	header('Location: ' . $_SERVER['HTTP_REFERER']);
	// foreach($xml->edge as $edge){
		// echo $edge["from"];
	// }
	
}

catch(Exception $e){
        return "F";
    }
}
echo xml_import();
?>