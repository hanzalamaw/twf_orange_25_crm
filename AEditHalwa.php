<?php
include 'db.php';

if (
    isset($_POST['order_id']) &&
    isset($_POST['bank']) &&
    isset($_POST['cash']) &&
    isset($_POST['received_amount']) &&
    isset($_POST['pending_amount'])
) {
    $order_id = $_POST['order_id'];
    $bank = floatval($_POST['bank']);
    $cash = floatval($_POST['cash']);
    $received = floatval($_POST['received_amount']);
    $pending = floatval($_POST['pending_amount']);

    $sql = "UPDATE halwa_orders SET bank = ?, cash = ?, received_amount = ?, pending_amount = ? WHERE order_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("dddss", $bank, $cash, $received, $pending, $order_id);

    if ($stmt->execute()) {
        echo "Order updated successfully.";
    } else {
        echo "Error updating order.";
    }
}
?>

