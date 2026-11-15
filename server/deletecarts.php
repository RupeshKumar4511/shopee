<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/auth.php';
include __DIR__ . '/connection.php';

$decoded = verifyJwt();                 
$user = $decoded->data->id;  

try{
  

  $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['productId'])) {

        $id  = $input['productId'];
        

      
        $sql = "DELETE FROM `carts` WHERE `productId` = '$id' AND 
        `user` = '$user'";

        if (mysqli_query($connection, $sql)) {
            echo json_encode(["success"=>true,"message" => "cart deleted  successfully."]);
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