<?php
include 'db.php';

if (isset($_POST['order_id'])) {
    $order_id = $_POST['order_id'];

    $sql = "DELETE FROM fruits_orders WHERE order_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $order_id);

    if ($stmt->execute()) {
        echo "Order deleted successfully."; 
    } else {
        echo "Failed to delete order.";
    }
}
?>
