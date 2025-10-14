<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");


include('./connection.php');
$input = json_decode(file_get_contents("php://input"), true);
if (isset($input['username']) && isset($input['password'])) {
    $username = $input['username'];
    $password = $input['password'];

    // SQL query to select the record
    $sql = "SELECT * FROM `users` WHERE `Username` = ? AND `Password` = ?";
    
    // Prepare and bind parameters
    if ($stmt = mysqli_prepare($connection, $sql)) {
        mysqli_stmt_bind_param($stmt, "ss", $username, $password);
        // Here ss means both string

        // Execute the prepared statement
        mysqli_stmt_execute($stmt);

        // Get the result and check if there’s a match
        $result = mysqli_stmt_get_result($stmt);
        if (mysqli_num_rows($result) > 0 ) {
            echo json_encode(["message" => "Sign In successfully."]);
        } else {
            http_response_code(400); // Set HTTP status to 400 for client error
            echo json_encode(["error" => "Incorrect Username or Password"]);
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
?>
