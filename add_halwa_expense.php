<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $date = $_POST['date'];
    $from_bank = $_POST['from_bank'];
    $from_cash = $_POST['from_cash'];
    $total_amount = $_POST['total_amount'];
    $done_by = $_POST['done_by'];
    $entered_by = $_POST['entered_by'];
    $description = $_POST['description'];

    $stmt = $conn->prepare("INSERT INTO halwa_2026_expenses (date, from_bank, from_cash, total_amount, done_by, entered_by, description)
                            VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sdddsss", $date, $from_bank, $from_cash, $total_amount, $done_by, $entered_by, $description);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Expense added successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to add expense."]);
    }

    $stmt->close();
}
?>

