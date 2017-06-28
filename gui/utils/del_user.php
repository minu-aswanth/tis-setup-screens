<?php
include 'dblinker.php';

function login(){
try {
	$id = $_POST['id'];
	$role = $_POST['role'];
	$module = $_POST['module'];
    $username = $_POST['username'];
    $email = $_POST['email'];

   	$link = linkToTIS();

   // echo("SELECT id from roles where role='$role' and modules='$module'");

    $handle_4=$link->prepare("SELECT id from roles where role='$role' and modules='$module'");
    $handle_4->execute();
    $result_4=$handle_4->fetch(PDO::FETCH_ASSOC);
    $role_id = (int) $result_4['id'];

    $handle=$link->prepare("DELETE FROM `mapping_user` WHERE user_id='$id' and role_id='$role_id'"); 
    $handle->execute();

    $mailSubject = "Role of: ".$role." has been removed for ".$module." module for the user ".$username." in HTMS.";
    $mailBody = "Hi ".$username.",<br><br>In HTMS, for you the role of: ".$role." has been removed for ".$module." module.";
    email($email,$mailSubject,$mailBody);
    
	return "success";
}

catch(Exception $e){
        return "F";
    }
}
echo login();



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
