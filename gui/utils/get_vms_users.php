
<?php
include 'dblinker.php';

function get_msgs(){
try {

	$link = linkToTIS();
    $handle=$link->prepare("SELECT DISTINCT user_id FROM `mapping_user`WHERE `role_id` =1 OR `role_id` =2 OR `role_id` =8"); 
    $handle->execute();
	$result=$handle->fetchall(PDO::FETCH_ASSOC);
	//print_r($result);
	$count = (int)count($result);
	$arr = array();
	for ($i=0; $i <$count ; $i++) { 
		$user_id = $result[$i]["user_id"];
		//echo $user_id;
		$handle1=$link->prepare("SELECT * FROM `user_login` WHERE `id` ='$user_id'"); 
    	$handle1->execute();
    	$result1=$handle1->fetchall(PDO::FETCH_ASSOC);
    	$arr[$i] = array("user"=>$result1[0]["user"],"email"=>$result1[0]["email"]);
	}
	return json_encode($arr);
}

catch(Exception $e){
        return "F";
    }
}
echo get_msgs();
?>