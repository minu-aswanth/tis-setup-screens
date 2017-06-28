<?php
include 'dblinker.php';

function toogle_alert() {
	try {

		$vms = $_REQUEST['vms'];
		$meterological = $_REQUEST['meterological'];
		$cctv = $_REQUEST['cctv'];
		$detector = $_REQUEST['detector'];
		$ip = $_REQUEST['ip'];

		$link = linkToTIS();
		$handle = $link->prepare("UPDATE `nms_alerts` SET vms=$vms, meterological=$meterological, cctv=$cctv, detector=$detector, ip=$ip");
		//var_dump($handle);
		
		$handle->execute();
		return "success";
	}
	catch(Exception $e){
	        return $e;
	}
}

echo toogle_alert();



?>