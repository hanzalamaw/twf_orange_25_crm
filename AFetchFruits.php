<?php
include 'db.php';

$sql = "SELECT * FROM fruits_orders WHERE booking_date BETWEEN '2025-11-01' AND '2026-04-30' ORDER BY id DESC";
$result = $conn->query($sql);

$fruits = [];

while ($row = $result->fetch_assoc()) {
    $fruits[] = $row;
}

echo json_encode($fruits);

$conn->close();
?>