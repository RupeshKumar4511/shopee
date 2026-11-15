<?php
// include('./connection.php');
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/auth.php';
include __DIR__ . '/connection.php';

$decoded = verifyJwt();                 
$user = $decoded->data->id;  

try {
    $input = json_decode(file_get_contents("php://input"), true);
    
    $sql = "SELECT * FROM `orders` WHERE `user` =  '$user' and status='pending' or status='out_for_delivery'";

    $result = mysqli_query($connection, $sql);

    if (mysqli_num_rows($result) > 0) {

        $orders = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $orders[] = $row;
        }

        echo json_encode([
            "success" => true,
            "orders" => $orders
        ]);

    } else {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "orders" => []
        ]);
        exit();
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Something went wrong.",
        "message" => $e->getMessage()
    ]);
}
?>
