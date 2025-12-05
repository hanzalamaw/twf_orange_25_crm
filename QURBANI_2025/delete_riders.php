<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $id = $_POST['id'];

    $stmt = $conn->prepare("DELETE FROM rider WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Rider deleted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to delete Rider."]);
    }

    $stmt->close();
}
?>
