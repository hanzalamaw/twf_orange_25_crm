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
    getDate();
});

function getDate() {
    const date = new Date();

    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    document.getElementById("date").value = `${year}-${month}-${day}`;
}

const totalAmount = document.getElementById("total_amount");

document.getElementById("from_bank").addEventListener("input", function () {
    const fromBank = Number(document.getElementById("from_bank").value);
    const fromCash = Number(document.getElementById("from_cash").value);
    const updatedTotal = fromBank + fromCash;

    totalAmount.value = updatedTotal;
});

document.getElementById("from_cash").addEventListener("input", function () {
    const fromBank = Number(document.getElementById("from_bank").value);
    const fromCash = Number(document.getElementById("from_cash").value);
    const updatedTotal = fromBank + fromCash;

    totalAmount.value = updatedTotal;
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

// STATS

let totalBank = 0;
let totalCash = 0;

const bank = document.getElementById("bank");
const cash = document.getElementById("cash");

function loadStats() {
    fetch("fetch_expense.php")
        .then(response => response.json())
        .then(data => {
            data.forEach(expense => {
                totalBank += Number(expense.from_bank);
                totalCash += Number(expense.from_cash);
            });

            animateCounter(bank, 0, totalBank, 1000, "PKR ");
            animateCounter(cash, 0, totalCash, 1000, "PKR ");
        })
        .catch(error => {
            console.error("Error loading expense:", error);
        });
}

loadStats();

bank.textContent = `PKR ${totalBank}`;
cash.textContent = `PKR ${totalCash}`;

//DISPLAY ORDERS

let displayedExpenses= []; 
let allOrders = [];

function fetchTransactions() {
  fetch('fetch_expense.php')
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

  data.forEach(expense => {

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.id}</td>
      <td>${expense.date}</td>
      <td>${expense.from_bank}</td>
      <td>${expense.from_cash}</td>
      <td>${expense.total_amount}</td>
      <td>${expense.done_by}</td>
      <td>${expense.entered_by}</td>
      <td style="max-width: 30rem; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">${expense.description}</td>
      <td>
          <button class="delete-btn" onclick="confirmDelete('${expense.id}')" style="border: none; background-color: transparent; cursor: pointer;">
              <img src="imgs/delete.png">
          </button>
      </td>
    `;

    container.appendChild(row);
  });
}

//DELETE ORDER W/ CONFIRMATIOON

function confirmDelete(id) {
    const confirmed = confirm("Are you sure you want to delete this expense?");
    if (confirmed) {
      fetch('delete_expense.php', {
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

function filterTransactions() {
  const booking = document.getElementById("searchBooking").value.toLowerCase();

  const filtered = allOrders.filter(expense => {
      const bookingMatch = expense.done_by.toLowerCase().includes(booking);

      return bookingMatch;
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
      "S.NO", "Date", "Bank", "Cash", "Total Amount", "Done By", "Entered By", "Description"
  ];

  const rows = displayedOrders.map(expense => [
      expense.id ?? '',
      expense.date ?? '',
      expense.from_bank ?? '',
      expense.from_cash ?? '',
      expense.total_amount ?? '',
      expense.done_by ?? '',
      expense.entered_by ?? '',
      expense.description ?? ''
  ]);

  const csv = [headers, ...rows]
      .map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
      .join('\n');

  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'expenses.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// SEND DATA TO DB

document.getElementById("addExpense").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let formData = new FormData(this);

    fetch("add_expense.php", {
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