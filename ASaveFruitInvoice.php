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

// Fetch order details from DB
$stmt = $conn->prepare("SELECT * FROM fruits WHERE order_id = ?");
$stmt->bind_param("s", $order_id);
$stmt->execute();
$result = $stmt->get_result();
$order = $result->fetch_assoc();

if (!$order) {
    echo json_encode(["status" => "error", "message" => "Order not found"]);
    exit;
}

// Capture invoice HTML
ob_start();
include 'invoice_template.php'; 
$html = ob_get_clean();

// Generate PDF
$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();

// Define save path
$filename = "Invoice-$order_id.pdf";
$savePath = __DIR__ . "/invoices/$filename";

// Create invoices folder if not exists
if (!file_exists(dirname($savePath))) {
    mkdir(dirname($savePath), 0777, true);
}

// Save the PDF file
file_put_contents($savePath, $dompdf->output());

// Return the file URL
echo json_encode([
    "status" => "success",
    "file_url" => "http://localhost/warsi_farm_crm/invoices/$filename"
]);
?>
