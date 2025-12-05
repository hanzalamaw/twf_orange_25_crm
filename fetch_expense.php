<?php
include 'db.php';

$result = $conn->query("SELECT * FROM orange_2025_expenses ORDER BY id DESC");
$expenses = [];

while ($row = $result->fetch_assoc()) {
    $expenses[] = $row;
}

echo json_encode($expenses);
?>
