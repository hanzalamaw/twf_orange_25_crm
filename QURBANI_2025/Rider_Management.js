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

// INPUT FIELDS 

document.addEventListener('DOMContentLoaded', () => {

});


//ANIMATION OF TEXT INCREMENTING FROM ZERO

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

//DISPLAY RIDERS

let displayedExpenses= []; 
let allOrders = [];

function fetchTransactions() {
  fetch('fetch_riders.php')
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

  data.forEach(riders => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${riders.id}</td>
      <td>${riders.name}</td>
      <td>${riders.phone}</td>
      <td>${riders.cnic}</td>
      <td>${riders.vehicle}</td>
      <td>${riders.number_plate}</td>
      <td>${riders.availability}</td>
      <td>
        <select class="status-select">
          <option value="Off Duty" {riders.tag === 'Off Duty' ? 'selected' : ''}>Off Duty</option>
          <option value="Available" ${riders.tag === 'Available' ? 'selected' : ''}>Available</option>
          <option value="Out For Delivery" ${riders.tag === 'Out For Delivery' ? 'selected' : ''}>Out For Delivery</option>
        </select>
      </td>
      <td>
          <button class="delete-btn" onclick="confirmDelete('${riders.id}')" style="border: none; background-color: transparent; cursor: pointer;">
              <img src="imgs/delete.png">
          </button>
      </td>
    `;

    const statusSelect = row.querySelector('.status-select');

    statusSelect.addEventListener('change', () => {
      const newStatus = statusSelect.value; // Corrected this to use statusSelect.value
      const riderId = riders.id; // Corrected this to use riders.id

      fetch('update_rider_tag.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: riderId, tag: newStatus }) // Use riderId here
      })
      .then(response => response.json()) // Optional: handle the response to confirm the update
      .then(data => {
        if (data.success) {
          console.log('Tag updated successfully');
        } else {
          console.error('Failed to update tag');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });

    container.appendChild(row);
  });
}

//DELETE ORDER W/ CONFIRMATIOON

function confirmDelete(id) {
    const confirmed = confirm("Are you sure you want to delete this expense?");
    if (confirmed) {
      fetch('delete_riders.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${id}`
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

fetchTransactions();

function filterTransactions() {
  const booking = document.getElementById("searchBooking").value.toLowerCase();
  const status = document.getElementById("filterStatus").value;

  const filtered = allOrders.filter(rider => {
    const nameMatch = rider.name.toLowerCase().includes(booking);
    const statusMatch = rider.tag === status || status === ""; // optional: show all if no status selected

    return nameMatch && statusMatch;
  });

  renderTransactions(filtered);
}

//EXPORT DATA (FILTERED INCLUDED) AS CSV FILE

function exportToCSV() {
  if (!displayedOrders || displayedOrders.length === 0) {
      alert("No data to export.");
      return;
  }

  const headers = [
      "S.NO", "Name", "Contact", "CNIC", "Vehicle", "Amount Per Delivery", "Delivered Orders", "Total Amount", "Description"
  ];

  const rows = displayedOrders.map(riders => [
      riders.id ?? '',
      riders.name ?? '',
      riders.phone ?? '',
      riders.cnic ?? '',
      riders.vehicle ?? '',
      riders.number_plate ?? '',
      riders.availibility ?? '',
      riders.tag ?? ''
  ]);

  const csv = [headers, ...rows]
      .map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
      .join('\n');

  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'rideers.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// SEND DATA TO DB

document.getElementById("addExpense").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let formData = new FormData(this);

    fetch("add_riders.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        this.reset(); 
        fetchTransactions();
        getDate();
    });
});