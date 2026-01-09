<?php
header('Content-Type: application/json');

include 'db.php';

if (!function_exists('str_starts_with')) {
    function str_starts_with($haystack, $needle) {
        return strpos($haystack, $needle) === 0;
    }
}

$customers = [];

// Helper function to initialize year data
function initYearData() {
    return [
        'Mango' => 0, 'Mango_kg' => 0, 'Mango_revenue' => 0,
        'Orange' => 0, 'Orange_kg' => 0, 'Orange_revenue' => 0,
        'Hissa - Ijtemai' => 0,
        'Hissa - Waqf' => 0,
        'Hissa - Ijtemai (Premium)' => 0,
        'Goat (Hissa)' => 0,
        'Goat' => 0,
        'Cow' => 0,
        'Qurbani_revenue' => 0,
        'total_revenue' => 0
    ];
}

// ===== Fruits Table =====
$fruitsQuery = "SELECT total_amount, booking_date, weight, quantity, contact, name, order_type FROM fruits_orders";
$fruitsResult = $conn->query($fruitsQuery);

while ($row = $fruitsResult->fetch_assoc()) {
    $contact = trim($row['contact']);
    $name = trim($row['name']);
    $orderType = strtolower(trim($row['order_type'])); 
    $weightText = trim($row['weight']);
    $quantity = (int)$row['quantity'];
    $bookingDate = $row['booking_date'];
    $year = (int)substr($bookingDate, 0, 4);
    $month = (int)substr($bookingDate, 5, 2);

    preg_match('/^(\d+)/', $weightText, $matches);
    $kg = isset($matches[1]) ? (int)$matches[1] : 0;
    $totalKG = $kg * $quantity;
    
    // For Orange orders: determine the campaign year
    // Jan-March 2026 orders count as 2025 campaign
    $orangeCampaignYear = $year;
    if (str_starts_with($orderType, 'orange') && $year == 2026 && $month >= 1 && $month <= 3) {
        $orangeCampaignYear = 2025;
    }
    
    // For Orange: convert KG to Pcs for 2024 orders (multiply by 5)
    // 2025 and 2026 orders are already in Pcs
    $orangePcs = $totalKG;
    if (str_starts_with($orderType, 'orange') && $year == 2024) {
        $orangePcs = $totalKG * 5;
    }
    
    $yearKey = (string)$year;
    
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
            'first_booking_year' => $year,
            'years' => []
        ];
    }

    // Initialize year data if not exists
    if (!isset($customers[$contact]['years'][$yearKey])) {
        $customers[$contact]['years'][$yearKey] = initYearData();
    }

    if ($year < $customers[$contact]['first_booking_year']) {
        $customers[$contact]['first_booking_year'] = $year;
    }

    $amount = (float)$row['total_amount'];
    if (str_starts_with($orderType, 'mango')) {
        $customers[$contact]['Mango'] += $quantity;
        $customers[$contact]['Mango_kg'] += $totalKG;
        $customers[$contact]['Mango_revenue'] += $amount;
        // Year-specific data
        $customers[$contact]['years'][$yearKey]['Mango'] += $quantity;
        $customers[$contact]['years'][$yearKey]['Mango_kg'] += $totalKG;
        $customers[$contact]['years'][$yearKey]['Mango_revenue'] += $amount;
    } elseif (str_starts_with($orderType, 'orange')) {
        // Use campaign year for Orange (Jan-Mar 2026 -> 2025)
        $orangeYearKey = (string)$orangeCampaignYear;
        
        // Initialize campaign year data if not exists
        if (!isset($customers[$contact]['years'][$orangeYearKey])) {
            $customers[$contact]['years'][$orangeYearKey] = initYearData();
        }
        
        // Total aggregates (use converted Pcs)
        $customers[$contact]['Orange'] += $quantity;
        $customers[$contact]['Orange_kg'] += $orangePcs;
        $customers[$contact]['Orange_revenue'] += $amount;
        
        // Year-specific data (use campaign year and converted Pcs)
        $customers[$contact]['years'][$orangeYearKey]['Orange'] += $quantity;
        $customers[$contact]['years'][$orangeYearKey]['Orange_kg'] += $orangePcs;
        $customers[$contact]['years'][$orangeYearKey]['Orange_revenue'] += $amount;
        $customers[$contact]['years'][$orangeYearKey]['total_revenue'] += $amount;
    }

    $customers[$contact]['total_revenue'] += $amount;
    // Only add to yearKey total_revenue for non-orange (orange uses campaign year)
    if (!str_starts_with($orderType, 'orange')) {
        $customers[$contact]['years'][$yearKey]['total_revenue'] += $amount;
    }
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
    $yearKey = (string)$year;

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
            'first_booking_year' => $year,
            'years' => []
        ];
    }

    // Initialize year data if not exists
    if (!isset($customers[$contact]['years'][$yearKey])) {
        $customers[$contact]['years'][$yearKey] = initYearData();
    }

    if ($year < $customers[$contact]['first_booking_year']) {
        $customers[$contact]['first_booking_year'] = $year;
    }

    if (isset($customers[$contact][$orderType])) {
        $customers[$contact][$orderType]++;
        // Year-specific data
        $customers[$contact]['years'][$yearKey][$orderType]++;
    }

    $cleanAmount = floatval(str_replace(',', '', $row['total_amount'] ?? '0'));
    $customers[$contact]['total_revenue'] += $cleanAmount;
    $customers[$contact]['Qurbani_revenue'] += $cleanAmount;
    $customers[$contact]['years'][$yearKey]['total_revenue'] += $cleanAmount;
    $customers[$contact]['years'][$yearKey]['Qurbani_revenue'] += $cleanAmount;
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