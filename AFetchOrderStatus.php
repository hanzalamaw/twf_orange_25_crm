<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include 'db.php';

// Get the order_id from query string and decode it (handles # character)
// Returns complete order details including deliveryStatus
$order_id = isset($_GET['order_id']) ? urldecode($_GET['order_id']) : '';

if (empty($order_id)) {
    http_response_code(400);
    echo json_encode(["error" => "Order ID is required"]);
    exit;
}

// SQL to fetch complete order details by order_id
$sql = "SELECT * FROM fruits_orders WHERE order_id = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $order_id);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["error" => "Order not found"]);
} else {
    $order = $result->fetch_assoc();
    echo json_encode($order);
}

$stmt->close();
$conn->close();
?>

