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


let petiDelivered = 0;
let fiveDelivered = 0;
let tenDelivered = 0;

const sales = document.getElementById("sales");
const orders = document.getElementById("orders");

const clearance = document.getElementById("paymentClearance");
const received = document.getElementById("receivedPayments");
const clearancePercentage = document.getElementById("clearancePercentage");

const paymentsPen = document.getElementById("paymentsPen");
const amountPen = document.getElementById("amountPen");

const petiDone = document.getElementById("petiDone");
const fiveBoxDone = document.getElementById("5BoxDone");
const tenBoxDone = document.getElementById("10BoxDone");

function loadStats() {
    fetch("AFetchHalwa.php")
        .then(response => response.json())
        .then(data => {
            data.forEach(order => {
              if (order.pending_amount > 0) {
                  pendingPayments++;
                  pendingAmount += Number(order.pending_amount);
              }

              totalSales += Number(order.total_amount);
              totalOrders++;

              
              if(order.deliveryStatus == "Delivered") {
                //actualTotalDelivered += (parseFloat(order.weight.match(/^\d+(\.\d+)?/)?.[0]) || 0) * order.quantity;
                (order.weight == "5KG - Premium")? fiveDelivered += Number(order.quantity) : (order.weight == "10KG - Premium")? tenDelivered += Number(order.quantity) : "";
                (order.weight == "5KG - Wooden Box")? petiDelivered += Number(order.quantity) : (order.weight == "10KG - Wooden Box")? petiDelivered += Number(order.quantity) : "";
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

            animateCounter(petiDone, 0, petiDelivered, 1000);
            animateCounter(fiveBoxDone, 0, fiveDelivered, 1200);
            animateCounter(tenBoxDone, 0, tenDelivered, 1200);
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
    petiDone.classList.remove("blur");
    fiveBoxDone.classList.remove("blur");
    tenBoxDone.classList.remove("blur");

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
    petiDone.classList.add("blur");
    fiveBoxDone.classList.add("blur");
    tenBoxDone.classList.add("blur");

    displayHidden = true;
    const hideImg = document.getElementById("hideImg").src = "imgs/hidden.png";
  }
}

//SOURCE-WISE SUMMARY

function displaySourceSummary(name, id) {
    fetch("AFetchHalwa.php")
      .then(response => response.json())
      .then(data => {
        let count = 0;
        data.forEach(order => {
          if (order.source === name) {
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
      { name: "Whatsapp (Social Media Ads)", id: "Whatsapp-(Social-Media-Ads)" },
      { name: "Whatsapp (New PR)", id: "Whatsapp-(New-PR)" },
      { name: "Whatsapp (Old PR)", id: "Whatsapp-(Old-PR)" },
      { name: "Social Media Engagement", id: "Social-Media-Engagement" },
      { name: "Calling (Corporate)", id: "Calling-(Corporate)" },
      { name: "Calling (Previous Customer)", id: "Calling-(Previous-Customer)" },
      { name: "Calling (New Data)", id: "Calling-(New-Data)" },
      { name: "Ambassador Program", id: "Ambassador-Program" },
      { name: "Website", id: "Website" }
    ];


    references.forEach(ref => {
      displaySourceSummary(ref.name, ref.id);
    });
  });

//ORDER SUMMARY

let allStats = [];

let totalPetiLoss = 0;
let totalKharab = 0;
let totalDelivered = 0;
let totalReceived = 0;


let actualTotalDelivered = 0;
let actualDelivered = 0;
let totalunDelivered = 0;
let unDelivered = 0;

let ordered = 0;
let unordered = 0;

let deliveredPendingAmount = 0;
let undeliveredPendingAmount = 0;
let totalDeliveredPendingAmount = 0;
let totalUndeliveredPendingAmount = 0;

let allHalwa = [];

// Helper function to convert weight string to kilograms
function convertWeightToKg(weightStr) {
  if (!weightStr) return 0;
  const str = weightStr.toLowerCase().trim();
  // Match number and unit (g, kg, or just number)
  const match = str.match(/^(\d+(?:\.\d+)?)\s*(g|kg)?/);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2] || '';
  // If unit is 'g' or missing and value < 10, assume grams; otherwise assume kg
  if (unit === 'g' || (unit === '' && value < 10)) {
    return value / 1000; // Convert grams to kg
  }
  return value; // Already in kg
}

function fetchTransactions() {
  fetch('fetch_halwa_stats.php')
    .then(res => res.json())
    .then(data => {
      allStats = data.reverse();
      renderTransactions(allStats, allHalwa);
    });
}

function fetchHalwa() {
  return fetch('AFetchHalwa.php')
    .then(res => res.json())
    .then(data => {
      allHalwa = data.reverse();
    });
}

function renderTransactions(data, halwa) {
  const container1 = document.getElementById('ordersContainer1');
  container1.innerHTML = '';

  const reversedData = data.reverse();

  // Render each week's data
  reversedData.forEach(stat => {
    totalPetiLoss += parseFloat(stat.weight_loss);
    totalKharab += parseFloat(stat.rotten);
    totalDelivered += parseFloat(stat.kgs_delivered);
    totalReceived += parseFloat(stat.kgs_received);
    actualDelivered = 0;
    unDelivered = 0;
    ordered = 0;
    deliveredPendingAmount = 0;
    undeliveredPendingAmount = 0;
    halwa.forEach(data => {
      const weightKg = convertWeightToKg(data.weight || '');
      if(data.week == stat.week && data.deliveryStatus == "Delivered"){
        actualDelivered += weightKg * data.quantity;
        deliveredPendingAmount += Number(data.pending_amount) || 0;
      }

      if(data.week == stat.week && data.deliveryStatus != "Delivered"){
        undeliveredPendingAmount += Number(data.pending_amount) || 0;
      }

      if(data.week == stat.week){
        ordered += weightKg * data.quantity;
      }
    });

    actualTotalDelivered += actualDelivered;
    totalDeliveredPendingAmount += deliveredPendingAmount;
    totalUndeliveredPendingAmount += undeliveredPendingAmount;
    totalunDelivered = totalReceived - (actualTotalDelivered + totalPetiLoss + totalKharab);
    unordered   = parseFloat(stat.kgs_received) - (ordered + parseFloat(stat.weight_loss) + parseFloat(stat.rotten));
    unDelivered = parseFloat(stat.kgs_received) - (actualDelivered + parseFloat(stat.weight_loss) + parseFloat(stat.rotten));

    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td style="text-align: left;">${stat.week}</td>
      <td style="text-align: left;">${parseFloat(stat.kgs_received).toFixed(2)} Kgs</td>
      <td style="text-align: left;">${parseFloat(stat.weight_loss).toFixed(2)} Kgs</td>
      <td style="text-align: left;">${parseFloat(stat.rotten).toFixed(2)} Kgs</td>
      <td style="text-align: left;">${parseFloat(actualDelivered).toFixed(2)} Kgs (Rs. ${deliveredPendingAmount.toLocaleString()})</td>
      <td style="text-align: left;">${parseFloat(unDelivered).toFixed(2)} Kgs (Rs. ${undeliveredPendingAmount.toLocaleString()})</td>
      <td style="text-align: left;">${parseFloat(ordered).toFixed(2)} Kgs</td>
      <td style="text-align: left;">${parseFloat(unordered).toFixed(2)} Kgs</td>
    `;
    
    //<td style="text-align: left;">${parseFloat(stat.kgs_delivered).toFixed(0)} Pcs</td>
    container1.appendChild(row);
  });

  const row = document.createElement('tr');
    
  row.innerHTML = `
    <td style="text-align: left; font-weight: bold; color: #07C339; border-top: 0.1rem solid #07C339; border-bottom: 0.1rem solid #07C339;">TOTAL</td>
    <td style="text-align: left; font-weight: bold; color: #07C339; border-top: 0.1rem solid #07C339; border-bottom: 0.1rem solid #07C339;">${parseFloat(totalReceived).toFixed(2)} Kgs</td>
    <td style="text-align: left; font-weight: bold; color: #07C339; border-top: 0.1rem solid #07C339; border-bottom: 0.1rem solid #07C339;">${parseFloat(totalPetiLoss).toFixed(2)} Kgs</td>
    <td style="text-align: left; font-weight: bold; color: #07C339; border-top: 0.1rem solid #07C339; border-bottom: 0.1rem solid #07C339;">${parseFloat(totalKharab).toFixed(2)} Kgs</td>
    <td style="text-align: left; font-weight: bold; color: #07C339; border-top: 0.1rem solid #07C339; border-bottom: 0.1rem solid #07C339;">${parseFloat(actualTotalDelivered).toFixed(2)} Kgs (Rs. ${totalDeliveredPendingAmount.toLocaleString()})</td>
    <td style="text-align: left; font-weight: bold; color: #07C339; border-top: 0.1rem solid #07C339; border-bottom: 0.1rem solid #07C339;">${parseFloat(totalunDelivered).toFixed(2)} Kgs (Rs. ${totalUndeliveredPendingAmount.toLocaleString()})</td>
    <td style="text-align: left; font-weight: bold; color: #07C339; border-top: 0.1rem solid #07C339; border-bottom: 0.1rem solid #07C339;">-</td>
    <td style="text-align: left; font-weight: bold; color: #07C339; border-top: 0.1rem solid #07C339; border-bottom: 0.1rem solid #07C339;">-</td>
    
  `;

  //<td style="text-align: left; font-weight: bold; color: #07C339; border-top: 0.1rem solid #07C339; border-bottom: 0.1rem solid #07C339;">${parseFloat(totalDelivered).toFixed(0)} Pcs</td>

  container1.appendChild(row);
}

fetchHalwa().then(() => { fetchTransactions(); });