<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TWF - Dashboard</title>
    <link rel="stylesheet" href="index.css?v=<?= filemtime('index.css') ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
    <link rel="icon" href="imgs/favicon.png">
</head>
<body>
    <nav class="sidebar">
        <button class="close-btn"><i class="fa-solid fa-xmark"></i></button>
        <ul>
            <li class="active"><a href="index.html">Dashboard <span>›</span></a></li>
            <li><a href="AFruitNewOrder.html" class="hovere">Add New Order (Fruits)<span>›</span></a></li>
            <li><a href="AManageFruits.html" class="hovere">Orders Management (Fruits)<span>›</span></a></li>
            <li><a href="AFruitTransactions.html" class="hovere">Transactions <span>›</span></a></li>
            <li><a href="Expenses.html" class="hovere">Expenses <span>›</span></a></li>
            <li><a href="AFruitStats.html" class="hovere">Weekly Stats <span>›</span></a></li>
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
            <h1>ORANGES</h1>
        </div>

        <div class="hider">
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
                    <h1>Oranges</h1>
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
        
    <script src="index.js?v=<?= filemtime('index.js') ?>"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</body>
<script>
fetch('AFetchFruits.php')
  .then(response => response.json())
  .then(data => {
    // Step 1: Group orders by date
    const salesByDate = {};

    data.forEach(order => {
      const date = order.booking_date; 
      if (salesByDate[date]) {
        salesByDate[date] += 1; // Increment count
      } else {
        salesByDate[date] = 1; // Start counting
      }
    });

    // Step 2: Prepare arrays for chart
    const dates = Object.keys(salesByDate).sort(); // Sort by date
    const sales = dates.map(date => salesByDate[date]);

    // Step 3: Build the chart
    var options = {
      chart: {
        type: 'line',
        height: 400
      },
      series: [{
        name: 'Sales',
        data: sales
      }],
      xaxis: {
        categories: dates,
        labels: {
            show: false // <-- this hides the labels
        }
      },
      stroke: {
        curve: 'smooth'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  })
  .catch(error => console.error('Error fetching orders:', error));
</script>
</html>
