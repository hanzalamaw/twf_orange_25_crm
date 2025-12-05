<?php
include 'db.php';

$sql = "SELECT * FROM orders 
        WHERE order_type IN ('Hissa - Waqf', 'Hissa - Ijtemai', 'Hissa - Ijtemai (Premium)', 'Cow', 'Goat', 'Goat (Hissa)') 
        ORDER BY id DESC";

$result = $conn->query($sql);

$orders = [];

while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);

$conn->close();
?>
