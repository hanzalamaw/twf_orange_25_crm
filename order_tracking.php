<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Optional for public API use

require_once 'db.php';

// Get the order_id from query string
$order_id = isset($_GET['order_id']) ? $_GET['order_id'] : '';

if (empty($order_id)) {
    http_response_code(400);
    echo json_encode(["error" => "Order ID is required"]);
    exit;
}

// SQL to fetch a specific fruit order by order_id
$sql = "SELECT * FROM fruits WHERE order_id = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $order_id);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["error" => "Fruit order not found"]);
} else {
    $fruit = $result->fetch_assoc();
    echo json_encode($fruit);
}

$stmt->close();
$conn->close();
?>
