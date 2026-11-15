<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/auth.php';
include __DIR__ . '/connection.php';

$decoded = verifyJwt();                 
$user = $decoded->data->id;   
  
try {
    $input = json_decode(file_get_contents("php://input"), true);
    
    $sql = "SELECT * FROM `carts` WHERE `user` =  '$user'";
    $result = mysqli_query($connection, $sql);

    if (mysqli_num_rows($result) > 0) {

        $carts = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $carts[] = $row;
        }

        echo json_encode([
            "success" => true,
            "carts" => $carts
        ]);

    } else {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "carts" => []
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
