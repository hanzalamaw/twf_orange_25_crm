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

let displayedOrders = []; 
let allOrders = [];

function fetchTransactions() {
  fetch('fetchQurbaniOrders.php')
    .then(res => res.json())
    .then(data => {
      allOrders = sortOrders(data);
      renderTransactions(allOrders);
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

function renderTransactions(data) {
  
  displayedOrders = data; 
  const container = document.getElementById('ordersContainer');
  container.innerHTML = '';

  data.forEach(order => {

    const isPending = order.pending_amount > 0;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.customer_id}</td>
      <td>${order.order_id}</td>
      <td>${order.cow_number}</td>
      <td>${order.hissa_number}</td>
      <td>${order.Slot}</td>
      <td>${order.booking_name}</td>
      <td>${order.shareholder_name}</td>
      <td>${order.contact_no}</td>
      <td>${order.alternate_contact_no}</td>
      <td>${order.shareholder_address}</td>
      <td>${order.area}</td>
      <td>${order.day}</td>
      <td>${order.order_type}</td>
      <td>${order.booking_date}</td>
      <td>PKR ${order.total_amount}</td>
      <td>${order.bank}</td>
      <td>${order.cash}</td>
      <td>${order.received_amount}</td>
      <td>${order.pending_amount}</td>
      <td>${order.order_source}</td>
      <td>${order.refrence}</td>
      <td>${order.description}</td>
      <td>${order.deliveryStatus}</td>
      <td class="status-cell">
          <span class="badge ${isPending ? 'pending' : 'received'}">
              ${isPending ? 'Pending' : 'Received'}
          </span>
      </td>
      <td>
        <button class="arrow-btn" onclick="toggleDropdown(this)" style="cursor: pointer !important;">
          <img src="imgs/edit.png" style="cursor: pointer !important;">
        </button>
      </td>
      <td>
          <button class="invoice-btn" onclick="generateInvoice('${order.order_id}')">
            <img src="imgs/invoice.png">
          </button>
      </td>
      <td>
          <button class="delete-btn" onclick="confirmDelete('${order.order_id}')" style="border: none; background-color: transparent; cursor: pointer;">
              <img src="imgs/delete.png">
          </button>
      </td>
    `;

    const dropdownRow = document.createElement('tr');
    dropdownRow.classList.add('dropdown-row');

    dropdownRow.innerHTML = `
      <td colspan="25">
        <div class="next">
        <div class="align"><label>Customer ID: </label> <input type="text" id="customer_id-${order.order_id}" value="${order.customer_id}" disabled /></div>
        <div class="align"><label>Order ID: </label> <input type="text" value="${order.order_id}" disabled /></div>
        <div class="align"><label>Cow #: </label> <input type="text" id="cow_number-${order.order_id}" value="${order.cow_number}"/></div>
        <div class="align"><label>Hissa #: </label> <input type="text" id="hissa_number-${order.order_id}" value="${order.hissa_number}"/></div>
        <div class="align"><label>Booking Name: </label> <input type="text" id="booking_name-${order.order_id}" value="${order.booking_name}" /></div>
        <div class="align"><label>Shareholder Name: </label> <input type="text" id="shareholder_name-${order.order_id}" value="${order.shareholder_name}" /></div>
        <div class="align"><label>Contact No: </label> <input type="text" id="contact_no-${order.order_id}" value="${order.contact_no}" /></div>
        <div class="align"><label>Alternate No: </label> <input type="text" id="alternate_contact_no-${order.order_id}" value="${order.alternate_contact_no}" /></div>
        <div class="align"><label>Address: </label> <input type="text" id="shareholder_address-${order.order_id}" value="${order.shareholder_address}" /></div>
        <div class="align"><label>Area: </label> <input type="text" id="area-${order.order_id}" value="${order.area}" /></div>
        <div class="align"><label>Day: </label> <input type="text" id="day-${order.order_id}" value="${order.day}" /></div>
        <div class="align"><label>Order Type: </label> <input type="text" id="order_type-${order.order_id}" value="${order.order_type}" /></div>
        <div class="align"><label>Booking Date: </label> <input type="text" id="booking_date-${order.order_id}" value="${order.booking_date}" /></div>
        <div class="align"><label>Order Source: </label> <input type="text" id="order_source-${order.order_id}" value="${order.order_source}" /></div>
        <div class="align"><label>Reference: </label> <input type="text" id="refrence-${order.order_id}" value="${order.refrence}" /></div>
        <div class="align"><label>Description: </label> <input type="text" id="description-${order.order_id}" value="${order.description}" /></div>
        <div class="align"><label>Slot: </label> <input type="text" id="Slot-${order.order_id}" value="${order.Slot}" /></div>
        <div class="align"><p>‎</p><button onclick="updateDetails('${order.order_id}', ${order.total_amount})">Submit</button></div>
        </div>
      </td>
    `;

    container.appendChild(row);
    container.appendChild(dropdownRow);
  });
}

function toggleDropdown(btn) {
  const row = btn.closest('tr');
  const dropdown = row.nextElementSibling;
  const isOpen = btn.classList.toggle('open');
  dropdown.style.display = isOpen ? 'table-row' : 'none';
}

//EDIT DETAILS

function updateDetails(order_id, totalAmount) {
  const fields = [
    'customer_id',
    'cow_number',
    'hissa_number',
    'booking_name',
    'shareholder_name',
    'contact_no',
    'alternate_contact_no',
    'shareholder_address',
    'area',
    'day',
    'order_type',
    'booking_date',
    'order_source',
    'refrence',
    'description',
    'Slot',
    'deliveryStatus',
    'rider_name'
  ];

  const data = { order_id };

  // Add all editable text/number fields
  fields.forEach(field => {
    const input = document.getElementById(`${field}-${order_id}`);
    data[field] = input ? input.value.trim() : '';
  });

  // Create URL-encoded string
  const formBody = Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  fetch('edit_complete_details.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    fetchTransactions();
  });
}

//GENERATE INVOICE IN NEW WINDOW

function generateInvoice(order_id) {
  const encodedOrderId = encodeURIComponent(order_id); // encodes #, -, etc.
  window.open(`dompdf_invoice.php?order_id=${encodedOrderId}`, '_blank');
}

//DELETE ORDER W/ CONFIRMATIOON

function confirmDelete(order_id) {
    const confirmed = confirm("Are you sure you want to delete this order?");
    if (confirmed) {
      fetch('delete_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `order_id=${order_id}`
      })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        fetchTransactions(); 
      });
    }
}

fetchTransactions();

//FILTERS  

function filterTransactions() {
  const booking = document.getElementById("searchBooking").value.toLowerCase();
  const phone = document.getElementById("searchPhone").value.toLowerCase();
  const status = document.getElementById("filterStatus").value;
  const cowFilter = document.getElementById("cowMin").value.toLowerCase();
  const dayFilter = document.getElementById("filterDay").value;

  const filtered = allOrders.filter(order => {
    const bookingMatch = order.booking_name.toLowerCase().includes(booking);
    const phoneMatch = order.contact_no.toLowerCase().includes(phone);

    const statusMatch =
      status === 'all' ||
      (status === 'pending' && order.pending_amount > 0) ||
      (status === 'received' && order.pending_amount <= 0);

    const cowMatch = cowFilter === "" || order.cow_number.toLowerCase() === cowFilter;

    const dayMatch = dayFilter === 'all' || order.day === dayFilter;

    return bookingMatch && phoneMatch && statusMatch && cowMatch && dayMatch;
  });

  renderTransactions(filtered);
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
      "Source", "Reference", "Description", "Payment Status", "deliveryStatus", "rider_name"
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
      order.deliveryStatus ?? '',
      order.rider_name ?? '',
      
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