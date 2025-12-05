<?php
// Connect to database
include 'db.php'; // Make sure this file contains your DB connection

$week = $_POST['week']; // Primary key

// All fields from the 'fruits' table except 'id'
$fields = [
    'units_received',
    'kgs_received',
    'peti_loss',
    'kharab',
    'kgs_delivered',
    'description'
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
$sql = "UPDATE weeklystats_oranges_2025 SET $setClause WHERE week = '$week'";

if (mysqli_query($conn, $sql)) {
    echo "Order updated successfully.";
} else {
    echo "Error updating order: " . mysqli_error($conn);
}
?>
