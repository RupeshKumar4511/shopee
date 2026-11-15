<?php

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/auth.php';
include __DIR__ . '/connection.php';
$decoded = verifyJwt();                 
$user = $decoded->data->id;  

try {

    $input = json_decode(file_get_contents("php://input"), true);

    if (isset($input['productId']) && isset($input['title']) && 
        isset($input['price']) && isset($input['quantity'])) {

        $productId = $input['productId'];
        $title     = $input['title'];
        $price     = $input['price'];
        $quantity  = $input['quantity']; 


        // Prepare statement 
        $stmt = $connection->prepare(
            "INSERT INTO carts (productId, title, price, quantity, user)
             VALUES (?, ?, ?, ?, ?)"
        );

        // bind parameters
        $stmt->bind_param("isiis", $productId, $title, $price, $quantity, $user);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Cart added successfully."
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "error" => "Database error: " . $stmt->error
            ]);
        }

        $stmt->close();
        $connection->close();
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Server Error: " . $e->getMessage()]);
}

?>
