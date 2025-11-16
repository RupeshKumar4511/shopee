<?php
include('./connection.php');

try {
    $sql = "SELECT * FROM `products`";
    $result = mysqli_query($connection, $sql);

    if (mysqli_num_rows($result) > 0) {

        $products = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $products[] = $row;
        }

        echo json_encode([
            "success" => true,
            "data" => $products
        ]);

    } else {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "error" => "No products found"
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
