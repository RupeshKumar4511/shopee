<?php
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: http://localhost:5173");              
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");


include('./connection.php');

require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Load .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/');
$dotenv->load();
$key = $_ENV['secret'];  


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
            $issuedAt = time();
            $expire = $issuedAt + 3600; // 1-hour expiry
            $user_data = $result->fetch_assoc();
            

            $payload = [
                "iss" => "http://localhost/shopee/server",
                "aud" => "http://localhost:5173",
                "iat" => $issuedAt,
                "exp" => $expire,
                "data" => ["username" => $username]
            ];

            $jwt = JWT::encode($payload, $key, 'HS256');


            setcookie(
                "token",
                $jwt,
                [
                    'expires' => $expire,
                    'path' => 'http://localhost:5173',
                    'domain' => '', 
                    'secure' => false, // Set to true in production (HTTPS)
                    'httponly' => true, // Prevent JavaScript access
                    'samesite' => 'Lax' // dev 
                ]
            );

            echo json_encode(["success"=>true,"message" => "Sign In successfully.","username"=>$username,"email"=>$user_data['Email'],"phone_no"=>$user_data['PhoneNo'],"token"=>$jwt]);
        } else {
            http_response_code(400); // Set HTTP status to 400 for client error
            echo json_encode(["success"=>false,"message" => "Incorrect Username or Password"]);
            exit();
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        http_response_code(500); // Server error
        echo json_encode(["success"=>false,"error" => "Message could not be processed: " . $e->getMessage()]);
    }

    // Close the connection
    mysqli_close($connection);
}
?>
