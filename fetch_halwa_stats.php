<?php
include 'db.php';

$result = $conn->query("SELECT * FROM weekly_halwa_stats_2025 ORDER BY id DESC");
$weeklystats = [];

while ($row = $result->fetch_assoc()) {
    $weeklystats[] = $row;
}

echo json_encode($weeklystats);
?>

