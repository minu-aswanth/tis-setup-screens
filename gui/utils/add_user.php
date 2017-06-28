<?php
include 'dblinker.php';

function add_user(){
try {
    $username = $_POST['username'];
    $user = $_POST['user'];
	$role = $_POST['role'];
	$email = $_POST['email'];
    $module = $_POST['module'];
    $password = $_POST['password'];
    $hashpassword = $_POST['hashpassword'];

    $moduleArray = explode(',', $module);

    $link = linkToTIS();

    $handle_2=$link->prepare("SELECT id as ID from user_login where username='$username'");
    $handle_2->execute();
    $result_2=$handle_2->fetch(PDO::FETCH_ASSOC);
    $user_id = (int) $result_2['ID'];
    $newUserFlag=false;
    
    if($user_id == 0) {

        $handle=$link->prepare("INSERT INTO `user_login`(`username`,`password`,`email`,`created`,`user`) VALUES ('$username','$hashpassword','$email',now(),'$user')");
	    $handle->execute();

        $newUserFlag=true;

        $handle_5=$link->prepare("SELECT id as ID from user_login where username='$username'");
        $handle_5->execute();
        $result_5=$handle_5->fetch(PDO::FETCH_ASSOC);
        $user_id = (int) $result_5['ID'];

    }
	
    foreach($moduleArray as $mod){
        
        $dbrole = $role.$mod;

//        echo("SELECT id as ID from roles where role='$dbrole' and modules='$mod'");

        $handle_4=$link->prepare("SELECT id as ID from roles where role='$dbrole' and modules='$mod'");
        $handle_4->execute();
        $result_4=$handle_4->fetch(PDO::FETCH_ASSOC);
        $role_id = (int) $result_4['ID'];
        
        $handle_3=$link->prepare("INSERT INTO `mapping_user`(`user_id`, `role_id`) VALUES ('$user_id','$role_id')");
        $handle_3->execute();

    }

    if($newUserFlag){
        $mailSubject = "New Login ID: ".$username." has been created in HTMS.";
        $mailBody = "Hi ".$user.",<br><br>Your username to access HTMS is ".$username."<br>Your password to access HTMS is ".$password."<br><br>You can access ".$module." modules with ".$role." role in HTMS.";
        email($email,$mailSubject,$mailBody);
    } else{
        $mailSubject = "New role has been added to ".$username." in HTMS.";
        $mailBody = "Hi ".$user.",<br><br>New role of ".$role." for ".$module." has been assigned to you in HTMS.<br>";
        email($email,$mailSubject,$mailBody);
    }

    return "success";

    
}

    catch(Exception $e){
        return "F";
    }
}
echo add_user();


function email($email,$mailSubject,$mailBody){

    try{

        require("../libraries/phpMailer/PHPMailerAutoload.php");
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;
		$mail->Username = FROM_EMAIL_NAME;
        $mail->Password = FROM_EMAIL_PASSWORD;
        $mail->From = FROM_EMAIL_NAME;
        $mail->AddAddress($email,$email);
        $mail->AddBCC(CLIENT_EMAIL);
        $mail->AddBCC(DEVELOPER_EMAIL_NAME);
        $mail->WordWrap = 50;
        $mail->IsHTML(true);
        $mail->Subject = $mailSubject;
        $mail->Body = $mailBody;
        $mail->AltBody = "";
        if(!$mail->Send())
        {
           echo "Message could not be sent. <p>";
           echo "Mailer Error: " . $mail->ErrorInfo;
           exit;
        }
        echo "Message has been sent";
    }

    catch(Exception $e){
            return "F";
    }
}

?>