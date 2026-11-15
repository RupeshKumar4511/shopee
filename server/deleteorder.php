<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/auth.php';
include __DIR__ . '/connection.php';

$decoded = verifyJwt();
$user = $decoded->data->id;

try {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['productId'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "productId is required"]);
        exit;
    }

    $productId = (int)$input['productId'];

    // check whether the order is out for delivery or not
    $stmt1 = $connection->prepare(
        "SELECT `status` FROM `orders` WHERE `productId` = ? AND `user` = ?"
    );
    $stmt1->bind_param("is", $productId, $user);
    $stmt1->execute();
    $result = $stmt1->get_result();
    $row = $result->fetch_assoc();
    $stmt1->close();

    if (!$row) {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Order not found"]);
        exit;
    }

    if ($row['status'] === "out_for_delivery") {
        http_response_code(409);
        echo json_encode(["success" => false, "message" => "Product is out for delivery"]);
        exit;
    }

    $stmt = $connection->prepare(
        "DELETE FROM `orders` WHERE `productId` = ? AND `user` = ? AND `status` != 'out_for_delivery'"
    );
    $stmt->bind_param("is", $productId, $user);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Order deleted successfully."]);
    } else {
        http_response_code(409);
        echo json_encode(["success" => false, "error" => "Order could not be deleted"]);
    }

    $stmt->close();
    $connection->close();

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Server Error: " . $e->getMessage()]);
}