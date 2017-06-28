<?php
include 'dblinker.php';

function get_alert() {
	try {
		$link = linkToTIS();

		$handle = $link->prepare("SELECT * FROM `nms_alerts`");
		$handle->execute();
		$result=$handle->fetchall(PDO::FETCH_ASSOC);
		foreach ($result[0] as &$key) {
			if($key=="1")$key=true;
			else $key=false;
		}
		return json_encode($result);
	}
	catch(Exception $e){
	        return $e;
	}
}

echo get_alert();



?>