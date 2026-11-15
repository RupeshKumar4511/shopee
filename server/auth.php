<?php
require_once __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function verifyJwt(): object {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->safeLoad();
    $key = $_ENV['secret'];

    if (!isset($_COOKIE['token'])) {
        http_response_code(401);
        echo json_encode(["error" => "Token not found in cookie"]);
        exit;
    }

    try {
        return JWT::decode($_COOKIE['token'], new Key($key, 'HS256'));
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid or expired token", "message" => $e->getMessage()]);
        exit;
    }
}
?>