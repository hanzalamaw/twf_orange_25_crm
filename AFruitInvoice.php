<?php
require 'vendor/autoload.php';
use Dompdf\Dompdf;

include 'db.php';

$order_id = $_GET['order_id'] ?? null;

if (!$order_id) {
    die("Order ID is missing");
}

$stmt = $conn->prepare("SELECT * FROM fruits_orders WHERE order_id = ?");
$stmt->bind_param("s", $order_id);
$stmt->execute();
$result = $stmt->get_result();
$order = $result->fetch_assoc();

if (!$order) {
    die("Order not found");
}

// Start output buffering to capture HTML
ob_start();
include 'AFruitInvoiceTemplate.php'; // This will use $order variable
$html = ob_get_clean();

// Generate PDF with Dompdf
$dompdf = new Dompdf();
$dompdf->set_option('isHtml5ParserEnabled', true);
$dompdf->set_option('isRemoteEnabled', true); // if images/links are used
$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();

// Output the PDF (view in browser)
$dompdf->stream("invoice_{$order_id}.pdf", ["Attachment" => false]);