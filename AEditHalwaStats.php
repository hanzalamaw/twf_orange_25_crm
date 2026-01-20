<?php
// Connect to database
include 'db.php'; // Make sure this file contains your DB connection

$week = $_POST['week']; // Primary key

// All fields from the 'weekly_halwa_stats_2025' table except 'id'
$fields = [
    'units_received',
    'kgs_received',
    'weight_loss',
    'rotten',
    'kgs_delivered',
    'decription'  // Note: table column is misspelled as 'decription' not 'description'
];

$updates = [];
foreach ($fields as $field) {
    // Map 'description' from POST to 'decription' in database (column name has typo)
    $postField = ($field === 'decription') ? 'description' : $field;
    if (isset($_POST[$postField])) {
        $value = mysqli_real_escape_string($conn, $_POST[$postField]);
        $updates[] = "$field = '$value'";
    }
}

if (empty($updates)) {
    echo "No data to update.";
    exit;
}

$setClause = implode(', ', $updates);
$sql = "UPDATE weekly_halwa_stats_2025 SET $setClause WHERE week = '$week'";

if (mysqli_query($conn, $sql)) {
    echo "Stat updated successfully.";
} else {
    echo "Error updating stat: " . mysqli_error($conn);
}
?>

