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

let totalBankExpenses = 0;
let totalCashExpenses = 0;
let totalBank = 0;
let totalCash = 0;

const bank = document.getElementById("bank");
const cash = document.getElementById("cash");

function loadExpenses() {
  return fetch("fetch_expense.php")
    .then(response => response.json())
    .then(data => {
      data.forEach(expense => {
        totalBankExpenses += Number(expense.from_bank);
        totalCashExpenses += Number(expense.from_cash);
      });
    })
    .catch(error => {
      console.error("Error loading expense:", error);
    });
}

function loadStats() {
  return fetch("AFetchFruits.php")
    .then(response => response.json())
    .then(data => {
      data.forEach(order => {
        totalBank += Number(order.bank);
        totalCash += Number(order.cash);
      });

      totalBank -= totalBankExpenses;
      totalCash -= totalCashExpenses;

      animateCounter(bank, 0, totalBank, 1000, "PKR ");
      animateCounter(cash, 0, totalCash, 1000, "PKR ");
    })
    .catch(error => {
      console.error("Error loading orders:", error);
    });
}

// Ensure expenses load before stats
loadExpenses().then(() => loadStats());

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

//DISPLAY TRANSACTIONS

let allOrders = [];
let currentOrder = null;

function fetchTransactions() {
  fetch('AFetchFruits.php')
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
    const isPending = order.pending_amount > 0;
    
    row.classList.add('clickable-row');
    row.onclick = () => openModal(order);

    row.innerHTML = `
      <td>${order.customer_id}</td>
      <td>${order.order_id}</td>
      <td>${order.name}</td>
      <td>${order.contact}</td>
      <td>${order.quantity}</td>
      <td>${order.order_type}</td>
      <td>${order.weight}</td>
      <td>PKR ${Number(order.pending_amount).toLocaleString()}</td>
      <td>
        <span class="badge ${isPending ? 'pending' : 'received'}">${isPending ? 'Pending' : 'Received'}</span>
      </td>
      <td>
        <button class="send-btn" onclick="event.stopPropagation(); handleSendInvoice('${order.order_id}', '${order.contact}', '${order.name}')">
          <img src="imgs/send.png">
        </button>
      </td>
    `;

    container.appendChild(row);
  });
}

//MODAL FUNCTIONS

function openModal(order) {
  currentOrder = order;
  
  // Populate modal with order details
  document.getElementById('modal-customer-id').textContent = `${order.customer_id}`;
  document.getElementById('modal-order-id').textContent = `${order.order_id}`;
  document.getElementById('modal-name').textContent = order.name;
  document.getElementById('modal-contact').textContent = order.contact;
  document.getElementById('modal-booking-date').textContent = order.booking_date || 'N/A';
  document.getElementById('modal-total-price').textContent = `Rs. ${Number(order.total_amount).toLocaleString()}`;
  document.getElementById('modal-quantity').textContent = order.quantity;
  document.getElementById('modal-weight').textContent = order.weight;
  document.getElementById('modal-current-bank').textContent = `Rs. ${Number(order.bank).toLocaleString()}`;
  document.getElementById('modal-current-cash').textContent = `Rs. ${Number(order.cash).toLocaleString()}`;
  document.getElementById('modal-current-received').textContent = `Rs. ${Number(order.received_amount).toLocaleString()}`;
  document.getElementById('modal-current-pending').textContent = `Rs. ${Number(order.pending_amount).toLocaleString()}`;
  
  // Reset and setup inputs
  const cashInput = document.getElementById('modal-add-cash');
  const bankInput = document.getElementById('modal-add-bank');
  cashInput.value = '';
  bankInput.value = '';
  
  // Disable inputs if no pending amount
  const isPending = order.pending_amount > 0;
  cashInput.disabled = !isPending;
  bankInput.disabled = !isPending;
  document.getElementById('modal-submit-btn').disabled = !isPending;
  
  // Set initial new totals
  updateModalTotals();
  
  // Setup input listeners
  cashInput.oninput = updateModalTotals;
  bankInput.oninput = updateModalTotals;
  
  // Show error if no pending
  if (!isPending) {
    document.getElementById('modal-error').textContent = 'Pending is already 0. No more payments can be added.';
  } else {
    document.getElementById('modal-error').textContent = '';
  }
  
  // Show modal
  const modal = document.getElementById('transactionModal');
  modal.style.display = 'flex';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('transactionModal');
  modal.style.display = 'none';
  modal.classList.remove('active');
  document.body.style.overflow = '';
  currentOrder = null;
}

function updateModalTotals() {
  if (!currentOrder) return;
  
  const cashInput = document.getElementById('modal-add-cash');
  const bankInput = document.getElementById('modal-add-bank');
  
  let addedCash = parseFloat(cashInput.value) || 0;
  let addedBank = parseFloat(bankInput.value) || 0;
  
  const baseBank = Number(currentOrder.bank);
  const baseCash = Number(currentOrder.cash);
  const totalAmount = Number(currentOrder.total_amount);
  const originalPending = Number(currentOrder.pending_amount);
  
  // Prevent negative values
  if (addedCash < 0) {
    addedCash = 0;
    cashInput.value = '';
  }
  if (addedBank < 0) {
    addedBank = 0;
    bankInput.value = '';
  }
  
  // Calculate total added and cap it at original pending amount
  const totalAdded = addedBank + addedCash;
  if (totalAdded > originalPending) {
    const excess = totalAdded - originalPending;
    if (document.activeElement === bankInput) {
      addedBank = Math.max(0, addedBank - excess);
      bankInput.value = addedBank > 0 ? addedBank : '';
    } else {
      addedCash = Math.max(0, addedCash - excess);
      cashInput.value = addedCash > 0 ? addedCash : '';
    }
  }
  
  const newBank = baseBank + addedBank;
  const newCash = baseCash + addedCash;
  const newReceived = newBank + newCash;
  const newPending = totalAmount - newReceived;
  
  document.getElementById('modal-new-bank').textContent = `Rs. ${newBank.toLocaleString()}`;
  document.getElementById('modal-new-cash').textContent = `Rs. ${newCash.toLocaleString()}`;
  document.getElementById('modal-new-received').textContent = `Rs. ${newReceived.toLocaleString()}`;
  document.getElementById('modal-new-pending').textContent = `Rs. ${newPending.toLocaleString()}`;
}

function submitModalTransaction() {
  if (!currentOrder) return;
  
  const addedBank = parseFloat(document.getElementById('modal-add-bank').value) || 0;
  const addedCash = parseFloat(document.getElementById('modal-add-cash').value) || 0;
  
  const baseBank = Number(currentOrder.bank);
  const baseCash = Number(currentOrder.cash);
  const totalAmount = Number(currentOrder.total_amount);
  const originalPending = Number(currentOrder.pending_amount);
  
  // Validation: Check if there's nothing pending
  if (originalPending <= 0) {
    document.getElementById('modal-error').textContent = 'No pending amount. Transaction not allowed.';
    return;
  }

  // Validation: Check if any amount is entered
  if (addedBank === 0 && addedCash === 0) {
    document.getElementById('modal-error').textContent = 'Enter at least one amount (Cash or Bank).';
    return;
  }

  // Validation: Check if entered amount exceeds pending
  const totalAdded = addedBank + addedCash;
  if (totalAdded > originalPending) {
    document.getElementById('modal-error').textContent = `Amount exceeds pending balance. Maximum: Rs. ${originalPending.toLocaleString()}`;
    return;
  }

  // Validation: Prevent negative values
  if (addedBank < 0 || addedCash < 0) {
    document.getElementById('modal-error').textContent = 'Amount cannot be negative.';
    return;
  }
  
  document.getElementById('modal-error').textContent = '';

  const finalBank = baseBank + addedBank;
  const finalCash = baseCash + addedCash;
  const received = finalBank + finalCash;
  const pending = totalAmount - received;

  fetch('AFruitEdit.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `order_id=${currentOrder.order_id}&bank=${finalBank}&cash=${finalCash}&received_amount=${received}&pending_amount=${pending}`
  })
  .then(res => res.text())
  .then(msg => {
    closeModal();
    fetchTransactions();
    // Refresh stats
    totalBank = 0;
    totalCash = 0;
    totalBankExpenses = 0;
    totalCashExpenses = 0;
    loadExpenses().then(() => loadStats());
  });
}

// Close modal on escape key and overlay click - wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  const modalOverlay = document.getElementById('transactionModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target.id === 'transactionModal') {
        closeModal();
      }
    });
  }
});

//SEND INVOICE USING WAAPI

function handleSendInvoice(order_id, contact, name) {
  const cleanedContact = contact.replace('-', '').replace(/^0/, '92');
  const chatId = `${cleanedContact}@c.us`;

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
        message: `Dear ${name}, thank you for your order! We're pleased to share your invoice for Order ID ${order_id}. Please see the attached document. If you need any assistance, feel free to reach out.`
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
        alert(`Invoice successfully sent to ${name}`);
      } else {
        alert(`Failed to send invoice: ${finalData.message || "Unknown error"}`);
      }
    })
    .catch(error => {
      console.error("Send Error:", error);
      alert("Invoice Sent Successfully.");
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

//FILTERS

function filterTransactions() {
  const booking = document.getElementById("searchBooking").value.toLowerCase();
  const phone = document.getElementById("searchPhone").value.toLowerCase();
  const status = document.getElementById("filterStatus").value;

  const filtered = allOrders.filter(order => {
    const bookingMatch = order.name.toLowerCase().includes(booking);
    const phoneMatch = order.contact.toLowerCase().includes(phone);
    const statusMatch =
      status === 'all' ||
      (status === 'pending' && order.pending_amount > 0) ||
      (status === 'received' && order.pending_amount <= 0);
    return bookingMatch && phoneMatch && statusMatch;
  });

  renderTransactions(filtered);
}

fetchTransactions();
