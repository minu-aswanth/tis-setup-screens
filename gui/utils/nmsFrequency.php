<?php

function fetch_devices(){
try {

	$val = $_POST['frequency'];

	exec("php ../../background/nms/nms.php ".$val);

	return "success";
    
}

catch(Exception $e){
        return "F";
    }
}
echo fetch_devices();
?>
