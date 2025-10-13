<?php
header("Access-Control-Allow-Origin: *");


session_start();

try {
    if (isset($_POST['otp'])) {
        $otp = $_POST['otp'];
        
        // Check if the OTP is set in the session
        if (!isset($_SESSION['otp_value'])) {
            throw new Exception("OTP value is not set.");
        }

        // Verify the OTP
        if ($otp == $_SESSION['otp_value']) {
            echo json_encode(["success"=>true,"message" => "OTP verified successfully."]);
            unset($_SESSION['otp_value']); // Clear OTP after successful verification
        } else {
            http_response_code(400); // Set HTTP status to 400 for client error
            echo json_encode(["success"=>false,"error" => "Incorrect OTP"]);
            exit();
        }
    }
} catch (Exception $e) {
    http_response_code(500); // Server error
    echo json_encode(["success"=>false,"error" => "Message could not be processed: " . $e->getMessage()]);
}
?>
