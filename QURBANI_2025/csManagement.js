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

//DISPLAY ORDERS

let allOrders = [];
let allRiders = [];

function fetchTransactions() {
  fetch('fetch_orders_riders.php')
    .then(res => res.json())
    .then(data => {
      allOrders = sortOrders(data.orders);
      allRiders = data.riders;
      renderTransactions(allOrders, allRiders);
    });
}

function sortOrders(data) {
  const slotOrder = {
    'SLOT 1': 1,
    'SLOT 2': 2,
    'SLOT 3': 3,
    'SLOT 4': 4
  };

  // Extract numeric part from cow_number like I15 → 15, P2 → 2
  function extractCowParts(cow) {
    const match = cow.match(/^([A-Z])(\d+)$/);
    if (!match) return { prefix: '', num: 0 };
    return { prefix: match[1], num: parseInt(match[2]) };
  }

  return data.sort((a, b) => {
    // 1. Sort by Slot
    const slotA = slotOrder[a.Slot] || 99;
    const slotB = slotOrder[b.Slot] || 99;
    if (slotA !== slotB) return slotA - slotB;

    // 2. Sort by cow_number → I comes before P
    const cowA = extractCowParts(a.cow_number);
    const cowB = extractCowParts(b.cow_number);
    if (cowA.prefix !== cowB.prefix) return cowA.prefix.localeCompare(cowB.prefix);
    if (cowA.num !== cowB.num) return cowA.num - cowB.num;

    // 3. Sort by hissa_number
    return parseInt(a.hissa_number) - parseInt(b.hissa_number);
  });
}

function renderTransactions(data, riders) {
  displayedOrders = data; 
  const container = document.getElementById('ordersContainer');
  container.innerHTML = '';

  data.forEach(order => {
    if (order.day == "Second") {
      const row = document.createElement('tr');
      row.classList.add('order-row');
      row.dataset.orderId = order.id;  // Store order ID in a custom data attribute
      row.dataset.order = JSON.stringify(order);  // Store the entire order object for later use

      let assignedRider = "";

      if(order.rider_name == riders.name) {
        assignedRider = order.rider_name;
      }

      row.innerHTML = `
        <td>${order.rider_name}</td>
        <td>${order.deliveryStatus}</td>
        <td>${order.order_id}</td>
        <td style="max-width: 5rem; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">${order.description}</td>
        <td>${order.cow_number}-${order.hissa_number}</td>
        <td>${order.Slot}</td>
        <td style="max-width: 15rem; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">${order.booking_name}<br>${order.shareholder_name}</td>
        <td>${order.contact_no}</td>
        <td>${order.area}</td>
      `;

      container.appendChild(row);
    }
  });
}

//FILTERS

let displayedOrders = [];

const slotMap = {
  "SLOT1": "SLOT 1",
  "SLOT2": "SLOT 2",
  "SLOT3": "SLOT 3",
  "SLOT4": "SLOT 4",
  "SLOTGOAT": "SLOT GOAT"
};

// 🔁 Master function to apply all filters together
function applyAllFilters() {
  // 1. Get selected slot filters
  const selectedSlots = Array.from(document.querySelectorAll('.slot-section.selected h2'))
    .map(h2 => h2.id.toUpperCase());

  // 2. Get text filters
  const booking = document.getElementById("searchBooking").value.toLowerCase();
  const shareholder = document.getElementById("searchShareholder").value.toLowerCase();
  const phone = document.getElementById("searchPhoneNo").value.toLowerCase();
  const area = document.getElementById("searchArea").value.toLowerCase();
  const id = document.getElementById("searchOrder").value.toLowerCase();

  // 3. Get checked delivery status
  const stages = [];
  for (let i = 1; i <= 6; i++) {
    if (document.getElementById(`searchStage${i}`).checked) {
      switch (i) {
        case 1: stages.push("Pending"); break;
        case 2: stages.push("In Progress"); break;
        case 3: stages.push("Packing"); break;
        case 4: stages.push("Ready"); break;
        case 5: stages.push("Dispatched"); break;
        case 6: stages.push("Delivered"); break;
      }
    }
  }

  // 4. Get checked order types
  const orderTypes = ["Hissa - Ijtemai", "Hissa - Ijtemai (Premium)", "Hissa - Waqf", "Goat (Hissa)"]
    .filter(type => document.getElementById(type).checked);

  // 5. Filter orders
  displayedOrders = allOrders.filter(order => {
    const slotMatch = selectedSlots.includes("ALL") || selectedSlots.length === 0
      || selectedSlots.some(slotId => slotMap[slotId] === order.Slot);

    const bookingMatch = order.booking_name.toLowerCase().includes(booking);
    const shareholderMatch = order.shareholder_name.toLowerCase().includes(shareholder);
    const phoneMatch = order.contact_no.toLowerCase().includes(phone);
    const areaMatch = order.area.toLowerCase().includes(area);
    const idMatch = order.order_id.toLowerCase().includes(id);

    const stageMatch = stages.length === 0 || stages.includes(order.deliveryStatus);
    const orderTypeMatch = orderTypes.length === 0 || orderTypes.includes(order.order_type);

    return slotMatch && bookingMatch && shareholderMatch && phoneMatch && areaMatch && stageMatch && orderTypeMatch && idMatch;
  });

  renderTransactions(sortOrders(displayedOrders), allRiders);
  updateFilterCounts();
}

updateFilterCounts();

// 🔘 Setup slot buttons
document.querySelectorAll('.slot-section').forEach(section => {
  section.addEventListener('click', () => {
    section.classList.toggle('selected');
    applyAllFilters();
  });
});

function updateFilterCounts() {
  const stageCounts = {
    "Pending": 0,
    "In Progress": 0,
    "Packing": 0,
    "Ready": 0,
    "Dispatched": 0,
    "Delivered": 0
  };

  const typeCounts = {
    "Hissa - Ijtemai": 0,
    "Hissa - Ijtemai (Premium)": 0,
    "Hissa - Waqf": 0,
    "Goat (Hissa)": 0
  };

  // Count based on currently filtered orders
  displayedOrders.forEach(order => {
    if (stageCounts.hasOwnProperty(order.deliveryStatus)) {
      stageCounts[order.deliveryStatus]++;
    }
    if (typeCounts.hasOwnProperty(order.order_type)) {
      typeCounts[order.order_type]++;
    }
  });

  // Update Stage Counts
  document.getElementById("1Count").textContent = `(${stageCounts["Pending"]})`;
  document.getElementById("2Count").textContent = `(${stageCounts["In Progress"]})`;
  document.getElementById("3Count").textContent = `(${stageCounts["Packing"]})`;
  document.getElementById("4Count").textContent = `(${stageCounts["Ready"]})`;
  document.getElementById("5Count").textContent = `(${stageCounts["Dispatched"]})`;
  document.getElementById("6Count").textContent = `(${stageCounts["Delivered"]})`;

  // Update Type Counts
  document.getElementById("IjtemaiCount").textContent = `(${typeCounts["Hissa - Ijtemai"]})`;
  document.getElementById("PremiumCount").textContent = `(${typeCounts["Hissa - Ijtemai (Premium)"]})`;
  document.getElementById("WaqfCount").textContent = `(${typeCounts["Hissa - Waqf"]})`;
  document.getElementById("GoatCount").textContent = `(${typeCounts["Goat (Hissa)"]})`;
}


fetchTransactions();

//EXPORT DATA (FILTERED INCLUDED) AS CSV FILE

function exportToCSV() {
  if (!displayedOrders || displayedOrders.length === 0) {
      alert("No data to export.");
      return;
  }

  const headers = [
      "Customer ID", "Order ID", "Cow #", "Hissa #", "Slot", "Booking Name", "Shareholder Name", "Phone Number", "Alt. Phone",
      "Address", "Area", "Day", "Type", "Booking Date", "Total Amount", "Bank", "Cash", "Received", "Pending",
      "Source", "Reference", "Description", "Payment Status"
  ];

  const rows = displayedOrders.map(order => [
      order.customer_id ?? '',
      order.order_id ?? '',
      order.cow_number ?? '',
      order.hissa_number ?? '',
      order.Slot ?? '',
      order.booking_name ?? '',
      order.shareholder_name ?? '',
      order.contact_no ?? '',
      order.alternate_contact_no ?? '',
      order.shareholder_address ?? '',
      order.area ?? '',
      order.day ?? '',
      order.order_type ?? '',
      order.booking_date ?? '',
      order.total_amount ?? '',
      order.bank ?? '',
      order.cash ?? '',
      order.received_amount ?? '',
      order.pending_amount ?? '',
      order.order_source ?? '',
      order.refrence ?? '',
      order.description ?? '',
      (order.pending_amount > 0 ? "Pending" : "Received")
  ]);

  const csv = [headers, ...rows]
      .map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
      .join('\n');

  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'filtered_orders.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}