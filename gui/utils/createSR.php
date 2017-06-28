<?php
include 'dblinker.php';

function add_user(){
try {
    $module = $_POST['module'];
    $device = $_POST['device'];
    $subject = $_POST['subject'];
    $details = $_POST['details'];
    $username = $_POST['username'];
	
    $link = linkToTIS();

    $handle2=$link->prepare("SELECT MAX(ID) from `tis_maintenance_sr`");
    $handle2->execute();
    $result2=$handle2->fetch(PDO::FETCH_ASSOC);

    $appendString='0';
    $sr_number = $result2['MAX(ID)'] + 1;

    if($sr_number > 0){
        $appendString = '0000000';
        if($sr_number>9){
            $appendString = '000000';
            if($sr_number>99){
                $appendString = '00000';
                if($sr_number>999){
                    $appendString = '0000';
                    if($sr_number>9999){
                        $appendString = '000';
                        if($sr_number>99999){
                            $appendString = '00';
                            if($sr_number>999999){
                                $appendString='0';
                                if($sr_number>9999999){
                                    $appendString='';
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    $sr = 'SR'.$appendString.$sr_number;    

    $handle=$link->prepare("INSERT INTO `tis_maintenance_sr`(`sr_number`, `module`, `device`, `subject`, `details`, `user_created`, `created_date`, `status`) VALUES ('$sr','$module','$device','$subject','$details','$username',now(),'Open')");
    $handle->execute();

    $t=time();
    date_default_timezone_set('Asia/Kolkata');
    
    $mailSubject = $sr.": New Service Request has been created in HTMS for the device ".$device;
    $mailBody = "Hi,<br><br>New Service Request has been created with below details:<br><br><table border='1'><tr><td>SR Number</td><td>".$sr."</td></tr><tr><td>Module</td><td>".$module."</td></tr><tr><td>Device</td><td>".$device."</td></tr><tr><td>Created by</td><td>".$username."</td></tr><tr><td>Subject</td><td>".$subject."</td></tr><tr><td>Details</td><td>".$details."</td></tr><tr><td>Time Stamp</td><td>".date("d-m-Y H:i:s",$t)."</td></tr></table><br><br>";
    
    $mailAddresses = null;
    $count=0;

    $handle3=$link->prepare("select A.email from user_login A, roles B, mapping_user C where A.id=C.user_id and C.role_id=B.id and B.modules='$module'");
    $handle3->execute();
    
    while($row = $handle3->fetch()){
        if($count != 0){
            $mailAddresses = $mailAddresses.", ";
        }
        $mailAddresses = $mailAddresses.$row[0];
        $count++;
    }

    $handle4=$link->prepare("SELECT `email` FROM `user_login` WHERE `user`='$username'");
    $handle4->execute();
    $result4=$handle4->fetch(PDO::FETCH_ASSOC);
    $creatorMail = $result4['email'];
    
    email($mailAddresses,$mailSubject,$mailBody,$creatorMail);
    
    return "$sr";    
}

catch(Exception $e){
    return "F";
}
}
echo add_user();

function email($email,$mailSubject,$mailBody,$sender){

    try{
        require("../libraries/phpMailer/PHPMailerAutoload.php");
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = "htms.root@gmail.com";
        $mail->Password = "htmsroot";
        $mail->From = "htms.root@gmail.com";
        $to_array = explode(',', $email);
        foreach($to_array as $address)
        {
            $mail->addAddress($address);
        }
        $mail->AddCC($sender);
        //$mail->AddBCC("hemanshu.khatri@masstrans.in");
        //$mail->AddBCC("parag.raipuria@itspe.co.in");
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
        //echo "Message has been sent";
    }

    catch(Exception $e){
            return "F";
    }
}

?>