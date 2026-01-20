<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$orderId = $data['order_id'] ?? null;
$status = $data['status'] ?? null;

if ($orderId && $status) {
    $sql = "UPDATE halwa_orders SET deliveryStatus = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $status, $orderId);
    $success = $stmt->execute();
    echo json_encode(['success' => $success]);
} else {
    echo json_encode(['success' => false, 'error' => 'Missing order_id or status']);
}

$conn->close();
?>

