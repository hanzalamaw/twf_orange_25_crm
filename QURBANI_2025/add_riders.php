<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $cnic = $_POST['cnic'];
    $vehicle = $_POST['vehicle'];
    $number_plate = $_POST['number_plate'];
    $availability = $_POST['availability'];
    $tag = $_POST['tag'];

    $sql = "INSERT INTO rider (name, phone, cnic, vehicle, number_plate, availability, tag)
            VALUES ('$name', '$phone', '$cnic', '$vehicle', '$number_plate', '$availability', '$tag')";

    if ($conn->query($sql) === TRUE) {
        echo "Rider added successfully!";
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
}
?>
