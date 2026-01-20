<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TWF - Dashboard (Halwa)</title>
    <link rel="stylesheet" href="index.css?v=<?= filemtime('index.css') ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
    <link rel="icon" href="imgs/favicon.png">
</head>
<body>
    <nav class="sidebar">
        <button class="close-btn"><i class="fa-solid fa-xmark"></i></button>
        <ul>
            <li style="padding: 8px 15px; color: #888; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; margin-top: 10px; margin-bottom: 5px;">Orange</li>
            <li><a href="index.php" class="hovere">Dashboard <span>›</span></a></li>
            <li><a href="AFruitNewOrder.html" class="hovere">Add New Order <span>›</span></a></li>
            <li><a href="AManageFruits.html" class="hovere">Orders Management <span>›</span></a></li>
            <li><a href="AFruitTransactions.html" class="hovere">Transactions <span>›</span></a></li>
            <li><a href="Expenses.html" class="hovere">Expenses <span>›</span></a></li>
            <li><a href="AFruitStats.html" class="hovere">Weekly Stats <span>›</span></a></li>
            <li style="padding: 8px 15px; color: #888; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; margin-top: 20px; margin-bottom: 5px;">Halwa</li>
            <li class="active"><a href="index_halwa.php">Dashboard <span>›</span></a></li>
            <li><a href="AHalwaNewOrder.html" class="hovere">Add New Order <span>›</span></a></li>
            <li><a href="AManageHalwa.html" class="hovere">Orders Management <span>›</span></a></li>
            <li><a href="AHalwaTransactions.html" class="hovere">Transactions <span>›</span></a></li>
            <li><a href="ExpensesHalwa.html" class="hovere">Expenses <span>›</span></a></li>
            <li><a href="AHalwaStats.html" class="hovere">Weekly Stats <span>›</span></a></li>
        </ul>
    </nav>

    <div class="dashboard">
        <header>
            <div class="nav-left">
                <button class="hamburger"><i class="fa-solid fa-bars"></i></button> 
                <h2>Welcome Back 👋🏼,</h2>
            </div>
            
            <div class="logo">
                <img src="imgs/logo.png" alt="">
            </div>
        </header>

        <div class="seperator">
            <h1>HALWA</h1>
        </div>

        <div class="hider" style="display: flex; justify-content: flex-end; align-items: center; width: 97%; margin-bottom: 1rem; gap: 1rem;">
            <button id="copyStatsBtn" style="padding: 8px 16px; background-color: #5a3cf7; color: white; border: none; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: 'Poppins', sans-serif; transition: background-color 0.3s;" onmouseover="this.style.backgroundColor='#4A2CD6'" onmouseout="this.style.backgroundColor='#5a3cf7'">
                Copy Stats
            </button>
            <button id="copyTargetBtn" style="padding: 8px 16px; background-color: #5a3cf7; color: white; border: none; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: 'Poppins', sans-serif; transition: background-color 0.3s;" onmouseover="this.style.backgroundColor='#4A2CD6'" onmouseout="this.style.backgroundColor='#5a3cf7'">
                Copy Target Report Stats
            </button>
            <img id="hideImg" src="imgs/hidden.png" alt="Hidden" onclick="hider()">
        </div>
        
        <section class="summary">
            <div class="summary-card">
                <img src="imgs/icon1.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Total Orders</span>
                    <span id="orders" class="value blur">1,893</span>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/icon2.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Payments Clearance</span>
                    <div style="display: flex; justify-content: row; align-items: baseline; gap: 1rem;">
                        <span id="paymentClearance" class="value blur">189</span>
                        <span id="clearancePercentage" style="font-size: 1.3rem; color: #07C339; font-weight: 500;" class="blur">58%</span>
                    </div>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/icon3.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Pending Payments</span>
                    <span id="paymentsPen" class="value blur">189</span>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/icon4.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Total Sales</span>
                    <span id="sales" class="value blur">Rs 650,000</span>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/icon5.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Received Payments</span>
                    <span id="receivedPayments" class="value blur">Rs 63,650,000</span>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/icon6.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Pending Payments Amount</span>
                    <span id="amountPen" class="value blur">Rs 650,000</span>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/box.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Peti Delivered</span>
                    <span id="petiDone" class="value blur">0</span>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/box.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">5 KG Boxes Delivered</span>
                    <span id="5BoxDone" class="value blur">0</span>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/box.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">10 KG Boxes Delivered</span>
                    <span id="10BoxDone" class="value blur">0</span>
                </div>
            </div>
        </section>
    </div>

    <section class="orderSummary">
        <h2>WEEKLY ORDER SUMMARY</h2>
        <div class="align">
            <div class="daySection">
                <div class="head">
                    <h1>Halwa</h1>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Received</th>
                            <th>Compensation/Gift</th>
                            <th>Rotten</th>
                            <th>Delivered (Pending Amount)</th>
                            <th>Un-Delivered (Pending Amount)</th>
                            <th>Ordered</th>
                            <th>Un-Ordered</th>
                        </tr>
                    </thead>
                    <tbody id="ordersContainer1"></tbody>
                </table>
            </div>
        </div>
    </section>

    <section class="performance">
        <h2>SOURCE-WISE ORDER SUMMARY</h2>

        <div class="performances">
            <div class="performer"><div class="info"><img src="imgs/source.png" alt="profile" /><h3>Whatsapp (Social Media Ads)</h3></div><p id="Whatsapp-(Social-Media-Ads)"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Whatsapp (New PR)</h3></div><p id="Whatsapp-(New-PR)"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Whatsapp (Old PR)</h3></div><p id="Whatsapp-(Old-PR)"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Social Media Engagement</h3></div><p id="Social-Media-Engagement"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Calling (Corporate)</h3></div><p id="Calling-(Corporate)"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Calling (Previous Customer)</h3></div><p id="Calling-(Previous-Customer)"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Calling (New Data)</h3></div><p id="Calling-(New-Data)"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Ambassador Program</h3></div><p id="Ambassador-Program"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Website</h3></div><p id="Website"></p></div>
        </div>
    </section>

    <section class="salesChart">
        <h2>SALES OVERVIEW</h2>

        <div id="chart"></div>
    </section>

    <section class="predictions">
        <h2>SEASON END PREDICTIONS</h2>
        
        <div class="predictions-container">
            <div class="prediction-card">
                <div class="prediction-header">
                    <h3>Pieces Sold Prediction</h3>
                    <span class="season-range">Jan 10, 2026 - Feb 28, 2026</span>
                </div>
                <div class="prediction-content">
                    <div class="prediction-stat">
                        <span class="label">Total Pieces Sold (Till Now)</span>
                        <span id="currentPieces" class="value">0</span>
                    </div>
                    <div class="prediction-stat">
                        <span class="label">Days Passed</span>
                        <span id="daysPassed" class="value">0</span>
                    </div>
                    <div class="prediction-stat">
                        <span class="label">Days Remaining</span>
                        <span id="daysRemaining" class="value">0</span>
                    </div>
                    <div class="prediction-stat highlight">
                        <span class="label">Predicted Total Pieces (By Feb 28, 2026)</span>
                        <span id="predictedTotalPieces" class="value">0</span>
                    </div>
                    <div class="prediction-stat">
                        <span class="label">Average Pieces Per Day</span>
                        <span id="avgPiecesPerDay" class="value">0</span>
                    </div>
                </div>
            </div>

            <div class="prediction-card">
                <div class="prediction-header">
                    <h3>Sales Prediction</h3>
                    <span class="season-range">Jan 10, 2026 - Feb 28, 2026</span>
                </div>
                <div class="prediction-content">
                    <div class="prediction-stat">
                        <span class="label">Total Sales (Till Now)</span>
                        <span id="currentSales" class="value">Rs 0</span>
                    </div>
                    <div class="prediction-stat">
                        <span class="label">Days Passed</span>
                        <span id="daysPassedSales" class="value">0</span>
                    </div>
                    <div class="prediction-stat">
                        <span class="label">Days Remaining</span>
                        <span id="daysRemainingSales" class="value">0</span>
                    </div>
                    <div class="prediction-stat highlight">
                        <span class="label">Predicted Total Sales (By Feb 28, 2026)</span>
                        <span id="predictedTotalSales" class="value">Rs 0</span>
                    </div>
                    <div class="prediction-stat">
                        <span class="label">Average Sales Per Day</span>
                        <span id="avgSalesPerDay" class="value">Rs 0</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
        
    <script src="index_halwa.js?v=<?= filemtime('index_halwa.js') ?>"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</body>
<script>
fetch('AFetchHalwa.php')
  .then(response => response.json())
  .then(data => {
    // Step 1: Group orders by date with comprehensive stats
    const statsByDate = {};

    data.forEach(order => {
      const date = order.booking_date;
      const totalAmount = parseFloat(order.total_amount) || 0;
      const receivedAmount = parseFloat(order.received_amount) || 0;
      const pendingAmount = parseFloat(order.pending_amount) || 0;
      
      if (!statsByDate[date]) {
        statsByDate[date] = {
          orders: 0,
          totalSales: 0,
          receivedPayments: 0,
          pendingPayments: 0,
          totalQuantity: 0
        };
      }
      
      statsByDate[date].orders += 1;
      statsByDate[date].totalSales += totalAmount;
      statsByDate[date].receivedPayments += receivedAmount;
      statsByDate[date].pendingPayments += pendingAmount;
      statsByDate[date].totalQuantity += parseInt(order.quantity) || 0;
    });

    // Step 2: Prepare arrays for chart
    const dates = Object.keys(statsByDate).sort(); // Sort by date
    const ordersCount = dates.map(date => statsByDate[date].orders);

    // Step 3: Build the chart with custom tooltip
    var options = {
      chart: {
        type: 'line',
        height: 400,
        toolbar: {
          show: true
        }
      },
      series: [{
        name: 'Orders',
        data: ordersCount
      }],
      xaxis: {
        categories: dates,
        labels: {
            show: false // <-- this hides the labels
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      tooltip: {
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          const date = dates[dataPointIndex];
          const stats = statsByDate[date];
          const avgOrderValue = stats.orders > 0 ? (stats.totalSales / stats.orders) : 0;
          
          // Format currency
          const formatCurrency = (amount) => {
            return 'Rs ' + amount.toLocaleString('en-PK', { 
              minimumFractionDigits: 0, 
              maximumFractionDigits: 0 
            });
          };
          
          return `
            <div style="padding: 10px; background: #fff; border-radius: 5px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
              <div style="font-weight: 600; margin-bottom: 8px; font-size: 14px; color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                ${date}
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px;">
                <div style="display: flex; justify-content: space-between; gap: 15px;">
                  <span style="color: #666;">Orders:</span>
                  <span style="font-weight: 600; color: #333;">${stats.orders}</span>
                </div>
                <div style="display: flex; justify-content: space-between; gap: 15px;">
                  <span style="color: #666;">Total Sales:</span>
                  <span style="font-weight: 600; color: #07C339;">${formatCurrency(stats.totalSales)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; gap: 15px;">
                  <span style="color: #666;">Received Payments:</span>
                  <span style="font-weight: 600; color: #07C339;">${formatCurrency(stats.receivedPayments)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; gap: 15px;">
                  <span style="color: #666;">Pending Payments:</span>
                  <span style="font-weight: 600; color: #ff6b6b;">${formatCurrency(stats.pendingPayments)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; gap: 15px;">
                  <span style="color: #666;">Total Quantity:</span>
                  <span style="font-weight: 600; color: #333;">${stats.totalQuantity}</span>
                </div>
                <div style="display: flex; justify-content: space-between; gap: 15px;">
                  <span style="color: #666;">Avg Order Value:</span>
                  <span style="font-weight: 600; color: #333;">${formatCurrency(avgOrderValue)}</span>
                </div>
              </div>
            </div>
          `;
        }
      },
      markers: {
        size: 4,
        hover: {
          size: 6
        }
      },
      colors: ['#07C339']
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // ========== FUTURE PREDICTIONS ==========
    calculatePredictions(data);
    calculateSalesPredictions(data);
  })
  .catch(error => console.error('Error fetching orders:', error));

function calculatePredictions(data) {
  // Season dates - set to midnight for accurate comparison
  const seasonStart = new Date('2026-01-10');
  seasonStart.setHours(0, 0, 0, 0);
  const seasonEnd = new Date('2026-02-28');
  seasonEnd.setHours(23, 59, 59, 999);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // If today is before season start, use season start as reference
  const referenceDate = today < seasonStart ? seasonStart : today;
  
  // Calculate days passed and remaining
  const daysPassed = Math.max(1, Math.ceil((referenceDate - seasonStart) / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, Math.ceil((seasonEnd - referenceDate) / (1000 * 60 * 60 * 24)));

  // Calculate total pieces sold till now
  let totalPiecesSold = 0;
  
  data.forEach(order => {
    // Parse booking date (assuming format YYYY-MM-DD)
    const orderDate = new Date(order.booking_date);
    orderDate.setHours(0, 0, 0, 0);
    
    // Only count orders from season start till today
    if (orderDate >= seasonStart && orderDate <= today) {
      // Extract pieces from weight field (e.g., "36 Pcs" -> 36)
      const weightMatch = order.weight ? order.weight.match(/^(\d+)/) : null;
      const piecesPerUnit = weightMatch ? parseInt(weightMatch[1]) : 0;
      const quantity = parseInt(order.quantity) || 0;
      totalPiecesSold += piecesPerUnit * quantity;
    }
  });

  // Calculate average pieces per day (avoid division by zero)
  const avgPiecesPerDay = daysPassed > 0 ? totalPiecesSold / daysPassed : 0;

  // Predict total pieces by end of season
  // Formula: (total pieces sold / days passed) * days remaining + total pieces sold
  const predictedAdditionalPieces = avgPiecesPerDay * daysRemaining;
  const predictedTotalPieces = Math.round(totalPiecesSold + predictedAdditionalPieces);

  // Update UI
  document.getElementById('currentPieces').textContent = totalPiecesSold.toLocaleString();
  document.getElementById('daysPassed').textContent = daysPassed;
  document.getElementById('daysRemaining').textContent = daysRemaining;
  document.getElementById('predictedTotalPieces').textContent = predictedTotalPieces.toLocaleString();
  document.getElementById('avgPiecesPerDay').textContent = Math.round(avgPiecesPerDay).toLocaleString();
}

function calculateSalesPredictions(data) {
  // Season dates - set to midnight for accurate comparison
  const seasonStart = new Date('2026-01-10');
  seasonStart.setHours(0, 0, 0, 0);
  const seasonEnd = new Date('2026-02-28');
  seasonEnd.setHours(23, 59, 59, 999);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // If today is before season start, use season start as reference
  const referenceDate = today < seasonStart ? seasonStart : today;
  
  // Calculate days passed and remaining
  const daysPassed = Math.max(1, Math.ceil((referenceDate - seasonStart) / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, Math.ceil((seasonEnd - referenceDate) / (1000 * 60 * 60 * 24)));

  // Calculate total sales till now
  let totalSales = 0;
  
  data.forEach(order => {
    // Parse booking date (assuming format YYYY-MM-DD)
    const orderDate = new Date(order.booking_date);
    orderDate.setHours(0, 0, 0, 0);
    
    // Only count orders from season start till today
    if (orderDate >= seasonStart && orderDate <= today) {
      const totalAmount = parseFloat(order.total_amount) || 0;
      totalSales += totalAmount;
    }
  });

  // Calculate average sales per day (avoid division by zero)
  const avgSalesPerDay = daysPassed > 0 ? totalSales / daysPassed : 0;

  // Predict total sales by end of season
  // Formula: (total sales / days passed) * days remaining + total sales
  const predictedAdditionalSales = avgSalesPerDay * daysRemaining;
  const predictedTotalSales = totalSales + predictedAdditionalSales;

  // Format currency helper
  const formatCurrency = (amount) => {
    return 'Rs ' + amount.toLocaleString('en-PK', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    });
  };

  // Update UI
  document.getElementById('currentSales').textContent = formatCurrency(totalSales);
  document.getElementById('daysPassedSales').textContent = daysPassed;
  document.getElementById('daysRemainingSales').textContent = daysRemaining;
  document.getElementById('predictedTotalSales').textContent = formatCurrency(predictedTotalSales);
  document.getElementById('avgSalesPerDay').textContent = formatCurrency(avgSalesPerDay);
}

// Copy Stats Button Functionality
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('copyStatsBtn').addEventListener('click', async function() {
  try {
    // Fetch orders data
    const ordersResponse = await fetch('AFetchHalwa.php');
    const ordersData = await ordersResponse.json();
    
    // Fetch weekly stats data
    const statsResponse = await fetch('fetch_halwa_stats.php');
    const statsData = await statsResponse.json();
    
    // Calculate financial summary
    let totalOrders = ordersData.length;
    let totalSales = 0;
    let receivedPayments = 0;
    let pendingPayments = 0;
    let pendingAmount = 0;
    
    ordersData.forEach(order => {
      totalSales += parseFloat(order.total_amount) || 0;
      receivedPayments += parseFloat(order.received_amount) || 0;
      const pending = parseFloat(order.pending_amount) || 0;
      if (pending > 0) {
        pendingPayments++;
        pendingAmount += pending;
      }
    });
    
    const paymentClearance = totalOrders - pendingPayments;
    const clearancePercentage = totalOrders > 0 ? Math.round((paymentClearance / totalOrders) * 100) : 0;
    
    // Calculate halwa stock summary (all time)
    let totalReceived = 0;
    let totalWeightLoss = 0;
    let totalRotten = 0;
    let totalSold = 0;
    let totalOrdered = 0;
    let totalUnOrdered = 0;
    
    statsData.forEach(stat => {
      totalReceived += parseFloat(stat.kgs_received) || 0;
      totalWeightLoss += parseFloat(stat.weight_loss) || 0;
      totalRotten += parseFloat(stat.rotten) || 0;
    });
    
    // Calculate sold (delivered pieces) and total ordered
    ordersData.forEach(order => {
      const weightMatch = order.weight ? order.weight.match(/^(\d+)/) : null;
      const piecesPerUnit = weightMatch ? parseInt(weightMatch[1]) : 0;
      const quantity = parseInt(order.quantity) || 0;
      const pieces = piecesPerUnit * quantity;
      
      // Total ordered (all orders)
      totalOrdered += pieces;
      
      // Sold (only delivered orders)
      if (order.deliveryStatus === "Delivered") {
        totalSold += pieces;
      }
    });
    
    // Un-Ordered = Received - (Ordered + Weight Loss + Rotten)
    // But since we want "Sold" to match the example, let's use:
    // Un-Ordered = Received - (Sold + Weight Loss + Rotten)
    totalUnOrdered = totalReceived - (totalSold + totalWeightLoss + totalRotten);
    
    // Calculate logistics summary
    const today = new Date().toISOString().split('T')[0];
    let totalOrdersToday = 0;
    let totalDelivered = 0;
    let totalUnDelivered = 0;
    let deliveredPendingAmount = 0;
    let undeliveredPendingAmount = 0;
    
    ordersData.forEach(order => {
      if (order.booking_date === today) {
        totalOrdersToday++;
      }
      if (order.deliveryStatus === "Delivered") {
        totalDelivered++;
        deliveredPendingAmount += parseFloat(order.pending_amount) || 0;
      } else {
        totalUnDelivered++;
        undeliveredPendingAmount += parseFloat(order.pending_amount) || 0;
      }
    });
    
    // Get current date
    const now = new Date();
    const day = now.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const dateStr = `${day} ${month.toUpperCase()} ${year}`;
    
    // Format numbers
    const formatCurrency = (amount) => {
      return 'Rs. ' + Math.round(amount).toLocaleString('en-PK');
    };
    
    const formatPieces = (pieces) => {
      return pieces.toLocaleString('en-PK') + ' Pcs';
    };
    
    const formatDozens = (pieces) => {
      return (pieces / 12).toFixed(1) + ' Dozens';
    };
    
    // Build message
    const message = `*TWF CRM STATS – ${dateStr}*


*💰 FINANCIAL SUMMARY:*

*Total Orders:* ${totalOrders}
*Total Sales:* ${formatCurrency(totalSales)}
*Payment Clearance:* ${paymentClearance} (${clearancePercentage}%)
*Received Payments:* ${formatCurrency(receivedPayments)}
*Pending Payments:* ${pendingPayments}
*Pending Payments Amount:* ${formatCurrency(pendingAmount)}

*📦 HALWA STOCK SUMMARY (ALL TIME):*

*Received:* ${formatPieces(Math.round(totalReceived))} (${formatDozens(totalReceived)})
*Sold:* ${formatPieces(Math.round(totalSold))} (${formatDozens(totalSold)})
*Weight Loss:* ${formatPieces(Math.round(totalWeightLoss))} (${formatDozens(totalWeightLoss)})
*Rotten:* ${formatPieces(Math.round(totalRotten))} (${formatDozens(totalRotten)})
*Un-Ordered:* ${formatPieces(Math.round(totalUnOrdered))} (${formatDozens(totalUnOrdered)})

*🚚 LOGISTICS & SALES SUMMARY:*

*Total Orders Today:* ${totalOrdersToday}
*Total Delivered Today:*

*Total Orders Delivered:* ${totalDelivered} (Pending: ${formatCurrency(deliveredPendingAmount)})
*Total Un-Delivered:* ${totalUnDelivered} (Pending: ${formatCurrency(undeliveredPendingAmount)})`;
    
    // Copy to clipboard
    await navigator.clipboard.writeText(message);
    
    // Visual feedback
    const btn = document.getElementById('copyStatsBtn');
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.backgroundColor = '#4CAF50';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.backgroundColor = '#5a3cf7';
    }, 2000);
    
  } catch (error) {
    console.error('Error copying stats:', error);
    alert('Error copying stats. Please try again.');
  }
  });
  
  // Copy Target Report Stats Button Functionality
  document.getElementById('copyTargetBtn').addEventListener('click', async function() {
  try {
    // Fetch orders data
    const ordersResponse = await fetch('AFetchHalwa.php');
    const ordersData = await ordersResponse.json();
    
    // Get current date
    const now = new Date();
    const day = now.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    
    // Get first day of current month
    const firstDayOfMonth = new Date(year, now.getMonth(), 1);
    firstDayOfMonth.setHours(0, 0, 0, 0);
    
    // Get last day of current month
    const lastDayOfMonth = new Date(year, now.getMonth() + 1, 0);
    lastDayOfMonth.setHours(23, 59, 59, 999);
    
    // Calculate days passed and remaining
    const daysPassed = Math.max(1, Math.ceil((now - firstDayOfMonth) / (1000 * 60 * 60 * 24)));
    const daysLeft = Math.max(0, Math.ceil((lastDayOfMonth - now) / (1000 * 60 * 60 * 24)));
    
    // Calculate sales for current month
    let monthlySales = 0;
    ordersData.forEach(order => {
      const orderDate = new Date(order.booking_date);
      orderDate.setHours(0, 0, 0, 0);
      if (orderDate >= firstDayOfMonth && orderDate <= now) {
        monthlySales += parseFloat(order.total_amount) || 0;
      }
    });
    
    // Target for the month
    const monthlyTarget = 1000000;
    const remaining = monthlyTarget - monthlySales;
    
    // Format currency
    const formatCurrency = (amount) => {
      return 'Rs. ' + Math.round(amount).toLocaleString('en-PK');
    };
    
    // Get ordinal suffix for day
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    // Build message
    const message = `*${month.toUpperCase()} TARGET REPORT*

*Date:* ${day}${getOrdinalSuffix(day)} ${month}, ${year}
*Sales:* ${formatCurrency(monthlySales)} / ${formatCurrency(monthlyTarget)}
*Days Passed:* ${daysPassed}
*Days Left:* ${daysLeft-1}
*Remaining:* ${formatCurrency(remaining)}`;
    
    // Copy to clipboard
    await navigator.clipboard.writeText(message);
    
    // Visual feedback
    const btn = document.getElementById('copyTargetBtn');
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.backgroundColor = '#4CAF50';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.backgroundColor = '#5a3cf7';
    }, 2000);
    
  } catch (error) {
    console.error('Error copying target report:', error);
    alert('Error copying target report. Please try again.');
  }
  });
});

</script>
</html>
