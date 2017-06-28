<?php
include 'dblinker.php';

function add_user(){
try {
    $oldPassword = $_POST['oldPassword'];
    $newPassword = $_POST['newPassword'];
    $username = trim($_POST['username']);
	
    $link = linkToTIS();

    echo("SELECT password from `user_login` WHERE `user`='$username'");

    $handle2=$link->prepare("SELECT password from `user_login` WHERE `user`='$username'");
    $handle2->execute();
    $result2=$handle2->fetch(PDO::FETCH_ASSOC);

    if (strcmp($result2['password'],$oldPassword) === 0){

        $handle=$link->prepare("UPDATE `user_login` SET `password`='$newPassword' WHERE `user`='$username' and `password`='$oldPassword'");
        $handle->execute();
        
        return "success";    

    } else{
        
        return "incorrectPassword";

    }
    

}

    catch(Exception $e){
        return "F";
    }
}
echo add_user();

?>