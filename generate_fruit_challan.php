<?php
require 'vendor/autoload.php';
use Dompdf\Dompdf;
include 'db.php';

// Fetch individual orders (no grouping)
$query = "SELECT * FROM fruits WHERE deliveryStatus = 'Being Packed' ORDER BY id ASC";
$result = $conn->query($query);

// Store all orders as individual challans
$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

// Split orders into chunks of 2 per page
$orderChunks = array_chunk($orders, 2);

$finalHtml = '';

foreach ($orderChunks as $chunk) {
    ob_start();
    ?>
    <div style="font-family: Arial, sans-serif; font-size: 12px; height: 100vh; box-sizing: border-box; padding: 20px;">
        <?php
        foreach ($chunk as $index => $order) {
            $position = $index === 0 ? "top" : "bottom";
            include 'fruit_challan_template.php'; // uses $order & $position
        }
        ?>
    </div>
    <div style="page-break-after: always;"></div>
    <?php
    $finalHtml .= ob_get_clean();
}

// Generate PDF using Dompdf
$dompdf = new Dompdf();
$dompdf->loadHtml($finalHtml);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();
$dompdf->stream("fruits_challans.pdf", ["Attachment" => false]);
