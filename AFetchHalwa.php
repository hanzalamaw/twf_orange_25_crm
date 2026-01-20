<?php
include 'db.php';

$sql = "SELECT * FROM halwa_orders WHERE booking_date BETWEEN '2025-11-01' AND '2026-04-30' ORDER BY id DESC";
$result = $conn->query($sql);

$halwa = [];

while ($row = $result->fetch_assoc()) {
    $halwa[] = $row;
}

echo json_encode($halwa);

$conn->close();
?>

