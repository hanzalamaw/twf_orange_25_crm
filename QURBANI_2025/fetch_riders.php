<?php
include 'db.php';

$sql = "SELECT * FROM rider ORDER BY id DESC";
$result = $conn->query($sql);

$riders = [];

while ($row = $result->fetch_assoc()) {
    $riders[] = $row;
}

echo json_encode($riders);

$conn->close();
?>
