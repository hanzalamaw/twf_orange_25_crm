<?php
// Connect to database
include 'db.php'; // Make sure this file contains your DB connection

$order_id = $_POST['order_id']; // Primary key

// All fields from the 'halwa_orders' table except 'id'
$fields = [
    'customer_id', 'name', 'contact', 'address', 'area',
    'quantity', 'order_type', 'weight', 'booking_date', 'total_amount',
    'source', 'description', 'week'
];

$updates = [];
foreach ($fields as $field) {
    if (isset($_POST[$field])) {
        $value = mysqli_real_escape_string($conn, $_POST[$field]);
        $updates[] = "$field = '$value'";
    }
}

if (empty($updates)) {
    echo "No data to update.";
    exit;
}

$setClause = implode(', ', $updates);
$sql = "UPDATE halwa_orders SET $setClause WHERE order_id = '$order_id'";

if (mysqli_query($conn, $sql)) {
    echo "Order updated successfully.";
} else {
    echo "Error updating order: " . mysqli_error($conn);
}
?>

