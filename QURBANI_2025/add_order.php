<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $customer_id = $_POST['customer_id'];
    $order_id = $_POST['order_id'];
    $cow_number = $_POST['cow_number'];
    $hissa_number = $_POST['hissa_number'];
    $booking_name = $_POST['booking_name'];
    $shareholder_name = $_POST['shareholder_name'];
    $contact_no = $_POST['contact_no'];
    $alternate_contact_no = $_POST['alternate_contact_no'];
    $shareholder_address = $_POST['shareholder_address'];
    $area = $_POST['area'];
    $day = $_POST['day'];
    $order_type = $_POST['order_type'];
    $booking_date = $_POST['booking_date'];
    $total_amount = $_POST['total_amount'];
    $bank = $_POST['bank'];
    $cash = $_POST['cash'];
    $received_amount = $_POST['received_amount'];
    $pending_amount = $_POST['pending_amount'];
    $order_source = $_POST['order_source'];
    $refrence = $_POST['refrence'];
    $description = $_POST['description'];
    $Slot = $_POST['Slot'];

    $sql = "INSERT INTO orders (customer_id, order_id, cow_number, hissa_number, booking_name, shareholder_name, contact_no, alternate_contact_no, shareholder_address, area, day, order_type, booking_date, total_amount, bank, cash, received_amount, pending_amount, order_source, refrence, description, Slot) 
            VALUES ('$customer_id', '$order_id', '$cow_number', '$hissa_number', '$booking_name', '$shareholder_name', '$contact_no', '$alternate_contact_no', '$shareholder_address', '$area', '$day', '$order_type', '$booking_date', '$total_amount', '$bank', '$cash', '$received_amount', '$pending_amount', '$order_source', '$refrence', '$description', '$Slot')";

    if ($conn->query($sql) === TRUE) {
        echo "Order added successfully!";
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
}
?>
