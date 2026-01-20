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

//GENERATE CUSTOMER ID (BASED ON CONTACT NUMBER)
document.getElementById("contact").addEventListener("input", function () {
    const contactInput = this.value;

    fetch("AFetchHalwa.php")
        .then(response => response.json())
        .then(data => {
            let matched = false;
            let lastCustomerID = "";
            const reversedData = data.reverse();

            // CHECK IF CONTACT EXISTS IN DATA
            for (let order of reversedData) {
                lastCustomerID = order.customer_id;

                if (contactInput === order.contact) {
                    document.getElementById("customer_id").value = order.customer_id;
                    document.getElementById("name").value = order.name;
                    document.getElementById("address").value = order.address;
                    document.getElementById("area").value = order.area;
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                let idNum = parseInt(lastCustomerID.substring(5, 9), 10);
                let newID;
                let isUnique = false;

                while (!isUnique) {
                    idNum += 1;
                    const formattedNum = idNum.toString().padStart(4, '0');
                    newID = `#TWF-${formattedNum}-H-2025`;

                    // CHECK UNIQUENESS
                    isUnique = !reversedData.some(order => order.customer_id === newID);
                }

                // SET GENERATED UNIQUE ID AND RETAIN INPUT VALUES
                document.getElementById("customer_id").value = newID;
                console.log("Generated Unique ID:", newID);
            }
        })
        .catch(error => {
            console.error("Error loading orders:", error);
        });
});

//GENERATE ORDER ID (BASED ON ORDER TYPE)
document.getElementById("order_type").addEventListener("input", function () {
    const orderTypeInput = this.value.trim();

    fetch("AFetchHalwa.php")
        .then(response => response.json())
        .then(data => {
            const reversedOrderData = [...data].reverse();

            // Halwa order types - update as needed
            const halwaTypes = [orderTypeInput]; // Use the current order type
            let prefix = "#H-";
            let filterType = "halwa";

            // FIND LAST ORDER ID IN GROUP
            let lastOrderID = reversedOrderData.find(order =>
                order.order_id && order.order_id.startsWith("#H-")
            )?.order_id || null;

            let orderIdNum = 0;

            if (lastOrderID) {
                // EXPECTED FORMAT: #H-0001-2025
                const match = lastOrderID.match(/#H-(\d{4})-2025/);
                if (match) {
                    orderIdNum = parseInt(match[1], 10);
                }
            }

            let newOrderID = "";
            let unique = false;

            while (!unique) {
                orderIdNum += 1;
                const formatted = String(orderIdNum).padStart(4, "0");

                newOrderID = `${prefix}${formatted}-2025`;

                // STRICT EXACT MATCH CHECK
                unique = !reversedOrderData.some(order =>
                    order.order_id === newOrderID
                );
            }

            document.getElementById("order_id").value = newOrderID;
            console.log("✅ Unique Order ID Assigned:", newOrderID);
        })
        .catch(error => console.error("Fetch Error:", error));
});

//PRICES (BASED ON ORDER TYPE)

document.getElementById("order_type").addEventListener("change", function () {
    calculateTotal();

    // Set current date as booking date if not already set
    if (!document.getElementById("booking_date").value) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        document.getElementById("booking_date").value = `${year}-${month}-${day}`;
    }
});

document.getElementById("weight").addEventListener("input", function () {
    calculateTotal();
});

document.getElementById("quantity").addEventListener("input", function () {
    calculateTotal();
});

//Function For Setting Total Amount
// Note: For Halwa, pricing can be set manually or configured here based on order type and weight
function calculateTotal(){
    const orderType = document.getElementById("order_type").value;
    const orderWeight = document.getElementById("weight").value;

    // If order type or weight is not selected, don't auto-calculate
    if (!orderType || !orderWeight) {
        return;
    }

    // Halwa pricing logic - update as needed based on your pricing structure
    // For now, let users manually enter the total amount
    // You can add pricing logic here if you have fixed prices for Halwa types
    
    switch(orderType){
        case "Halwa - Standard": 
            // Add pricing logic here if needed
            break;

        case "Halwa - Premium": 
            // Add pricing logic here if needed
            break;

        case "Halwa - Special": 
            // Add pricing logic here if needed
            break;

        case "Halwa - Gift Box": 
            // Add pricing logic here if needed
            break;

        default: break;
    }
}

function setTotal(price){
    const qty = Number(document.getElementById("quantity").value);
    document.getElementById("total_amount").value = price*qty;

    document.getElementById("bank").value = 0;
    document.getElementById("cash").value = 0;
    document.getElementById("received_amount").value = Number(document.getElementById("bank").value) + Number(document.getElementById("cash").value);
    document.getElementById("pending_amount").value =  Number(document.getElementById("total_amount").value) - Number(document.getElementById("received_amount").value);
}

document.getElementById("total_amount").addEventListener("input", function () {
    document.getElementById("bank").value = 0;
    document.getElementById("cash").value = 0;
    document.getElementById("received_amount").value = Number(document.getElementById("bank").value) + Number(document.getElementById("cash").value);
    document.getElementById("pending_amount").value =  Number(document.getElementById("total_amount").value) - Number(document.getElementById("received_amount").value);
});

document.getElementById("bank").addEventListener("input", function () {
    document.getElementById("received_amount").value = Number(document.getElementById("bank").value) + Number(document.getElementById("cash").value);
    document.getElementById("pending_amount").value =  Number(document.getElementById("total_amount").value) - Number(document.getElementById("received_amount").value);
});

document.getElementById("cash").addEventListener("input", function () {
    document.getElementById("received_amount").value = Number(document.getElementById("bank").value) + Number(document.getElementById("cash").value);
    document.getElementById("pending_amount").value =  Number(document.getElementById("total_amount").value) - Number(document.getElementById("received_amount").value);
});

// SEND DATA TO DB
document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let formData = new FormData(this);

    fetch("AAddHalwa.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);

        if (!document.getElementById("keepInfo").checked) {
            this.reset(); 
        } else {
            document.getElementById("order_id").value = "";
            document.getElementById("order_type").selectedIndex = 0;
        }
    });
});