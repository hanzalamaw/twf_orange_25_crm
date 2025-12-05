<?php
require 'vendor/autoload.php';
use Dompdf\Dompdf;

include 'db.php';

header('Content-Type: application/json');

$order_id = $_GET['order_id'] ?? null;

if (!$order_id) {
    echo json_encode(["status" => "error", "message" => "Order ID is missing"]);
    exit;
}

// Fetch order from DB
$stmt = $conn->prepare("SELECT * FROM fruits WHERE order_id = ?");
$stmt->bind_param("s", $order_id);
$stmt->execute();
$result = $stmt->get_result();
$order = $result->fetch_assoc();

if (!$order) {
    echo json_encode(["status" => "error", "message" => "Order not found"]);
    exit;
}

// Load invoice template HTML
ob_start();
include 'AFruitInvoiceTemplate.php'; // This file should use $order
$html = ob_get_clean();

// Generate PDF using Dompdf
$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();

// Clean order ID for safe file naming
$clean_order_id = str_replace('#', '', $order_id);
$filename = "Invoice-$clean_order_id.pdf";

// Define path to save PDF
$savePath = __DIR__ . "/invoices/$filename";

// Create invoices folder if it doesn't exist
if (!file_exists(dirname($savePath))) {
    mkdir(dirname($savePath), 0777, true);
}

// Save the PDF file to the server
file_put_contents($savePath, $dompdf->output());

// Return the file URL — make sure this matches your actual domain/path
echo json_encode([
    "status" => "success",
    "file_url" => "https://webhouseinc.co/twf_management/invoices/$filename"
]);
?>
