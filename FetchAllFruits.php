<?php
header("Content-Type: application/json; charset=utf-8");
ini_set('display_errors', 1);
error_reporting(E_ALL);

include 'db.php';

$sql = "SELECT id, customer_id, contact, name, alt_contact, address, area 
        FROM fruits_orders 
        ORDER BY id DESC 
        LIMIT 500";

$result = $conn->query($sql);

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data, JSON_INVALID_UTF8_IGNORE);
exit;
?>
