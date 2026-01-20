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
  fetch('AFetchHalwa.php')
    .then(res => res.json())
    .then(data => {
      allOrders = data;
      renderTransactions(allOrders);
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
      <td>
        <select class="status-select">
          <option value="At Our Farm" ${order.deliveryStatus === 'At Our Farm' ? 'selected' : ''}>At Our Farm</option>
          <option value="Being Packed" ${order.deliveryStatus === 'Being Packed' ? 'selected' : ''}>Being Packed</option>
          <option value="Delivered" ${order.deliveryStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
        </select>
      </td>
      <td>${order.customer_id}</td>
      <td>${order.order_id}</td>
      <td>${order.name}</td>
      <td>${order.contact}</td>
      <td>${order.week}</td>
      <td>${order.address}</td>
      <td>${order.area}</td>
      <td>${order.quantity}</td>
      <td>${order.order_type}</td>
      <td>${order.weight}</td>
      <td>${order.booking_date}</td>
      <td>PKR ${order.total_amount}</td>
      <td>${order.bank}</td>
      <td>${order.cash}</td>
      <td>${order.received_amount}</td>
      <td>${order.pending_amount}</td>
      <td>${order.source}</td>
      <td>${order.description}</td>
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
          <div class="align"><label>Customer ID: </label>
            <input type="text" id="customer_id-${order.order_id}" value="${order.customer_id}" disabled />
          </div>

          <div class="align"><label>Order ID: </label>
            <input type="text" id="order_id-${order.order_id}" value="${order.order_id}" disabled />
          </div>

          <div class="align"><label>Name: </label>
            <input type="text" id="name-${order.order_id}" value="${order.name}" />
          </div>

          <div class="align"><label>Contact No: </label>
            <input type="text" id="contact-${order.order_id}" value="${order.contact}" />
          </div>

          <div class="align"><label>Address: </label>
            <input type="text" id="address-${order.order_id}" value="${order.address}" />
          </div>

          <div class="align"><label>Area: </label>
            <input type="text" id="area-${order.order_id}" value="${order.area}" />
          </div>

          <div class="align"><label>Quantity: </label>
            <input type="text" id="quantity-${order.order_id}" value="${order.quantity}" />
          </div>

          <div class="align"><label>Order Type: </label>
            <input type="text" id="order_type-${order.order_id}" value="${order.order_type}" />
          </div>

          <div class="align"><label>Weight: </label>
            <input type="text" id="weight-${order.order_id}" value="${order.weight}" />
          </div>

          <div class="align"><label>Booking Date: </label>
            <input type="text" id="booking_date-${order.order_id}" value="${order.booking_date}" />
          </div>

          <div class="align"><label>Total Amount: </label>
            <input type="text" id="total_amount-${order.order_id}" value="${order.total_amount}" />
          </div>

          <div class="align"><label>Source: </label>
            <input type="text" id="source-${order.order_id}" value="${order.source}" />
          </div>

          <div class="align"><label>Description: </label>
            <input type="text" id="description-${order.order_id}" value="${order.description}" />
          </div>

          <div class="align"><label>Week: </label>
            <input type="text" id="week-${order.order_id}" value="${order.week}" />
          </div>

          <div class="align">
            <p>‎</p>
            <button onclick="updateDetails('${order.order_id}', ${order.total_amount})">Submit</button>
          </div>

        </div>
      </td>
    `;
    
    const statusSelect = row.querySelector('.status-select');
    statusSelect.addEventListener('change', () => {
        const newStatus = statusSelect.value;

        fetch('AUpdateHalwaStatus.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: order.id, status: newStatus })
        });
      });

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
    'name',
    'contact',
    'address',
    'area',
    'quantity',
    'order_type',
    'weight',
    'booking_date',
    'total_amount',
    'source',
    'description',
    'week'
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

  fetch('AEditHalwaDetails.php', {
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
  window.open(`AFruitInvoice.php?order_id=${encodedOrderId}`, '_blank');
}

//DELETE ORDER W/ CONFIRMATIOON

function confirmDelete(order_id) {
    const confirmed = confirm("Are you sure you want to delete this order?");
    if (confirmed) {
      fetch('ADeleteHalwa.php', {
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

  const filtered = allOrders.filter(order => {
      const bookingMatch = order.name.toLowerCase().includes(booking);
      const phoneMatch = order.contact.toLowerCase().includes(phone);
        const week = document.getElementById("searchWeek").value.toLowerCase();
      const weekMatch = order.week.toLowerCase().includes(week);

      const statusMatch =
          status === 'all' ||
          (status === 'At Our Farm' && order.deliveryStatus === 'At Our Farm') ||
          (status === 'Being Packed' && order.deliveryStatus === 'Being Packed')||
          (status === 'Delivered' && order.deliveryStatus === 'Delivered');

      return bookingMatch && phoneMatch && statusMatch && weekMatch;
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
      "Customer ID", "Order ID", "Name", "Contact", "Alt Contact",
      "Address", "Area", "Quantity", "Type","Weight", "Booking Date", "Total Amount", "Bank", "Cash", "Received", "Pending",
      "Source", "Description", "Delivery Status", "Week", "Payment Status"
  ];

  const rows = displayedOrders.map(order => [
      order.customer_id ?? '',
      order.order_id ?? '',
      order.name ?? '',
      order.contact ?? '',
      order.address ?? '',
      order.area ?? '',
      order.quantity ?? '',
      order.order_type ?? '',
      order.weight ?? '',
      order.booking_date ?? '',
      order.total_amount ?? '',
      order.bank ?? '',
      order.cash ?? '',
      order.received_amount ?? '',
      order.pending_amount ?? '',
      order.order_source ?? '',
      order.description ?? '',
      order.deliveryStatus ?? '',
      order.week ?? '',
      (order.pending_amount > 0 ? "Pending" : "Received")
  ]);

  const csv = [headers, ...rows]
      .map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
      .join('\n');

  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'halwa_orders.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}