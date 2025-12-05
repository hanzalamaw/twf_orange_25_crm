//HAMBURGER MENU

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger');
    const closeBtn = document.querySelector('.close-btn');

    hamburger.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});

//ANIMATION TO INCREMENT STATS

function animateCounter(element, start, end, duration = 1000, prefix = "", suffix = "") {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}


// STATS (Qurbani)

let totalSales = 0;
let totalOrders = 0;

let paymentClearance = 0;
let receivedPayments = 0;
let clearancePerc = 0;

let pendingPayments = 0;
let pendingAmount = 0;

const sales = document.getElementById("sales");
const orders = document.getElementById("orders");

const clearance = document.getElementById("paymentClearance");
const received = document.getElementById("receivedPayments");
const clearancePercentage = document.getElementById("clearancePercentage");

const paymentsPen = document.getElementById("paymentsPen");
const amountPen = document.getElementById("amountPen");

function loadStats() {
    fetch("fetch_orders.php")
        .then(response => response.json())
        .then(data => {
            data.forEach(order => {
              if(order.order_type == "Hissa - Waqf" || order.order_type == "Hissa - Ijtemai" || order.order_type == "Hissa - Ijtemai (Premium)" ||
                order.order_type == "Cow" || order.order_type == "Goat" || order.order_type == "Goat (Hissa)"){
                if (order.pending_amount > 0) {
                    pendingPayments++;
                    pendingAmount += Number(order.pending_amount);
                }

                totalSales += Number(order.total_amount);
                totalOrders++;
              }
            });

            paymentClearance = totalOrders - pendingPayments;
            receivedPayments = totalSales - pendingAmount;
            clearancePerc = (paymentClearance*100) / totalOrders;

            animateCounter(orders, 0, totalOrders, 1000);
            animateCounter(sales, 0, totalSales, 1200, "Rs ");

            animateCounter(clearance, 0, paymentClearance, 1000);
            animateCounter(received, 0, receivedPayments, 1200, "Rs ");
            animateCounter(clearancePercentage, 0, clearancePerc, 1200, "", "%");

            animateCounter(paymentsPen, 0, pendingPayments, 1000);
            animateCounter(amountPen, 0, pendingAmount, 1200, "Rs ");
        })
        .catch(error => {
            console.error("Error loading orders:", error);
        });
}

loadStats();

sales.textContent = `PKR ${totalSales}`;
orders.textContent = `${totalOrders}`;
pendingPayments.textContent = `${pendingPayments}`;
pendingAmount.textContent = `PKR ${pendingAmount}`;

let displayHidden = true;

function hider() {
  if(displayHidden){
    sales.classList.remove("blur");
    orders.classList.remove("blur");
    clearance.classList.remove("blur");
    received.classList.remove("blur");
    clearancePercentage.classList.remove("blur");
    paymentsPen.classList.remove("blur");
    amountPen.classList.remove("blur");

    displayHidden = false;
    const hideImg = document.getElementById("hideImg").src = "imgs/show.png";
  }
  else {
    sales.classList.add("blur");
    orders.classList.add("blur");
    clearance.classList.add("blur");
    received.classList.add("blur");
    clearancePercentage.classList.add("blur");
    paymentsPen.classList.add("blur");
    amountPen.classList.add("blur");

    displayHidden = true;
    const hideImg = document.getElementById("hideImg").src = "imgs/hidden.png";
  }
}

// STATS (Fruits)

let totalSalesF = 0;
let totalOrdersF = 0;

let paymentClearanceF = 0;
let receivedPaymentsF = 0;
let clearancePercF = 0;

let pendingPaymentsF = 0;
let pendingAmountF = 0;

const salesF = document.getElementById("salesF");
const ordersF = document.getElementById("ordersF");

const clearanceF = document.getElementById("paymentClearanceF");
const receivedF = document.getElementById("receivedPaymentsF");
const clearancePercentageF = document.getElementById("clearancePercentageF");

const paymentsPenF = document.getElementById("paymentsPenF");
const amountPenF = document.getElementById("amountPenF");

function loadStatsF() {
    fetch("fetch_orders.php")
        .then(response => response.json())
        .then(data => {
            data.forEach(order => {
              if(order.order_type == "Mango - Chaunsa" || order.order_type == "Mango - Sindhri" || order.order_type == "Mango - Anwar Ratol" ){
                if (order.pending_amount > 0 ) {
                    pendingPaymentsF++;
                    pendingAmountF += Number(order.pending_amount);
                }

                totalSalesF += Number(order.total_amount);
                totalOrdersF++;
              }  
            });

            paymentClearanceF = totalOrdersF - pendingPaymentsF;
            receivedPaymentsF = totalSalesF - pendingAmountF;
            clearancePercF = (paymentClearanceF*100) / totalOrdersF;

            animateCounter(ordersF, 0, totalOrdersF, 1000);
            animateCounter(salesF, 0, totalSalesF, 1200, "Rs ");

            animateCounter(clearanceF, 0, paymentClearanceF, 1000);
            animateCounter(receivedF, 0, receivedPaymentsF, 1200, "Rs ");
            animateCounter(clearancePercentageF, 0, clearancePercF, 1200, "", "%");

            animateCounter(paymentsPenF, 0, pendingPaymentsF, 1000);
            animateCounter(amountPenF, 0, pendingAmountF, 1200, "Rs ");
        })
        .catch(error => {
            console.error("Error loading orders:", error);
        });
}

loadStatsF();

salesF.textContent = `PKR ${totalSalesF}`;
ordersF.textContent = `${totalOrdersF}`;
pendingPaymentsF.textContent = `${pendingPaymentsF}`;
pendingAmountF.textContent = `PKR ${pendingAmountF}`;

// BOOKED HISSA -----------------------------------------------------------------------------------------------------------------------

const totalHissa = 1000; // Total available slots
let bookedHissa = 0;  // Initial booked slots


function loadOrders() {
    fetch("fetch_orders.php")
        .then(response => response.json())
        .then(data => {
            bookedHissa = 0; 
            data.forEach(order => {
                if (order.order_type === "Hissa - Ijtemai" || order.order_type === "Hissa - Waqf" || order.order_type === "Hissa - Ijtemai (Premium)") {
                    bookedHissa++;
                }
            });

            // Automatically update after loading
            if (bookedHissa >= totalHissa) {
                updateOverProgress();
            } else {
                updateProgress();
            }
        })
        .catch(error => {
            console.error("Error loading orders:", error);
        });
}

function updateProgress() {
    const remainingHissa = totalHissa - bookedHissa;
    const progressCircle = document.getElementById("progressCircle");
    const bookedCount = document.getElementById("bookedCount");
    const remainingCount = document.getElementById("remainingCount");

    let percentage = (bookedHissa / totalHissa) * 100;
    let offset = 282.6 - (percentage / 100) * 282.6;

    // Update circle progress
    progressCircle.style.strokeDashoffset = offset;

    // Update text values
    bookedCount.innerText = bookedHissa;
    remainingCount.innerText = remainingHissa;
}

function updateOverProgress() {
    const remainingHissa = "Target Acheived!!";
    const progressCircle = document.getElementById("progressCircle");
    const bookedCount = document.getElementById("bookedCount");
    const remainingCount = document.getElementById("remainingCount");
    const remainingText = document.querySelector(".remaining");
    const bgCircle = document.getElementById("bgCircle");
    
    remainingText.textContent = `${remainingHissa}`;

    let percentage = (bookedHissa / totalHissa) * 100;
    let offset = 282.6 - (percentage / 100) * 282.6;

    // Update circle progress
    progressCircle.style.strokeDashoffset = offset;
    bgCircle.style.stroke = "rgba(255, 0, 0, 1)";

    // Update text values
    bookedCount.innerText = bookedHissa;
}

loadOrders();

// BOOKED COWS -----------------------------------------------------------------------------------------------------------------------

const totalCow = 20; // Total available slots
let bookedCow = 0;  // Initial booked slots

function loadOrdersC() {
    fetch("fetch_orders.php")
        .then(response => response.json())
        .then(data => {
            bookedCow = 0; 
            data.forEach(order => {
                if (order.order_type === "Cow") {
                    bookedCow++;
                }
            });

            // Automatically update after loading
            if (bookedCow >= totalCow) {
                updateOverProgressC();
            } else {
                updateProgressC();
            }
        })
        .catch(error => {
            console.error("Error loading orders:", error);
        });
}

function updateProgressC() {
    const remainingCow = totalCow - bookedCow;
    const CprogressCircle = document.getElementById("CprogressCircle");
    const CbookedCount = document.getElementById("CbookedCount");
    const CremainingCount = document.getElementById("CremainingCount");

    let percentage = (bookedCow / totalCow) * 100;
    let offset = 282.6 - (percentage / 100) * 282.6;

    // Update circle progress
    CprogressCircle.style.strokeDashoffset = offset;

    // Update text values
    CbookedCount.innerText = bookedCow;
    CremainingCount.innerText = remainingCow;
}

function updateOverProgressC() {
    const remainingCow = "Target Acheived!!";
    const CprogressCircle = document.getElementById("CprogressCircle");
    const CbookedCount = document.getElementById("CbookedCount");
    const CremainingCount = document.getElementById("CremainingCount");
    const CremainingText = document.querySelector(".Cremaining");
    const CbgCircle = document.getElementById("CbgCircle");
    
    CremainingText.textContent = `${remainingCow}`;

    let percentage = (bookedCow / totalHissa) * 100;
    let offset = 282.6 - (percentage / 100) * 282.6;

    // Update circle progress
    CprogressCircle.style.strokeDashoffset = offset;
    CbgCircle.style.stroke = "rgba(255, 0, 0, 1)";

    // Update text values
    CbookedCount.innerText = bookedCow;
}

loadOrdersC();

// BOOKED COWS -----------------------------------------------------------------------------------------------------------------------

const totalGoats = 70; // Total available slots
let bookedGoats = 0;  // Initial booked slots

function loadOrdersG() {
    fetch("fetch_orders.php")
        .then(response => response.json())
        .then(data => {
            bookedGoats = 0; 
            data.forEach(order => {
                if (order.order_type === "Goat" || order.order_type === "Goat (Hissa)") {
                    bookedGoats++;
                }
            });

            // Automatically update after loading
            if (bookedGoats >= totalGoats) {
                updateOverProgressG();
            } else {
                updateProgressG();
            }
        })
        .catch(error => {
            console.error("Error loading orders:", error);
        });
}

function updateProgressG() {
    const remainingGoats = totalGoats - bookedGoats;
    const GprogressCircle = document.getElementById("GprogressCircle");
    const GbookedCount = document.getElementById("GbookedCount");
    const GremainingCount = document.getElementById("GremainingCount");

    let percentage = (bookedGoats / totalGoats) * 100;
    let offset = 282.6 - (percentage / 100) * 282.6;

    // Update circle progress
    GprogressCircle.style.strokeDashoffset = offset;

    // Update text values
    GbookedCount.innerText = bookedGoats;
    GremainingCount.innerText = remainingGoats;
}

function updateOverProgressG() {
    const remainingGoats = "Target Acheived!!";
    const GprogressCircle = document.getElementById("GprogressCircle");
    const GbookedCount = document.getElementById("GbookedCount");
    const GremainingCount = document.getElementById("GremainingCount");
    const GremainingText = document.querySelector(".Gremaining");
    const GbgCircle = document.getElementById("GbgCircle");
    
    GremainingText.textContent = `${remainingGoats}`;

    let percentage = (bookedGoats / totalGoats) * 100;
    let offset = 282.6 - (percentage / 100) * 282.6;

    // Update circle progress
    GprogressCircle.style.strokeDashoffset = offset;
    GbgCircle.style.stroke = "rgba(255, 0, 0, 1)";

    // Update text values
    GbookedCount.innerText = bookedGoats;
}

loadOrdersG();

//COW WISE BOOKING STATUS

/*let allOrders = [];

function fetchCowHissaStatus() {
  fetch('fetch_orders.php')
    .then(res => res.json())
    .then(data => {
      allOrders = data;
      renderCowHissaStatus();
    });
}

function renderCowHissaStatus() {
  const container = document.getElementById('statusContainer');
  container.innerHTML = '';

  const cowMinInput = document.getElementById("cowMin").value.trim();
  const cowMaxInput = document.getElementById("cowMax").value.trim();
  const bookingStatus = document.getElementById("bookingFilter").value;

  const cowMin = cowMinInput ? parseInt(cowMinInput) : null;
  const cowMax = cowMaxInput ? parseInt(cowMaxInput) : null;

  const bookedMap = {};
  allOrders.forEach(order => {
    const key = `${order.cow_number}-${order.hissa_number}`;
    bookedMap[key] = {
      day: order.day,
      order_type: order.order_type
    };
  });

  const cowNumbers = allOrders
    .map(o => parseInt(o.cow_number))
    .filter(n => !isNaN(n));

  const defaultMin = Math.min(...cowNumbers);
  const defaultMax = Math.max(...cowNumbers);

  const minCow = cowMin !== null ? cowMin : defaultMin;
  const maxCow = cowMax !== null ? cowMax : defaultMax;

  for (let cow = minCow; cow <= maxCow; cow++) {
    let cowHasData = false;

    const cowHeadingRow = document.createElement("tr");
    cowHeadingRow.classList.add("cow-heading-row");
    cowHeadingRow.innerHTML = `
      <th colspan="4" class="cow-group-heading">
        <div >Cow # ${String(cow).padStart(2, '0')}</div>
      </th>
    `;

    // Prepare hissa rows
    const cowRows = [];

    for (let hissa = 1; hissa <= 7; hissa++) {
      const key = `${cow}-${hissa}`;
      const isBooked = bookedMap.hasOwnProperty(key);

      if (
        (bookingStatus === "booked" && !isBooked) ||
        (bookingStatus === "not-booked" && isBooked)
      ) continue;

      const day = isBooked ? bookedMap[key].day : "-";
      const orderType = isBooked ? bookedMap[key].order_type : "-";
      const statusClass = isBooked ? "booked" : "not-booked";
      const statusText = isBooked ? "Booked" : "Not Booked";

      cowHasData = true;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="cow-status-td">${hissa}</td>
        <td class="cow-status-td">${day}</td>
        <td class="cow-status-td">${orderType}</td>
        <td class="cow-status-td">
          <span class="badge ${statusClass}">${statusText}</span>
        </td>
      `;
      cowRows.push(row);
    }

    // Append to DOM if cow has at least one hissa to show
    if (cowHasData) {
      container.appendChild(cowHeadingRow);
      cowRows.forEach(r => container.appendChild(r));
    }
  }
}

function filterCowStatus() {
  renderCowHissaStatus();
}

fetchCowHissaStatus();*/

//REFERENCE-WISE SUMMARY

function displayOrderSummary(name, id) {
    fetch("fetch_orders.php")
      .then(response => response.json())
      .then(data => {
        let count = 0;
        data.forEach(order => {
          if (order.refrence === name && (order.order_type == "Hissa - Waqf" || order.order_type == "Hissa - Ijtemai" || order.order_type == "Hissa - Ijtemai (Premium)" ||
                order.order_type == "Cow" || order.order_type == "Goat" || order.order_type == "Goat (Hissa)")) {
            count++;
          }
        });
        document.getElementById(id).textContent = count;
      })
      .catch(error => {
        console.error("Error loading orders:", error);
      });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const references = [
      { name: "Ashhad Bhai", id: "ashhad-bhai" },
      { name: "Ammar Bhai", id: "ammar-bhai" },
      { name: "Huzaifa", id: "huzaifa" },
      { name: "Ashhal", id: "ashhal" },
      { name: "Abuzar", id: "abuzar" },
      { name: "Fayez", id: "fayez" },
      { name: "Omer", id: "omer" },
      { name: "Arsalan", id: "arsalan" },
      { name: "Hanzala", id: "hanzala" },
      { name: "Rohan", id: "rohan" },
      { name: "Abdullah Rizwan (External)", id: "abdullah-rizwan" },
      { name: "Amin ul Qadir (External)", id: "amin-ul-qadir" },
      { name: "Zohaib Mughal (External)", id: "zohaib-mughal" },
      { name: "Saad Ifthikhar (External)", id: "saad-ifthikhar" },
      { name: "Fahad Bhai (External)", id: "fahad-bhai" },
      { name: "Ahmed Raza (External)", id: "ahmed-raza" },
      { name: "Saqib Mustafa (External)", id: "saqib-mustafa" },
      { name: "Riaz Zaheer (External)", id: "riaz-zaheer" },
      { name: "PR & Ambassasdor", id: "pr-ambassador" },
    ];

    references.forEach(ref => {
      displayOrderSummary(ref.name, ref.id);
    });
  });
  
  //SOURCE-WISE SUMMARY

function displaySourceSummary(name, id) {
    fetch("fetch_orders.php")
      .then(response => response.json())
      .then(data => {
        let count = 0;
        data.forEach(order => {
          if (order.order_source === name && (order.order_type == "Hissa - Waqf" || order.order_type == "Hissa - Ijtemai" || order.order_type == "Hissa - Ijtemai (Premium)" ||
                order.order_type == "Cow" || order.order_type == "Goat" || order.order_type == "Goat (Hissa)")) {
            count++;
          }
        });
        document.getElementById(id).textContent = count;
      })
      .catch(error => {
        console.error("Error loading orders:", error);
      });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const references = [
      { name: "Whatsapp (Socail Media Ads)", id: "Whatsapp-(Socail-Media-Ads)" },
      { name: "Whatsapp (New PR)", id: "Whatsapp-(New-PR)" },
      { name: "Whatsapp (Old PR)", id: "Whatsapp-(Old-PR)" },
      { name: "Social Media Engagement", id: "Social-Media-Engagement" },
      { name: "Calling (Corporate)", id: "Calling-(Corporate)" },
      { name: "Calling (Previus Customer)", id: "Calling-(Previus-Customer)" },
      { name: "Calling (New Data)", id: "Calling-(New-Data)" },
      { name: "Ambassador Program", id: "Ambassador-Program" },
      { name: "Website", id: "Website" },
      { name: "Farm", id: "Farm" }
    ];


    references.forEach(ref => {
      displaySourceSummary(ref.name, ref.id);
    });
  });

//ORDER SUMMARY

let allOrders = [];

function fetchTransactions() {
  fetch('fetchQurbaniOrders.php')
    .then(res => res.json())
    .then(data => {
      allOrders = data;
      renderTransactions(allOrders);
    });
}

// Total orders per category per day
let totalIjtemai1 = 0;
let totalIjtemai2 = 0;
let totalPremium1 = 0;
let totalPremium2 = 0;
let totalWaqf1 = 0;
let totalWaqf2 = 0;

// Received complete payment
let receivedIjtemai1 = 0;
let receivedIjtemai2 = 0;
let receivedPremium1 = 0;
let receivedPremium2 = 0;
let receivedWaqf1 = 0;
let receivedWaqf2 = 0;

// Completely pending (no payment received)
let cPendingIjtemai1 = 0;
let cPendingIjtemai2 = 0;
let cPendingPremium1 = 0;
let cPendingPremium2 = 0;
let cPendingWaqf1 = 0;
let cPendingWaqf2 = 0;

// Partially pending (some payment received but not fully)
let pPendingIjtemai1 = 0;
let pPendingIjtemai2 = 0;
let pPendingPremium1 = 0;
let pPendingPremium2 = 0;
let pPendingWaqf1 = 0;
let pPendingWaqf2 = 0;

function renderTransactions(data) {
  // Reset all counters
  totalIjtemai1 = totalIjtemai2 = totalPremium1 = totalPremium2 = totalWaqf1 = totalWaqf2 = 0;
  receivedIjtemai1 = receivedIjtemai2 = receivedPremium1 = receivedPremium2 = receivedWaqf1 = receivedWaqf2 = 0;
  cPendingIjtemai1 = cPendingIjtemai2 = cPendingPremium1 = cPendingPremium2 = cPendingWaqf1 = cPendingWaqf2 = 0;
  pPendingIjtemai1 = pPendingIjtemai2 = pPendingPremium1 = pPendingPremium2 = pPendingWaqf1 = pPendingWaqf2 = 0;

  const container1 = document.getElementById('ordersContainer1');
  container1.innerHTML = '';

  const container2 = document.getElementById('ordersContainer2');
  container2.innerHTML = '';

  data.forEach(order => {
    if(order.day == "First"){
      switch(order.order_type){
        case "Hissa - Ijtemai":
          totalIjtemai1++;
          if(order.pending_amount == 0){
            receivedIjtemai1++;
          }
          else if(order.received_amount == 0){
            cPendingIjtemai1++;
          }
          else{
            pPendingIjtemai1++;
          }
          break;

        case "Hissa - Ijtemai (Premium)":
          totalPremium1++;
          if(order.pending_amount == 0){
            receivedPremium1++;
          }
          else if(order.received_amount == 0){
            cPendingPremium1++;
          }
          else{
            pPendingPremium1++;
          }
          break;

        case "Hissa - Waqf":
          totalWaqf1++;
          if(order.pending_amount == 0){
            receivedWaqf1++;
          }
          else if(order.received_amount == 0){
            cPendingWaqf1++;
          }
          else{
            pPendingWaqf1++;
          }
          break;
      }
    }
    else if(order.day == "Second") {
      switch(order.order_type){
        case "Hissa - Ijtemai":
          totalIjtemai2++;
          if(order.pending_amount == 0){
            receivedIjtemai2++;
          }
          else if(order.received_amount == 0){
            cPendingIjtemai2++;
          }
          else{
            pPendingIjtemai2++;
          }
          break;

        case "Hissa - Ijtemai (Premium)":
          totalPremium2++;
          if(order.pending_amount == 0){
            receivedPremium2++;
          }
          else if(order.received_amount == 0){
            cPendingPremium2++;
          }
          else{
            pPendingPremium2++;
          }
          break;

        case "Hissa - Waqf":
          totalWaqf2++;
          if(order.pending_amount == 0){
            receivedWaqf2++;
          }
          else if(order.received_amount == 0){
            cPendingWaqf2++;
          }
          else{
            pPendingWaqf2++;
          }
          break;
      }
    }
  });

  // Now render the tables with these counters
    container1.appendChild(createRow('Total Orders', totalIjtemai1, totalPremium1, totalWaqf1, totalIjtemai1 + totalPremium1 + totalWaqf1));
container1.appendChild(createRow('Received (Complete Payment)', receivedIjtemai1, receivedPremium1, receivedWaqf1, receivedIjtemai1 + receivedPremium1 + receivedWaqf1));
container1.appendChild(createRow('Completely Pending (No Payment)', cPendingIjtemai1, cPendingPremium1, cPendingWaqf1, cPendingIjtemai1 + cPendingPremium1 + cPendingWaqf1));
container1.appendChild(createRow('Partially Pending (Partial Payment)', pPendingIjtemai1, pPendingPremium1, pPendingWaqf1, pPendingIjtemai1 + pPendingPremium1 + pPendingWaqf1));

container2.appendChild(createRow('Total Orders', totalIjtemai2, totalPremium2, totalWaqf2, totalIjtemai2 + totalPremium2 + totalWaqf2));
container2.appendChild(createRow('Received (Complete Payment)', receivedIjtemai2, receivedPremium2, receivedWaqf2, receivedIjtemai2 + receivedPremium2 + receivedWaqf2));
container2.appendChild(createRow('Completely Pending (No Payment)', cPendingIjtemai2, cPendingPremium2, cPendingWaqf2, cPendingIjtemai2 + cPendingPremium2 + cPendingWaqf2));
container2.appendChild(createRow('Partially Pending (Partial Payment)', pPendingIjtemai2, pPendingPremium2, pPendingWaqf2, pPendingIjtemai2 + pPendingPremium2 + pPendingWaqf2));
}

function createRow(label, val1, val2, val3, val4) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td style="text-align: left;">${label}</td>
    <td>${val1}</td>
    <td>${val2}</td>
    <td>${val3}</td>
    <td>${val4}</td>
  `;
  return row;
}

fetchTransactions();