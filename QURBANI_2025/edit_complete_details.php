<?php
// Connect to database
include 'db.php'; // Make sure this file contains your DB connection

$order_id = $_POST['order_id'];

// Fetch all fields
$fields = [
    'customer_id', 'cow_number', 'hissa_number', 'booking_name', 'shareholder_name',
    'contact_no', 'alternate_contact_no', 'shareholder_address', 'area', 'day',
    'order_type', 'booking_date', 'order_source', 'refrence',
    'bank', 'cash', 'received_amount', 'pending_amount', 'description', 'Slot'
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
$sql = "UPDATE orders SET $setClause WHERE order_id = '$order_id'";

if (mysqli_query($conn, $sql)) {
    echo "Order $order_id updated successfully.";
} else {
    echo "Error updating order: " . mysqli_error($conn);
}
?>
