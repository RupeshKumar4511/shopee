<?php
header("Access-Control-Allow-Origin: http://localhost:5173",true);
header("Access-Control-Allow-Credentials: true",true);
header("Access-Control-Allow-Headers: Content-Type, Authorization",true);
header("Access-Control-Allow-Methods: GET, POST, OPTIONS",true);
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
?>