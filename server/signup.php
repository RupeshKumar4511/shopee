<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

include('./otp.php');


try{
  

  $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['username']) && isset($input['password']) && isset($input['email']) && isset($input['phone_no'])) {
        // Get form data
        $username  = $input['username'];
        $password = $input['password'];
        $email = $input['email'];
        $phone_no = $input['phone_no'];
        

        // SQL query to insert data
        $sql = "INSERT INTO `users` (`Username`, `Password`, `Email`, `PhoneNo` ) VALUES ('$username', '$password','$email','$phone_no');";

        // Execute query
        if (mysqli_query($connection, $sql)) {
            echo json_encode(["success"=>true,"message" => "user created  successfully."]);
        } else {
            http_response_code(400); // Set HTTP status to 400 for client error
            echo json_encode(["success"=>false,"error" => "Username or email already exist"]);
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