<?php
include 'db.php';

$orders = [];
$riders = [];

// Fetch orders
$orderSql = "SELECT * FROM orders ORDER BY id DESC";
$orderResult = $conn->query($orderSql);
while ($row = $orderResult->fetch_assoc()) {
    $orders[] = $row;
}

// Fetch riders
$riderSql = "SELECT * FROM rider";
$riderResult = $conn->query($riderSql);
while ($row = $riderResult->fetch_assoc()) {
    $riders[] = $row;
}

// Send both as response
echo json_encode([
    'orders' => $orders,
    'riders' => $riders
]);

$conn->close();
?>
