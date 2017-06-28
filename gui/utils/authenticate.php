<?php
include 'dblinker.php';

function get_roles(){
try {
        $a="a"."."."o"."u"."t";
        //if(exec('/var/www/html/htms/gui/utils/'.$a.' "TIS" /var/www/html/htms/licence/licenceKey.txt')=="1"){

                $roles = json_decode($_SESSION["role_set"]);

                if($roles === NULL) return "loginRequired";

                $page = $_POST['page'];
                
                $role_arr=null;
                foreach ($roles as $role ) {
                        foreach ($role as $val ) {
                                $role_arr = $role_arr."'".$val."',";
                        }
                }

                $role_arr = substr($role_arr, 0, -1);

                $link = linkToTIS();
				$handle=$link->prepare("SELECT `$page` as PAGE FROM `htms_authentication` where Role IN ($role_arr)");
				$handle->execute();
                $result=$handle->fetchall(PDO::FETCH_ASSOC);

                return json_encode($result);

        //} else return "l"."ice"."nce"."Er"."ror";

    }

catch(Exception $e){
        return "F";
    }
}
session_start();
echo get_roles();
?>