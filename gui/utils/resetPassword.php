<?php
include 'dblinker.php';

function add_user(){
try {
    $id = $_POST['id'];
    $username = $_POST['username'];
    $email = $_POST['email'];
	$password = $_POST['password'];
    $hashpassword = $_POST['hashpassword'];
    
    $link = linkToTIS();
    
	$handle=$link->prepare("UPDATE `user_login` SET `password`='$hashpassword' WHERE `id`='$id'");
    $handle->execute();
    
    $mailSubject = "Password successfully reset for the user: ".$username." in HTMS.";
    $mailBody = "Hi ".$username.",<br><br>Your password to access HTMS has been successfully reset to ".$password."<br><br>";
    email($email,$mailSubject,$mailBody);
    
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
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = FROM_EMAIL_NAME;
        $mail->Password = FROM_EMAIL_PASSWORD;
        $mail->From = FROM_EMAIL_NAME;
//	$mail->From = "htms.gorakhpur@gmail.com";
        $mail->AddAddress($email,$email);
//        $mail->AddBCC(CLIENT_EMAIL);
//	$mail->AddBCC('parag.raipuria@itspe.co.in');
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
