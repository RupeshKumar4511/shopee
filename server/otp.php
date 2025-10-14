<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");


try {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['otp'])) {
        $otp = $input['otp'];
        
    // SQL query to select the record
    $sql = "SELECT * FROM `OTP` WHERE `Email` = ?";
    
    // Prepare and bind parameters
    if ($stmt = mysqli_prepare($connection, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $otp);
        // Here ss means both string

        // Execute the prepared statement
        mysqli_stmt_execute($stmt);

        // Get the result and check if there’s a match
        $result = mysqli_stmt_get_result($stmt);
        if (mysqli_num_rows($result) > 0 ) {
             // Verify the OTP
            if ($otp == $result->fetch_assoc()['OTP_value']) {
                echo json_encode(["success"=>true,"message" => "OTP verified successfully."]);
                
            } else {
                http_response_code(400); // Set HTTP status to 400 for client error
                echo json_encode(["success"=>false,"error" => "Incorrect OTP"]);
                exit();
            }
        } else {
            http_response_code(400); // Set HTTP status to 400 for client error
            echo json_encode(["error" => "Incorrect OTP"]);
            exit();
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        http_response_code(500); // Server error
        echo json_encode(["error" => "Message could not be processed: " . $e->getMessage()]);
    }

    // Close the connection
    mysqli_close($connection);

       
    }
} catch (Exception $e) {
    http_response_code(500); // Server error
    echo json_encode(["success"=>false,"error" => "Message could not be processed: " . $e->getMessage()]);
    exit();
}
?>
