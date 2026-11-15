<?php
header("Access-Control-Allow-Origin: http://localhost:5173", true);
header("Access-Control-Allow-Credentials: true", true);
header("Access-Control-Allow-Headers: Content-Type, Authorization", true);
header("Access-Control-Allow-Methods: POST, OPTIONS", true);
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

try {
    require_once __DIR__ . '/vendor/autoload.php';
    include __DIR__ . '/connection.php';

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $key = $_ENV['secret'];

    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['username'], $input['password'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing credentials"]);
        exit;
    }

    $username = trim($input['username']);

    
    $stmt = mysqli_prepare($connection, "SELECT * FROM `users` WHERE `Username` = ?");
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $user_data = $result->fetch_assoc();
    mysqli_stmt_close($stmt);

    if ($user_data && password_verify($input['password'], $user_data['Password'])) {
        $issuedAt = time();
        $expire = $issuedAt + 3600;

        $jwt = \Firebase\JWT\JWT::encode([
            "iss" => "http://localhost",
            "iat" => $issuedAt,
            "exp" => $expire,
            "data" => ["id" => $user_data['id']],
        ], $key, 'HS256');

        setcookie("token", $jwt, [
            'expires'  => $expire,
            'path'     => '/',
            'secure'   => false,   
            'httponly' => true,
            'samesite' => 'Lax',
        ]);

        echo json_encode([
            "success"  => true,
            "message"  => "Sign In successfully.",
            "id"=>$user_data['id'],
            "username" => $user_data['Username'],
            "email"    => $user_data['Email'],
            "phone_no" => $user_data['PhoneNo'],
        ]);
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Incorrect Username or Password"]);
    }

    mysqli_close($connection);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}