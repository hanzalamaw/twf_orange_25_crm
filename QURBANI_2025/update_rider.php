<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$orderId = $data['order_id'] ?? null;
$riderName = $data['rider_name'] ?? null;

if ($orderId && $riderName !== null) {
    $sql = "UPDATE orders SET rider_name = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $riderName, $orderId);
    $success = $stmt->execute();
    echo json_encode(['success' => $success]);
} else {
    echo json_encode(['success' => false, 'error' => 'Missing data']);
}

$conn->close();
?>
