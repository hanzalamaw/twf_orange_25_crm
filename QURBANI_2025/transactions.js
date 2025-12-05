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

//LOAD DATA

function loadStats() {
    fetch("fetch_orders.php")
        .then(response => response.json())
        .then(data => {
            data.forEach(order => {
                totalBank += Number(order.bank);
                totalCash += Number(order.cash);
            });

            // ✅ Animate stats
            animateCounter(bank, 0, totalBank, 1000, "PKR ");
            animateCounter(cash, 0, totalCash, 1000, "PKR ");
        })
        .catch(error => {
            console.error("Error loading orders:", error);
        });
}

loadStats();

bank.textContent = `PKR ${totalBank}`;
cash.textContent = `PKR ${totalCash}`;

let displayHidden = true;

function hider() {
  if(displayHidden){
    bank.classList.remove("blur");
    cash.classList.remove("blur");

    displayHidden = false;
    const hideImg = document.getElementById("hideImg").src = "imgs/show.png";
  }
  else {
    bank.classList.add("blur");
    cash.classList.add("blur");

    displayHidden = true;
    const hideImg = document.getElementById("hideImg").src = "imgs/hidden.png";
  }
}

let allOrders = [];

function fetchTransactions() {
  fetch('fetch_orders.php')
    .then(res => res.json())
    .then(data => {
      allOrders = data;
      renderTransactions(allOrders);
    });
}

function renderTransactions(data) {
  const container = document.getElementById('ordersContainer');
  container.innerHTML = '';

  data.forEach(order => {
    const row = document.createElement('tr');
    const dropdownRow = document.createElement('tr');
    const isPending = order.pending_amount > 0;

    row.innerHTML = `
      <td>${order.customer_id}</td>
      <td>${order.order_id}</td>
      <td>${order.booking_name}</td>
      <td>${order.shareholder_name}</td>
      <td>${order.contact_no}</td>
      <td>${order.order_type}</td>
      <td>${order.day}</td>
      <td>PKR ${order.pending_amount}</td>
      <td class="status-cell">
        <span class="badge ${isPending ? 'pending' : 'received'}">${isPending ? 'Pending' : 'Received'}</span>
        <button class="arrow-btn" onclick="toggleDropdown(this)">▼</button>
      </td>
        <td>
          <button class="send-btn" onclick="handleSendInvoice('${order.order_id}', '${order.contact_no}', '${order.booking_name}')">
            <img src="imgs/send.png">
          </button>
        </td>
    `;
    
    //<td>
    //    <button class="send-btn" onclick="handleSendInvoice('${order.order_id}', '${order.contact_no}', '${order.booking_name}')">
    //      <img src="imgs/send.png">
    //    </button>
    //  </td>

    dropdownRow.classList.add('dropdown-row');
    dropdownRow.innerHTML = `
      <td colspan="8">
        <div class="dropdown-content" id="content-${order.order_id}">
          <div class="prev">
            <p id="summary-${order.order_id}">Bank: Rs. ${order.bank} | Cash: Rs. ${order.cash} | </p>
            <p id="balance-${order.order_id}">Received: Rs. ${order.received_amount} | Pending: Rs. ${order.pending_amount}</p>
          </div>
          
          <div class="next">
            <label>Bank: <input type="number" placeholder="Add Amount" oninput="updateLive('${order.order_id}', ${order.bank}, ${order.cash}, ${order.total_amount})" id="bank-${order.order_id}"></label>
            <label>Cash: <input type="number" placeholder="Add Amount" oninput="updateLive('${order.order_id}', ${order.bank}, ${order.cash}, ${order.total_amount})" id="cash-${order.order_id}"></label>
            <button onclick="submitTransaction('${order.order_id}', ${order.total_amount}, ${order.bank}, ${order.cash})">Submit</button>
          </div>
        </div>
      </td>
    `;

    container.appendChild(row);
    container.appendChild(dropdownRow);
  });
}

function handleSendInvoice(order_id, contact_no, booking_name) {
  const cleanedContact = contact_no.replace('-', '').replace(/^0/, '92');
  const chatId = `${cleanedContact}@c.us`;

  const message = `Dear *${booking_name}*,

Thank you for your recent order. We are pleased to confirm your booking and have attached the invoice for Order ID: *${order_id}* for your reference.
 
Should you have any questions or require further assistance, please do not hesitate to contact us at

*0331-9911466 | 0332-9911466*

Thank you for choosing us.

Best regards,
*The Warsi Farm*`;

  const confirmMessage = `You're about to send the following message on WhatsApp:\n\n"${message}"\n\nDo you want to continue?`;

  if (!confirm(confirmMessage)) {
    alert("Invoice sending cancelled.");
    return;
  }

  generateInvoice(order_id)
    .then(fileUrl => {
      console.log("Generated PDF File URL:", fileUrl);

      if (!fileUrl || typeof fileUrl !== "string") {
        throw new Error("Invalid file URL returned from server.");
      }

      const headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer hKeOXQ90RIhDhFhoOz8KehFFlkUlfum8VYMni8Od049cacba"
      };

      const messagePayload = {
        chatId: chatId,
        message: message
      };

      return fetch("https://waapi.app/api/v1/instances/58872/client/action/send-message", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(messagePayload)
      })
      .then(response => response.json())
      .then(msgData => {
        console.log("Text Message Response:", msgData);

        const mediaPayload = {
          chatId: chatId,
          type: "document",
          mediaUrl: fileUrl,
          filename: `Invoice-${order_id}.pdf`,
          caption: `Invoice for Order ID ${order_id}`
        };

        return fetch("https://waapi.app/api/v1/instances/58872/client/action/send-media", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(mediaPayload)
        });
      });
    })
    .then(response => response.json())
    .then(finalData => {
      console.log("PDF Send Response:", finalData);
      if (finalData.status === "success") {
        alert(`Invoice successfully sent to ${booking_name}`);
      } else {
        alert(`Failed to send invoice: ${finalData.message || "Unknown error"}`);
      }
    })
    .catch(error => {
      console.error("Send Error:", error);
      alert("Failed to send invoice via WhatsApp.");
    });
}

function generateInvoice(order_id) {
  return fetch(`save_invoice.php?order_id=${encodeURIComponent(order_id)}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        return data.file_url;
      } else {
        throw new Error(data.message || "Failed to generate invoice");
      }
    });
}


function toggleDropdown(btn) {
  const row = btn.closest('tr');
  const dropdown = row.nextElementSibling;
  const isOpen = btn.classList.toggle('open');
  dropdown.style.display = isOpen ? 'table-row' : 'none';
}

function updateLive(order_id, baseBank, baseCash, totalAmount) {
  const bankInput = document.getElementById(`bank-${order_id}`);
  const cashInput = document.getElementById(`cash-${order_id}`);
  const addedBank = parseFloat(bankInput.value) || 0;
  const addedCash = parseFloat(cashInput.value) || 0;

  const totalBank = baseBank + addedBank;
  const totalCash = baseCash + addedCash;
  const received = totalBank + totalCash;
  const pending = totalAmount - received;

  document.getElementById(`summary-${order_id}`).textContent = `Bank: Rs. ${totalBank} | Cash: Rs. ${totalCash}`;
  document.getElementById(`balance-${order_id}`).textContent = `Received: Rs. ${received} | Pending: Rs. ${pending}`;
}

function submitTransaction(order_id, totalAmount, baseBank, baseCash) {
  const addedBank = parseFloat(document.getElementById(`bank-${order_id}`).value) || 0;
  const addedCash = parseFloat(document.getElementById(`cash-${order_id}`).value) || 0;

  const finalBank = baseBank + addedBank;
  const finalCash = baseCash + addedCash;
  const received = finalBank + finalCash;
  const pending = totalAmount - received;

  fetch('edit_order.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `order_id=${order_id}&bank=${finalBank}&cash=${finalCash}&received_amount=${received}&pending_amount=${pending}`
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    fetchTransactions();
  });
}

function filterTransactions() {
  const booking = document.getElementById("searchBooking").value.toLowerCase();
  const phone = document.getElementById("searchPhone").value.toLowerCase();
  const status = document.getElementById("filterStatus").value;

  const filtered = allOrders.filter(order => {
    const bookingMatch = order.booking_name.toLowerCase().includes(booking);
    const phoneMatch = order.contact_no.toLowerCase().includes(phone);
    const statusMatch =
      status === 'all' ||
      (status === 'pending' && order.pending_amount > 0) ||
      (status === 'received' && order.pending_amount <= 0);
    return bookingMatch && phoneMatch && statusMatch;
  });

  renderTransactions(filtered);
}

fetchTransactions();