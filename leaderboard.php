<?php
header('Content-Type: application/json');

include 'db.php';

if (!function_exists('str_starts_with')) {
    function str_starts_with($haystack, $needle) {
        return strpos($haystack, $needle) === 0;
    }
}

$customers = [];

// ===== Fruits Table =====
$fruitsQuery = "SELECT total_amount, booking_date, weight, quantity, contact, name, order_type FROM fruits_orders";
$fruitsResult = $conn->query($fruitsQuery);

while ($row = $fruitsResult->fetch_assoc()) {
    $contact = trim($row['contact']);
    $name = trim($row['name']);
    $orderType = strtolower(trim($row['order_type'])); 
    $weightText = trim($row['weight']);
    $quantity = (int)$row['quantity'];
    $year = (int)substr($row['booking_date'], 0, 4);

    preg_match('/^(\d+)/', $weightText, $matches);
    $kg = isset($matches[1]) ? (int)$matches[1] : 0;
    $totalKG = $kg * $quantity;
    
    if($contact != NULL){
    if (!isset($customers[$contact])) {
        $customers[$contact] = [
            'name' => $name,
            'contact' => $contact,
            'Mango' => 0, 'Mango_kg' => 0, 'Mango_revenue' => 0,
            'Orange' => 0, 'Orange_kg' => 0, 'Orange_revenue' => 0,
            'Hissa - Ijtemai' => 0,
            'Hissa - Waqf' => 0,
            'Hissa - Ijtemai (Premium)' => 0,
            'Goat (Hissa)' => 0,
            'Goat' => 0,
            'Cow' => 0,
            'Qurbani_revenue' => 0,
            'total_revenue' => 0,
            'first_booking_year' => $year
        ];
    }

    if ($year < $customers[$contact]['first_booking_year']) {
        $customers[$contact]['first_booking_year'] = $year;
    }

    $amount = (float)$row['total_amount'];
    if (str_starts_with($orderType, 'mango')) {
        $customers[$contact]['Mango'] += $quantity;
        $customers[$contact]['Mango_kg'] += $totalKG;
        $customers[$contact]['Mango_revenue'] += $amount;
    } elseif (str_starts_with($orderType, 'orange')) {
        $customers[$contact]['Orange'] += $quantity;
        $customers[$contact]['Orange_kg'] += $totalKG;
        $customers[$contact]['Orange_revenue'] += $amount;
    }

    $customers[$contact]['total_revenue'] += $amount;
    }
}

// ===== Orders Table =====
$ordersQuery = "SELECT total_amount, booking_date, contact_no, booking_name, order_type FROM qurbani_orders";
$ordersResult = $conn->query($ordersQuery);

while ($row = $ordersResult->fetch_assoc()) {
    $contact = trim($row['contact_no']);
    $name = trim($row['booking_name']);
    $orderType = trim($row['order_type']);
    $year = (int)substr($row['booking_date'], 0, 4);

   if($contact != NULL){
        if (!isset($customers[$contact])) {
        $customers[$contact] = [
            'name' => $name,
            'contact' => $contact,
            'Mango' => 0, 'Mango_kg' => 0, 'Mango_revenue' => 0,
            'Orange' => 0, 'Orange_kg' => 0, 'Orange_revenue' => 0,
            'Hissa - Ijtemai' => 0,
            'Hissa - Waqf' => 0,
            'Hissa - Ijtemai (Premium)' => 0,
            'Goat (Hissa)' => 0,
            'Goat' => 0,
            'Cow' => 0,
            'Qurbani_revenue' => 0,
            'total_revenue' => 0,
            'first_booking_year' => $year
        ];
    }

    if ($year < $customers[$contact]['first_booking_year']) {
        $customers[$contact]['first_booking_year'] = $year;
    }

    if (isset($customers[$contact][$orderType])) {
        $customers[$contact][$orderType]++;
    }

    $cleanAmount = floatval(str_replace(',', '', $row['total_amount'] ?? '0'));
    $customers[$contact]['total_revenue'] += $cleanAmount;
    $customers[$contact]['Qurbani_revenue'] += $cleanAmount;
    $customers[$contact]['name'] = $name;
    }
}

$customers = array_values($customers);

// ===== Sort by total revenue =====
usort($customers, function($a, $b) {
    return $b['total_revenue'] <=> $a['total_revenue'];
});

echo json_encode(array_values($customers), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>