<?php
header("Access-Control-Allow-Credentials: true"); 
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

if (!isset($_COOKIE['token']) && !isset($_POST['username'])) {
    http_response_code(401);
    exit(json_encode(["error" => "Token not found in cookie"]));
}
$token = $_COOKIE['token'];
$username = $_POST['username'];

try {
    // Decode and verify JWT
    $decoded = JWT::decode($token, new Key($key, 'HS256'));

    if($decoded->data->username === $username){
        setcookie(
        "token",
        "",
        [
            'expires' => time() - 3600, // Make it expire in the past
            'path' => '/',
            'secure' => false, // Use true in production (HTTPS)
            'httponly' => true,
            'samesite' => 'Lax'
        ]
    );

    http_response_code(200);
    echo json_encode([
        "logout" => true,
        "message" => "Logged out successfully."
    ]);
}

} catch (Exception $e) {
    http_response_code(401);
    echo json_encode([
        "error" => "Invalid or expired token",
        "message" => $e->getMessage()
    ]);
}


