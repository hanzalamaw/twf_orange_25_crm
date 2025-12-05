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

document.getElementById("contact_no").addEventListener("input", function () {
    const contactInput = this.value;

    fetch("fetch_orders.php")
        .then(response => response.json())
        .then(data => {
            let matched = false;
            let lastCustomerID = "";

            const reversedData = data.reverse();

            reversedData.forEach(order => {
                lastCustomerID = order.customer_id;

                if (contactInput == order.contact_no) {
                    document.getElementById("customer_id").value = order.customer_id;
                    document.getElementById("booking_name").value = order.booking_name;
                    matched = true;
                }
                if(!matched) {
                    let idNum = parseInt(lastCustomerID.substring(5, 9), 10);
                    idNum += 1;

                    const formattedNum = idNum.toString().padStart(4, '0');

                    const newID = `#TWF-${formattedNum}`;
                    document.getElementById("customer_id").value = newID;
                    document.getElementById("booking_name").value = document.getElementById("booking_name").value;
                    console.log(newID);
                }
            });
        })
        .catch(error => {
            console.error("Error loading orders:", error);
        });
});

//GENERATE ORDER ID (BASED ON ORDER TYPE)

document.getElementById("order_type").addEventListener("input", function () {
    const orderTypeInput = this.value;

    fetch("fetch_orders.php")
        .then(response => response.json())
        .then(data => {
            let lastOrderID = "";

            const reversedOrderData = data.reverse();

            reversedOrderData.forEach(order => {
                switch(orderTypeInput){
                    case "Hissa - Waqf": 
                        (order.order_type == orderTypeInput)? lastOrderID = order.order_id : lastOrderID = lastOrderID;
                        let prefixW = "#W-";
                        let orderIdNumW = parseInt(lastOrderID.substring(3, 7));
                        orderIdNumW += 1;
        
                        const orderFormattedNumW = orderIdNumW.toString().padStart(4, '0');
                        
                        const newOrderIDW = `${prefixW}${orderFormattedNumW}-2025`;
                        document.getElementById("order_id").value = newOrderIDW;
                        console.log(newOrderIDW);
                        break;

                    case "Hissa - Ijtemai": 
                        (order.order_type == orderTypeInput)? lastOrderID = order.order_id : lastOrderID = lastOrderID;
                        let prefixI = "#I-";
                        let orderIdNumI = parseInt(lastOrderID.substring(3, 7));
                        orderIdNumI += 1;
        
                        const orderFormattedNumI = orderIdNumI.toString().padStart(4, '0');
        
                        const newOrderIDI = `${prefixI}${orderFormattedNumI}-2025`;
                        document.getElementById("order_id").value = newOrderIDI;
                        console.log(newOrderIDI);
                        break;

                    case "Hissa - Ijtemai (Premium)": 
                        (order.order_type == orderTypeInput)? lastOrderID = order.order_id : lastOrderID = lastOrderID;
                        let prefixP = "#P-";
                        let orderIdNumP = parseInt(lastOrderID.substring(3, 7));
                        orderIdNumP += 1;
        
                        const orderFormattedNumP = orderIdNumP.toString().padStart(4, '0');
        
                        const newOrderIDP = `${prefixP}${orderFormattedNumP}-2025`;
                        document.getElementById("order_id").value = newOrderIDP;
                        console.log(newOrderIDP);
                        break;

                    case "Goat": 
                        (order.order_type == orderTypeInput)? lastOrderID = order.order_id : lastOrderID = lastOrderID;
                        let prefixG = "#G-";
                        let orderIdNumG = parseInt(lastOrderID.substring(3, 7));
                        orderIdNumG += 1;
        
                        const orderFormattedNumG = orderIdNumG.toString().padStart(4, '0');
        
                        const newOrderIDG = `${prefixG}${orderFormattedNumG}-2025`;
                        document.getElementById("order_id").value = newOrderIDG;
                        console.log(newOrderIDG);
                        break;

                    case "Cow": 
                        (order.order_type == orderTypeInput)? lastOrderID = order.order_id : lastOrderID = lastOrderID;
                        let prefixC = "#C-";
                        let orderIdNumC = parseInt(lastOrderID.substring(3, 7));
                        orderIdNumC += 1;
        
                        const orderFormattedNumC = orderIdNumC.toString().padStart(4, '0');
        
                        const newOrderIDC = `${prefixC}${orderFormattedNumC}-2025`;
                        document.getElementById("order_id").value = newOrderIDC;
                        console.log(newOrderIDC);
                        break;

                    case "Goat (Hissa)": 
                        (order.order_type == orderTypeInput)? lastOrderID = order.order_id : lastOrderID = lastOrderID;
                        let prefixH = "#G-";
                        let orderIdNumH = parseInt(lastOrderID.substring(3, 7));
                        orderIdNumH += 1;
        
                        const orderFormattedNumH = orderIdNumH.toString().padStart(4, '0');
        
                        const newOrderIDH = `${prefixH}${orderFormattedNumH}-2025`;
                        document.getElementById("order_id").value = newOrderIDH;
                        console.log(newOrderIDH);
                        break;
                }
            });
        })
        .catch(error => {
            console.error("Error loading orders:", error);
        });
});

//GENERATE COW & HISSA NO (BASED ON ORDER TYPE)

document.getElementById("order_type").addEventListener("input", function () {
    generateCowNumber();
});

document.getElementById("day").addEventListener("input", function () {
    generateCowNumber();
});

function generateCowNumber(){
    const orderTypeInput = document.getElementById("order_type").value;
    const dayInput = document.getElementById("day").value;

    // Only run for specified types
    const allowedTypes = [
        "Hissa - Waqf",
        "Hissa - Ijtemai",
        "Hissa - Ijtemai (Premium)"
    ];

    if (!allowedTypes.includes(orderTypeInput)) return;

    fetch("fetch_orders.php")
        .then(response => response.json())
        .then(data => {
            // Prefix mapping
            const typePrefixMap = {
                "Hissa - Waqf": "W",
                "Hissa - Ijtemai": "I",
                "Hissa - Ijtemai (Premium)": "P"
            };
            const prefix = typePrefixMap[orderTypeInput];

            // Extract existing cow-hissa combinations for selected type
            const existingPairs = new Set(
                data
                    .filter(order => order.order_type === orderTypeInput)
                    .filter(order => order.day === dayInput)
                    .map(order => `${order.cow_number}-${order.hissa_number}`)
            );

            let cowIndex = 1;
            let hissaNum = 1;
            let found = false;

            while (!found) {
                for (hissaNum = 1; hissaNum <= 7; hissaNum++) {
                    const cowCode = `${prefix}${cowIndex}`;
                    const pair = `${cowCode}-${hissaNum}`;
                    if (!existingPairs.has(pair)) {
                        found = true;
                        break;
                    }
                }
                if (!found) cowIndex++; // All 7 hissas are taken, move to next cow
            }

            const assignedCow = `${prefix}${cowIndex}`;

            // Assign cow and hissa numbers
            document.getElementById("cow_number").value = assignedCow;
            document.getElementById("hissa_number").value = hissaNum;

            console.log(`Assigned: Cow ${assignedCow}, Hissa ${hissaNum}`);
        })
        .catch(error => {
            console.error("Error loading orders:", error);
        });
}

//PRICES (BASED ON ORDER TYPE)

const waqfPrice = 19500;
const hissaPrice = 23000;
const premiumPrice = 28000;
const cowPrice = "";
const goatPrice = "";

document.getElementById("order_type").addEventListener("input", function () {
    if(document.getElementById("order_type").value == "Hissa - Waqf"){
        document.getElementById("total_amount").value = waqfPrice;
    }

    if(document.getElementById("order_type").value == "Hissa - Ijtemai"){
        document.getElementById("total_amount").value = hissaPrice;
    }

    if(document.getElementById("order_type").value == "Hissa - Ijtemai (Premium)"){
        document.getElementById("total_amount").value = premiumPrice;
    }

    if(document.getElementById("order_type").value == "Cow"){
        document.getElementById("total_amount").value = cowPrice;
        document.getElementById("hissa_number").value = cowPrice;
        document.getElementById("cow_number").value = cowPrice;
    }

    if(document.getElementById("order_type").value == "Goat"){
        document.getElementById("total_amount").value = goatPrice;
        document.getElementById("hissa_number").value = cowPrice;
        document.getElementById("cow_number").value = cowPrice;
    }

    document.getElementById("bank").value = 0;
    document.getElementById("cash").value = 0;
    document.getElementById("received_amount").value = Number(document.getElementById("bank").value) + Number(document.getElementById("cash").value);
    document.getElementById("pending_amount").value = Number(document.getElementById("total_amount").value) - Number(document.getElementById("received_amount").value);
    
     // Set current date as booking date
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            document.getElementById("booking_date").value = `${year}-${month}-${day}`;
});

document.getElementById("total_amount").addEventListener("input", function () {
    document.getElementById("bank").value = 0;
    document.getElementById("cash").value = 0;
    document.getElementById("received_amount").value = Number(document.getElementById("bank").value) + Number(document.getElementById("cash").value);
    document.getElementById("pending_amount").value = Number(document.getElementById("total_amount").value) - Number(document.getElementById("received_amount").value);
});

document.getElementById("bank").addEventListener("input", function () {
    document.getElementById("received_amount").value = Number(document.getElementById("bank").value) + Number(document.getElementById("cash").value);
    document.getElementById("pending_amount").value = Number(document.getElementById("total_amount").value) - Number(document.getElementById("received_amount").value);
});

document.getElementById("cash").addEventListener("input", function () {
    document.getElementById("received_amount").value = Number(document.getElementById("bank").value) + Number(document.getElementById("cash").value);
    document.getElementById("pending_amount").value = Number(document.getElementById("total_amount").value) - Number(document.getElementById("received_amount").value);
});

// SEND DATA TO DB

document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let formData = new FormData(this);

    fetch("add_order.php", {
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
            document.getElementById("order_type").value = "None";
        }
    });
});