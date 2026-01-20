<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['order_id'])) {
    $order_id = $_POST['order_id'];

    $stmt = $conn->prepare("DELETE FROM halwa_orders WHERE order_id = ?");
    $stmt->bind_param("s", $order_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Order deleted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to delete order."]);
    }

    $stmt->close();
}
?>

