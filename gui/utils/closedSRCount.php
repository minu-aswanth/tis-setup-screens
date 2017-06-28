<?php
include 'dblinker.php';

function add_user(){
    try {

        $username = trim($_REQUEST['username']);
        
        $link = linkToTIS();

        $handle6=$link->prepare("SELECT COUNT(A.`sr_number`) FROM roles B, mapping_user C, user_login D, `tis_maintenance_sr` A WHERE D.user='$username' and D.id=C.user_id and C.role_id=B.id and B.modules=A.module and A.status='Closed' ");

        $handle6->execute();
        $result6=$handle6->fetch(PDO::FETCH_ASSOC);
        return (int)$result6['COUNT(A.`sr_number`)'];
    }

    catch(Exception $e){
        return "F";
    }
}
echo add_user();
?>