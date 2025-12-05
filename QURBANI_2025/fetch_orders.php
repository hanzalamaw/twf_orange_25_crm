<?php
include 'db.php';

$sql = "SELECT * FROM orders ORDER BY id DESC";
$result = $conn->query($sql);

$orders = [];

while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);

$conn->close();
?>
