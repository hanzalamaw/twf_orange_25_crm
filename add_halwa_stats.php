<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $week = $_POST['week'];
    $units_received = $_POST['units_received'];
    $kgs_received = $_POST['kgs_received'];
    $weight_loss = $_POST['weight_loss'];
    $rotten = $_POST['rotten'];
    $kgs_delivered = $_POST['kgs_delivered'];
    $description = $_POST['description'];

    $stmt = $conn->prepare("INSERT INTO weekly_halwa_stats_2025 (week, units_received, kgs_received, weight_loss, rotten, kgs_delivered, decription)
                            VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sddddss", $week, $units_received, $kgs_received, $weight_loss, $rotten, $kgs_delivered, $description);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Stat added successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to add stat."]);
    }

    $stmt->close();
}
?>

