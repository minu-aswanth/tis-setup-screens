<?php   
include 'dblinker.php';

try {
    $user= $_POST["username"];
    echo $user;
    $link = linkToTIS();
    $handle3=$link->prepare("INSERT INTO `user_login_logout`(`username`, `action`) VALUES ('$user','logout')");
    $handle3->execute();
}
catch(Exception $e){
        return "F";
}
session_start(); //to ensure you are using same session
session_destroy(); //destroy the session

?>