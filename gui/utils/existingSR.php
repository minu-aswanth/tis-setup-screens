<?php
include 'dblinker.php';

function add_user(){
    try {

        $username = $_REQUEST['username'];
        
        $link = linkToTIS();

        $handle6=$link->prepare("SELECT A.`sr_number`,E.SystemCodeNumber,A.`module`,A.`subject`,A.`created_date`,A.`status`,E.online,E.LastUpdated FROM roles B, mapping_user C, user_login D, `tis_cctv_sr` A , tis_cctv_fault E JOIN (select SystemCodeNumber, MAX(LastUpdated) as LastUpdated from tis_cctv_fault GROUP BY SystemCodeNumber) t2 ON E.LastUpdated = t2.LastUpdated and E.SystemCodeNumber=t2.SystemCodeNumber WHERE D.user='$username' and D.id=C.user_id and C.role_id=B.id and B.modules=A.module and A.status='Open' and A.`device`=E.SystemCodeNumber order by E.LastUpdated Desc ");

        $handle6->execute();
        $result6=$handle6->fetchall(PDO::FETCH_ASSOC);

        return json_encode($result6);    
    }

    catch(Exception $e){
        return "F";
    }
}
echo add_user();
?>