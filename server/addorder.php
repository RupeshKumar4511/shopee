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


        $stmt1 = $connection->prepare("SELECT `stock` from `products` WHERE `id`=? ");
        $stmt1->bind_param("i",$productId);
        $stmt1->execute();
        $result = $stmt1->get_result();
        $row = $result->fetch_assoc();    
        $stmt1->close();
        if ($row) {
            $stock = $row['stock'];
            if($stock== 0){
                echo json_encode(["success"=>false,"message"=>"Product is out of stock"]);
                exit();
            }else if($stock<$quantity){
                echo json_encode(["success"=>false,"message"=>"Only $stock stocks left"]);
                exit;
            }
        } else {
            echo json_encode(["msg"=>"Invalid Order"]);
            exit;
        }
        


        $stmt = $connection->prepare(
            "INSERT INTO orders (productId, title, price, quantity, user)
             VALUES (?, ?, ?, ?, ?)"
        );

      
        $stmt->bind_param("isiis", $productId, $title, $price, $quantity, $user);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Order added successfully."
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
