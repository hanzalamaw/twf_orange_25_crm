<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $week = $_POST['week'];
    $units_received = $_POST['units_received'];
    $kgs_received = $_POST['kgs_received'];
    $peti_loss = $_POST['peti_loss'];
    $kharab = $_POST['kharab'];
    $kgs_delivered = $_POST['kgs_delivered'];
    $description = $_POST['description'];

    $stmt = $conn->prepare("INSERT INTO weeklystats_oranges_2025 (week, units_received, kgs_received, peti_loss, kharab, kgs_delivered, description)
                            VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sdddsss", $week, $units_received, $kgs_received, $peti_loss, $kharab, $kgs_delivered, $description);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Expense added successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to add expense."]);
    }

    $stmt->close();
}
?>
