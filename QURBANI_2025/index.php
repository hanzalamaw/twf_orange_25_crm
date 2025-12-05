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
            <li><a href="New_Order.html" class="hovere">Add New Order <span>›</span></a></li>
            <li><a href="Order_Management.html" class="hovere">Orders Management <span>›</span></a></li>
            <li><a href="newOrderFruits.html" class="hovere">Add New Order (Fruits)<span>›</span></a></li>
            <li><a href="Order_Manage_Fruits.html" class="hovere">Orders Management (Fruits)<span>›</span></a></li>
            <li><a href="transactions.html" class="hovere">Transactions <span>›</span></a></li>
            <li><a href="Expenses.html" class="hovere">Expenses <span>›</span></a></li>
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
            <h1>QURBANI</h1>
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
        </section>

        <section class="inventory-status">
            <h2>INVENTORY STATUS</h2>
            <div class="charts">
                <!-- HISSA -->

                <div class="progress-container">
                    <svg width="220" height="220" viewBox="0 0 100 100">
                        <!-- Background Circle -->
                        <circle id="bgCircle" cx="50" cy="50" r="45" stroke="#f2f2f2" stroke-width="10" fill="none" />
                        <!-- Progress Circle -->
                        <circle id="progressCircle" cx="50" cy="50" r="45" stroke="#5A33E8" stroke-width="10" fill="none"
                                stroke-dasharray="282.6" stroke-dashoffset="282.6" />
                    </svg>
                
                    <div class="progress-text">
                        <p style="color: gray;">Hissa Booked</p>
                        <h2 id="bookedCount">350</h2>
                        <p class="remaining" >Remaining: <span id="remainingCount">350</span></p>
                    </div>
                </div>

                <!-- COWS -->

                <div class="progress-container">
                    <svg width="220" height="220" viewBox="0 0 100 100">
                        <!-- Background Circle -->
                        <circle id="CbgCircle" cx="50" cy="50" r="45" stroke="#f2f2f2" stroke-width="10" fill="none" />
                        <!-- Progress Circle -->
                        <circle id="CprogressCircle" cx="50" cy="50" r="45" stroke="#5A33E8" stroke-width="10" fill="none"
                                stroke-dasharray="282.6" stroke-dashoffset="282.6" />
                    </svg>
                
                    <div class="progress-text">
                        <p style="color: gray;">Cows Sold</p>
                        <h2 id="CbookedCount">350</h2>
                        <p class="Cremaining" >Remaining: <span id="CremainingCount">350</span></p>
                    </div>
                </div>

                <!-- GOATS -->

                <div class="progress-container">
                    <svg width="220" height="220" viewBox="0 0 100 100">
                        <!-- Background Circle -->
                        <circle id="GbgCircle" cx="50" cy="50" r="45" stroke="#f2f2f2" stroke-width="10" fill="none" />
                        <!-- Progress Circle -->
                        <circle id="GprogressCircle" cx="50" cy="50" r="45" stroke="#5A33E8" stroke-width="10" fill="none"
                                stroke-dasharray="282.6" stroke-dashoffset="282.6" />
                    </svg>
                
                    <div class="progress-text">
                        <p style="color: gray;">Goats Sold</p>
                        <h2 id="GbookedCount">350</h2>
                        <p class="Gremaining" >Remaining: <span id="GremainingCount">350</span></p>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <section class="orderSummary">
        <h2>DAY-WISE HISSA ORDER SUMMARY</h2>
        <div class="align">
            <div class="daySection">
                <div class="head">
                    <h1>DAY 1</h1>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Ijtimai</th>
                            <th>Premium</th>
                            <th>Waqf</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody id="ordersContainer1"></tbody>
                </table>
            </div>

            <div class="daySection">
                <div class="head">
                    <h1>DAY 2</h1>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Ijtimai</th>
                            <th>Premium</th>
                            <th>Waqf</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody id="ordersContainer2"></tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- <div class="cow-status-wrapper">
        <div class="cow-status-header">
            <h2 class="cow-status-title">COW WISE HISSA BOOKING STATUS</h2>
            <div class="controls">
              <input type="number" id="cowMin" placeholder="Min Cow No" oninput="filterCowStatus()" />
              <input type="number" id="cowMax" placeholder="Max Cow No" oninput="filterCowStatus()" />
              <select id="bookingFilter" onchange="filterCowStatus()">
                <option value="">All</option>
                <option value="booked">Booked</option>
                <option value="not-booked">Not Booked</option>
              </select>
            </div>
          </div>
      
          <table class="cow-status-table">
            <thead class="cow-status-thead">
              <tr>
                <th class="cow-status-th">Hissa No</th>
                <th class="cow-status-th">Day</th>
                <th class="cow-status-th">Type</th>
                <th class="cow-status-th">Status</th>
              </tr>
            </thead>
            <tbody id="statusContainer"></tbody>
          </table>
      </div> -->

    <section class="performance">
        <h2>REFERENCE-WISE ORDER SUMMARY</h2>

        <div class="performances">
            <div class="performer"><div class="info"><img src="imgs/profile.png" alt="profile" /><h3>Ashhad Bhai</h3></div><p id="ashhad-bhai"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Ammar Bhai</h3></div><p id="ammar-bhai"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Huzaifa</h3></div><p id="huzaifa"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Ashhal</h3></div><p id="ashhal"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Abuzar</h3></div><p id="abuzar"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Fayez</h3></div><p id="fayez"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Omer</h3></div><p id="omer"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Arsalan</h3></div><p id="arsalan"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Hanzala</h3></div><p id="hanzala"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Rohan</h3></div><p id="rohan"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Abdullah Rizwan (External)</h3></div><p id="abdullah-rizwan"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Amin ul Qadir (External)</h3></div><p id="amin-ul-qadir"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Zohaib Mughal (External)</h3></div><p id="zohaib-mughal"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Saad Ifthikhar (External)</h3></div><p id="saad-ifthikhar"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Fahad Bhai (External)</h3></div><p id="fahad-bhai"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Ahmed Raza (External)</h3></div><p id="ahmed-raza"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Saqib Mustafa (External)</h3></div><p id="saqib-mustafa"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>Riaz Zaheer (External)</h3></div><p id="riaz-zaheer"></p></div>
            <div class="performer"><div class="info"><img src="imgs/profile.png"><h3>PR & Ambassador</h3></div><p id="pr-ambassador"></p></div>
        </div>
    </section>
    
    <section class="performance">
        <h2>SOURCE-WISE ORDER SUMMARY</h2>

        <div class="performances">
            <div class="performer"><div class="info"><img src="imgs/source.png" alt="profile" /><h3>Whatsapp (Socail Media Ads)</h3></div><p id="Whatsapp-(Socail-Media-Ads)"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Whatsapp (New PR)</h3></div><p id="Whatsapp-(New-PR)"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Whatsapp (Old PR)</h3></div><p id="Whatsapp-(Old-PR)"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Social Media Engagement</h3></div><p id="Social-Media-Engagement"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Calling (Corporate)</h3></div><p id="Calling-(Corporate)"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Calling (Previus Customer)</h3></div><p id="Calling-(Previus-Customer)"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Calling (New Data)</h3></div><p id="Calling-(New-Data)"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Ambassador Program</h3></div><p id="Ambassador-Program"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Website</h3></div><p id="Website"></p></div>
            <div class="performer"><div class="info"><img src="imgs/source.png"><h3>Farm</h3></div><p id="Farm"></p></div>
        </div>
    </section>

    <div class="seperator" style="margin-top: 0rem !important;">
            <h1>FRUITS</h1>
        </div>

    <section class="summary">
            <div class="summary-card">
                <img src="imgs/icon1.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Total Orders (Fruits)</span>
                    <span id="ordersF" class="value">1,893</span>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/icon2.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Payments Clearance (Fruits)</span>
                    <div style="display: flex; justify-content: row; align-items: baseline; gap: 1rem;">
                        <span id="paymentClearanceF" class="value">189</span>
                        <span id="clearancePercentageF" style="font-size: 1.3rem; color: #07C339; font-weight: 500;">58%</span>
                    </div>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/icon3.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Pending Payments (Fruits)</span>
                    <span id="paymentsPenF" class="value">189</span>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/icon4.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Total Sales (Fruits)</span>
                    <span id="salesF" class="value">Rs 650,000</span>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/icon5.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Received Payments (Fruits)</span>
                    <span id="receivedPaymentsF" class="value">Rs 63,650,000</span>
                </div>
            </div>
            <div class="summary-card">
                <img src="imgs/icon6.png" alt="Icon" style="width: 5.5rem; height: 5.5rem;">
                <div class="card-info">
                    <span class="label">Pending Amount (Fruits)</span>
                    <span id="amountPenF" class="value">Rs 650,000</span>
                </div>
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
fetch('fetch_orders.php')
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
