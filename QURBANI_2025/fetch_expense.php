<?php
include 'db.php';

$result = $conn->query("SELECT * FROM expenses ORDER BY id DESC");
$expenses = [];

while ($row = $result->fetch_assoc()) {
    $expenses[] = $row;
}

echo json_encode($expenses);
?>
