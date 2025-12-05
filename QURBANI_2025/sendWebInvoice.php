<?php

// Include DB connection
include('db.php');

// Fetch parameters from the request (use GET or POST)
$order_id = isset($_GET['order_id']) ? urldecode($_GET['order_id']) : null;
$contact_no = isset($_GET['contact_no']) ? $_GET['contact_no'] : null;

if (!$order_id || !$contact_no) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required parameters: order_id or contact_no']);
    exit;
}

// Validate and clean up contact number (like replacing dashes and adding country code)
$contact_no = str_replace('-', '', $contact_no);
$contact_no = preg_replace('/^0/', '92', $contact_no); // Assuming Pakistan's country code

// Fetch the order details from the database using the order_id
$stmt = $conn->prepare("SELECT * FROM orders WHERE order_id = ?");
$stmt->bind_param("s", $order_id);
$stmt->execute();
$result = $stmt->get_result();
$order = $result->fetch_assoc();

// If the order is found
if ($order) {
    // Generate the invoice and get the file URL
    $fileUrl = generateInvoiceFile($order);
    
    if ($fileUrl) {
        // Send invoice to WhatsApp (or any other service)
        sendInvoiceToWhatsApp($contact_no, $order['booking_name'], $fileUrl, $order_id);
        
        // Return the file URL and success message
        echo json_encode(['status' => 'success', 'file_url' => $fileUrl]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to generate invoice.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Order not found.']);
}

function generateInvoiceFile($order) {
    // Prepare the order ID for URL encoding
    $order_id = urlencode($order['order_id']);  // Ensure the order ID is URL encoded

    // Build the URL for save_invoice.php with the order_id
    $url = 'https://webhouseinc.co/twf_management/save_invoice.php?order_id=' . $order_id;

    // Use file_get_contents to call save_invoice.php
    $response = file_get_contents($url);

    // If file_get_contents fails (e.g., invalid URL or file permissions issue), handle the error
    if ($response === false) {
        return false;
    }

    // Decode the JSON response from save_invoice.php
    $response_data = json_decode($response, true);

    if (isset($response_data['status']) && $response_data['status'] === 'success') {
        // If save_invoice.php successfully created the invoice, return the file URL
        return $response_data['file_url'];  // The URL to the generated invoice
    } else {
        // Handle any errors returned by save_invoice.php
        return false;
    }
}

// Function to send the invoice to WhatsApp (replace with your actual API integration)
function sendInvoiceToWhatsApp($contact_no, $booking_name, $fileUrl, $order_id) {
    // This is just an example, implement your actual WhatsApp sending logic here
    $chatId = $contact_no . '@c.us'; // WhatsApp chat ID format
    $message = "Dear $booking_name, thank you for your order! We’re pleased to share your invoice for Order ID $order_id. Please see the attached document.";

    // Example of API call to send the message (replace with actual API)
    $headers = [
        "Content-Type: application/json",
        "Authorization: Bearer YOUR_API_KEY"
    ];

    $messagePayload = [
        'chatId' => $chatId,
        'message' => $message,
    ];

    // Send text message (this is an example, replace it with your actual API integration)
    $ch = curl_init("https://waapi.app/api/v1/instances/58872/client/action/send-message");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($messagePayload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    // After sending message, send the invoice file
    $mediaPayload = [
        'chatId' => $chatId,
        'type' => 'document',
        'mediaUrl' => $fileUrl,
        'filename' => "Invoice-$order_id.pdf",
        'caption' => "Invoice for Order ID $order_id"
    ];

    // Send invoice as a media file
    $ch = curl_init("https://waapi.app/api/v1/instances/58872/client/action/send-media");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($mediaPayload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
}
?>