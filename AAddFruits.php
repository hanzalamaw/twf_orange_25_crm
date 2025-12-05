<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $customer_id = $_POST['customer_id'];
    $order_id = $_POST['order_id'];
    $name = $_POST['name'];
    $contact = $_POST['contact'];
    $alt_contact = $_POST['alt_contact'];
    $address = $_POST['address'];
    $area = $_POST['area'];
    $quantity = $_POST['quantity'];
    $order_type = $_POST['order_type'];
    $weight = $_POST['weight'];
    $booking_date = $_POST['booking_date'];
    $total_amount = $_POST['total_amount'];
    $bank = $_POST['bank'];
    $cash = $_POST['cash'];
    $received_amount = $_POST['received_amount'];
    $pending_amount = $_POST['pending_amount'];
    $source = $_POST['source'];
    $description = $_POST['description'];
    $deliveryStatus = $_POST['deliveryStatus'];
    $week = $_POST['week'];

    $sql = "INSERT INTO fruits_orders (customer_id, order_id, name, contact, alt_contact, address, area, quantity, 
            order_type, weight, booking_date, total_amount, bank, cash, received_amount, pending_amount, 
            source, description, deliveryStatus, week) 
            VALUES ('$customer_id', '$order_id', '$name', '$contact', '$alt_contact', '$address', '$area', '$quantity',
             '$order_type', '$weight', '$booking_date', '$total_amount', '$bank', '$cash', '$received_amount', '$pending_amount', 
             '$source', '$description', '$deliveryStatus', '$week')";

    if ($conn->query($sql) === TRUE) {
        echo "Order added successfully!";
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
}
?>
