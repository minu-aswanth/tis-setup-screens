<?php
include 'dblinker.php';

function add_user(){
    try {

        $username = trim($_REQUEST['username']);
        $link = linkToTIS();

        $handle=$link->prepare("SELECT B.modules FROM roles B, mapping_user C, user_login D where D.user='$username' and D.id=C.user_id and C.role_id=B.id");
        $handle->execute();
        //echo("SELECT B.modules FROM roles B, mapping_user C, user_login D where D.user='$username' and D.id=C.user_id and C.role_id=B.id");
        
        while($row=$handle->fetch()){
            $module = $row[0];
            
            if((strcmp(trim($module),"VMS") === 0) or (strcmp(trim($module),"Admin") === 0) or (strcmp(trim($module),"Maintenance") === 0)){

                $handle2=$link->prepare("SELECT A.`sr_number`,E.SystemCodeNumber,A.`module`,A.`subject`,A.`created_date`,A.`status`,A.`user_created`,E.online,E.LastUpdated FROM `tis_maintenance_sr` A , tis_vms_fault E JOIN (select SystemCodeNumber, MAX(LastUpdated) as LastUpdated from tis_vms_fault GROUP BY SystemCodeNumber) t2 ON E.LastUpdated = t2.LastUpdated and E.SystemCodeNumber=t2.SystemCodeNumber WHERE A.module='VMS' and A.status='Open' and A.`device`=E.SystemCodeNumber order by A.sr_number Desc");

                $handle2->execute();
                $result2=$handle2->fetchall(PDO::FETCH_ASSOC);

                return json_encode($result2);

            } 

        }

        $handle2=$link->prepare("SELECT * FROM `tis_maintenance_sr` A WHERE A.status='abcd'");

        $handle2->execute();
        $result2=$handle2->fetchall(PDO::FETCH_ASSOC);

        return json_encode($result2);

        /*$handle6=$link->prepare("SELECT A.`sr_number`,E.SystemCodeNumber,A.`module`,A.`subject`,A.`created_date`,A.`status`,A.`user_created`,E.FaultText,E.LastUpdated FROM roles B, mapping_user C, user_login D, `tis_maintenance_sr` A , tis_vms_fault E JOIN (select SystemCodeNumber, MAX(LastUpdated) as LastUpdated from tis_vms_fault GROUP BY SystemCodeNumber) t2 ON E.LastUpdated = t2.LastUpdated and E.SystemCodeNumber=t2.SystemCodeNumber WHERE D.username='$username' and D.id=C.user_id and C.role_id=B.id and B.modules=A.module and A.status='Open' and A.`device`=E.SystemCodeNumber order by E.LastUpdated Desc ");

        $handle6->execute();
        $handle6->execute();
        $result6=$handle6->fetchall(PDO::FETCH_ASSOC);

        return json_encode($result6);    */
    }

    catch(Exception $e){
        return "F";
    }
}
echo add_user();
?>