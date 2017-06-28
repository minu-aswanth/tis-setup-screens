<?php

function get_roles(){
try {
	return $_SESSION["role_set"];
    }

catch(Exception $e){
        return "F";
    }
}
session_start();
echo get_roles();
?>
