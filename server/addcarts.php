<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

include('./connection.php');

try{
  

  $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['productId']) && isset($input['title']) && isset($input['price']) && isset($input['quantity'])) {
        // Get form data
        $productId  = $input['productId'];
        $title = $input['title'];
        $price = $input['price'];
        $quantity = $input['quantity'];
        $user = $input['user'];
        

      
        $sql = "INSERT INTO `carts` (`productId`, `title`, `price`, `quantity` , `user` ) VALUES ('$productId', '$title','$price','$quantity', '$user');";

        if (mysqli_query($connection, $sql)) {
            echo json_encode(["success"=>true,"message" => "cart added  successfully."]);
        } else {
            http_response_code(400); 
            echo json_encode(["success"=>false,"error" => "something went wrong"]);
            exit();
        }

        
        mysqli_close($connection);
    }

  }catch(Exception $e){
    http_response_code(500);
    echo json_encode(["error" => "Server Error: " . $e->getMessage()]);
  }
    ?>

?>