<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

include('./connection.php');

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
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ .'/'); 



$dotenv->load();
$UserName = $_ENV['username'];
$Password = $_ENV['password'];


function sendOTP() {
    return rand(1000, 9999);
    
}

$OTP_value = sendOTP();

$input = json_decode(file_get_contents("php://input"), true);
if (isset($input['email'])) {

$email = $input['email'];
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

    
    //Recipients
    $mail->setFrom("herosaini67@gmail.com", 'TechUpdate');
    $mail->addAddress($email, 'Hello Sir/Madam');     // Add a recipient
    
   


    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Welcome to Shopee';
    $mail->Body    = 'Your otp is '.$_SESSION['otp_value'];
    if ($mail->send()) {
        
        try{
             // SQL query to insert data
            $sql = "INSERT INTO `OTP` (`Email`, `OTP_value` ) VALUES ('$email','$OTP_value');";

            // Execute query
            if (mysqli_query($connection, $sql)) {
                echo json_encode(["success" => true, "message" => "OTP sent successfully"]);
            } else {
                http_response_code(400); // Set HTTP status to 400 for client error
                echo json_encode(["success"=>false,"error" => "something went wrong"]);
                exit();
            }

        // Close the connection
        mysqli_close($connection);
        }catch(Exception $e){
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Otp value is saved : " . $e->getMessage()]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Message could not be sent: " . $mail->ErrorInfo]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Message could not be sent: " . $e->getMessage()]);
}

}