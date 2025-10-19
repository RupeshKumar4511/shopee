<?php 
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Load .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
$key = $_ENV['secret'];  

// Check if token cookie exists
if (!isset($_COOKIE['token'])) {
    http_response_code(401);
    exit(json_encode(["error" => "Token not found in cookie"]));
}

$token = $_COOKIE['token'];

try {
    // Decode and verify JWT
    $decoded = JWT::decode($token, new Key($key, 'HS256'));

    // Access user data
    echo json_encode([
        "success"=> true,
        "message"=>"access granted",
        "username" => $decoded->data->username
    ]);

} catch (Exception $e) {
    http_response_code(401);
    echo json_encode([
        "error" => "Invalid or expired token",
        "message" => $e->getMessage()
    ]);
}
?>
