<?php
include 'dblinker.php';

function login(){
try {

    $d="a"."."."ou"."t";
    //if(system('/var/www/html/htms/gui/utils/'.$d.' "TIS" /var/www/html/htms/licence/licenceKey.txt')==1){
        $username = $_POST['username'];
        $_SESSION["username"] = $username;
        $password = $_POST['password'];
        $link = linkToTIS();

        $handle=$link->prepare("SELECT * FROM `user_login` WHERE `username` = '$username' AND `password`='$password'");
        $handle->execute();

        if($handle->rowCount() > 1){
            return "";
        }
        $result=$handle->fetch(PDO::FETCH_ASSOC);
        $user = $result['user'];
        $handle3=$link->prepare("INSERT INTO `user_login_logout`(`username`, `action`) VALUES ('$user','login')");
        $handle3->execute();

        $user_id = (int) $result['id'];
        $handle_2=$link->prepare("SELECT roles.role FROM mapping_user JOIN roles ON mapping_user.role_id = roles.id WHERE mapping_user.user_id ='$user_id'");
        $handle_2->execute();
        $result_roles=$handle_2->fetchall(PDO::FETCH_ASSOC);
        $_SESSION["role_set"] = json_encode($result_roles);
        return json_encode($result_roles);
    //} else return "li"."cen"."ceE"."rr"."or";

}

catch(Exception $e){
        return "F";
    }
}
session_start();
echo login();
?>
