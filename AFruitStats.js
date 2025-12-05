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

// STATS

let totalLoss = 0;
let totalKharab = 0;

const loss = document.getElementById("loss");
const kharab = document.getElementById("kharab");

function loadStats() {
    fetch("fetch_stats.php")
        .then(response => response.json())
        .then(data => {
            data.forEach(expense => {
                totalLoss += Number(expense.peti_loss);
                totalKharab += Number(expense.kharab);
            });

            animateCounter(loss, 0, totalLoss, 1000, "", " KG");
            animateCounter(kharab, 0, totalKharab, 1000, "", " KG");
        })
        .catch(error => {
            console.error("Error loading expense:", error);
        });
}

loadStats();

loss.textContent = `${totalLoss} KG`;
kharab.textContent = `${totalKharab} KG`;

//DISPLAY ORDERS

let displayedExpenses= []; 
let allOrders = [];

function fetchTransactions() {
  fetch('fetch_stats.php')
    .then(res => res.json())
    .then(data => {
      allOrders = data.reverse();
      renderTransactions(allOrders);
    });
}

function renderTransactions(data) {
  displayedOrders = data; 
  const container = document.getElementById('ordersContainer');
  container.innerHTML = '';

  data.forEach(stat => {

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${stat.week}</td>
      <td>${stat.units_received}</td>
      <td>${stat.kgs_received}</td>
      <td>${stat.peti_loss}</td>
      <td>${stat.kharab}</td>
      <td>${stat.kgs_delivered}</td>
      <td>${stat.description}</td>
      <td>
        <button class="arrow-btn" onclick="toggleDropdown(this)" style="cursor: pointer !important;">
          <img src="imgs/edit.png" style="cursor: pointer !important;">
        </button>
      </td>
      <td>
          <button class="delete-btn" onclick="confirmDelete('${stat.id}')" style="border: none; background-color: transparent; cursor: pointer;">
              <img src="imgs/delete.png">
          </button>
      </td> 
    `;

    const dropdownRow = document.createElement('tr');
    dropdownRow.classList.add('dropdown-row');

    dropdownRow.innerHTML = `
      <td colspan="25">
        <div class="next">
          <div class="align"><label>Peti Received: </label>
            <input type="text" id="units_received-${stat.week}" value="${stat.units_received}"/>
          </div>

          <div class="align"><label>Mangoes Received (KG): </label>
            <input type="text" id="kgs_received-${stat.week}" value="${stat.kgs_received}"/>
          </div>

          <div class="align"><label>Peti Loss (KG): </label>
            <input type="text" id="peti_loss-${stat.week}" value="${stat.peti_loss}" />
          </div>

          <div class="align"><label>Kharab (KG): </label>
            <input type="text" id="kharab-${stat.week}" value="${stat.kharab}" />
          </div>

          <div class="align"><label>Delivered (KG): </label>
            <input type="text" id="kgs_delivered-${stat.week}" value="${stat.kgs_delivered}" />
          </div>

          <div class="align"><label>Description: </label>
            <input type="text" id="description-${stat.week}" value="${stat.description}" />
          </div>

          <div class="align">
            <p>‎</p>
            <button onclick="updateDetails('${stat.week}')">Submit</button>
          </div>
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

function updateDetails(week) {
  const fields = [
    'units_received',
    'kgs_received',
    'peti_loss',
    'kharab',
    'kgs_delivered',
    'description'
  ];

  const data = { week };

  // Add all editable text/number fields
  fields.forEach(field => {
    const input = document.getElementById(`${field}-${week}`);
    data[field] = input ? input.value.trim() : '';
  });

  // Create URL-encoded string
  const formBody = Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  fetch('AEditFruitsStats.php', {
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

//DELETE ORDER W/ CONFIRMATIOON

function confirmDelete(id) {
    const confirmed = confirm("Are you sure you want to delete this expense?");
    if (confirmed) {
      fetch('delete_stats.php', {
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

//EXPORT DATA (FILTERED INCLUDED) AS CSV FILE

function exportToCSV() {
  if (!displayedOrders || displayedOrders.length === 0) {
      alert("No data to export.");
      return;
  }

  const headers = [
      "S.NO", "Week", "Units Received", "KGs Received", "Peti Loss (KG)", "Kharab (KG)", "Delivered (KG)", "Description"
  ];

  const rows = displayedOrders.map(expense => [
      expense.id ?? '',
      expense.week ?? '',
      expense.units_received ?? '',
      expense.kgs_received ?? '',
      expense.peti_loss ?? '',
      expense.kharab ?? '',
      expense.kgs_delivered ?? '',
      expense.description ?? ''
  ]);

  const csv = [headers, ...rows]
      .map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
      .join('\n');

  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Stats.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// SEND DATA TO DB

document.getElementById("addExpense").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let formData = new FormData(this);

    fetch("add_stats.php", {
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