<?php
header("Access-Control-Allow-Origin:*");

include('./connection.php');
include('./otp.php');
try{
    if (isset($_POST['set_username']) && isset($_POST['set_password']) && isset($_POST['email']) && isset($_POST['phone_no'])) {
        // Get form data
        $username  = $_POST['set_username'];
        $password = $_POST['set_password'];
        $email = $_POST['email'];
        $phone_no = $_POST['phone_no'];
        

        // SQL query to insert data
        $sql = "INSERT INTO `users` (`Username`, `Password`, `Email`, `PhoneNo` ) VALUES ($username, $password,$email,$phone_no);";

        // Execute query
        if (mysqli_query($connection, $sql)) {
            echo json_encode(["success"=>true,"message" => "OTP verified successfully."]);
        } else {
            http_response_code(400); // Set HTTP status to 400 for client error
            echo json_encode(["success"=>false,"error" => "Incorrect OTP"]);
            exit();
        }

        // Close the connection
        mysqli_close($connection);
    }

  }catch(Exception $e){
    http_response_code(500); // Server error
    echo json_encode(["error" => "Message could not be processed: " . $e->getMessage()]);
  }
    ?>