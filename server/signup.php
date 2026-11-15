<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include __DIR__ . '/otp.php';
include __DIR__ . '/connection.php';


function generateUuid(): string {
    $data = random_bytes(16);
    $data[6] = chr((ord($data[6]) & 0x0f) | 0x40);  
    $data[8] = chr((ord($data[8]) & 0x3f) | 0x80);  
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

try {
    $input = json_decode(file_get_contents("php://input"), true);

    if (isset($input['username'], $input['password'], $input['email'], $input['phone_no'])) {
        $userId   = generateUuid();
        $username = trim($input['username']);
        $email    = trim($input['email']);
        $phone_no = trim($input['phone_no']);

        $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT);

        $stmt = $connection->prepare(
            "INSERT INTO `users` (`id`, `Username`, `Password`, `Email`, `PhoneNo`) VALUES (?, ?, ?, ?, ?)"
        );
        $stmt->bind_param("sssss", $userId, $username, $hashedPassword, $email, $phone_no);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "User created successfully.",
                "userId"  => $userId
            ]);
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Username or email already exist"]);
        }

        $stmt->close();
        $connection->close();
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "All fields are required"]);
    }
} catch (mysqli_sql_exception $e) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Username or email already exist"]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Message could not be processed: " . $e->getMessage()]);
}