<?php

header("Access-Control-Allow-Origin: *");


//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './phpMailer/src/Exception.php';
require './phpMailer/src/PHPMailer.php';
require './phpMailer/src/SMTP.php';

require __DIR__ . "/vendor/autoload.php";

// Initialize Dotenv and load the .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ ); 


session_start();

$dotenv->load();
$UserName = $_ENV['username'];
$Password = $_ENV['password'];


function sendOTP() {
    return rand(1000, 9999);
    
}
$_SESSION['otp_value'] = sendOTP();

if (isset($_POST['email'])) {

//Create an instance; passing `true` enables exceptions

$mail = new PHPMailer(true);
try {
    //Server settings
    
    
    $mail->SMTPDebug = SMTP::DEBUG_OFF;                         //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = $UserName;                              //SMTP username
    $mail->Password   = $Password;                              //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable explicit TLS encryption
    $mail->Port       = 587;                                    //TCP port to connect to; use 587 for TLS

    $gmail = $_POST['email'];
    //Recipients
    $mail->setFrom("herosaini67@gmail.com", 'TechUpdate');
    $mail->addAddress($gmail, 'Hello Sir/Madam');     // Add a recipient
    
   


    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Welcome to Shopee';
    $mail->Body    = 'Your otp is '.$_SESSION['otp_value'];
    if ($mail->send()) {
        echo json_encode(["success" => true, "message" => "OTP sent successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Message could not be sent: " . $mail->ErrorInfo]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Message could not be sent: " . $e->getMessage()]);
}

}