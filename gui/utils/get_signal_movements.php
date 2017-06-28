<?php
include 'dblinker.php';

function get_movements(){
	try{
		$signal_id = $_POST['signal_id'];
		$link_id = $_POST["link_id"];
		if(empty($link_id)){
			$link = linkToTIS();
			$handle=$link->prepare("SELECT * FROM `utmc_signal_movements` WHERE `signal_id`=:signal_id");
			$handle->bindParam(':signal_id', $signal_id);
			$handle->execute();
		}else{
			$link = linkToTIS();
			$handle=$link->prepare("SELECT * FROM `utmc_signal_movements` WHERE `id`=:link_id");
			$handle->bindParam(':link_id', $link_id);
			$handle->execute();
		}
		$result=$handle->fetchall(PDO::FETCH_ASSOC);
		return json_encode($result);
	}
	catch(Exception $e){
	    return "F";
	}
}
session_start();
echo get_movements();
?>
