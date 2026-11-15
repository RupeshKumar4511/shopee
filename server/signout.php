<?php
require_once __DIR__ . '/cors.php';

setcookie("token", "", [
    'expires'  => time() - 3600,
    'path'     => '/',
    'secure'   => false,   
    'httponly' => true,
    'samesite' => 'Lax',
]);

http_response_code(200);
echo json_encode([
    "logout"  => true,
    "message" => "Logged out successfully."
]);