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
                    document.getElementById("alternate_contact_no").value = order.alternate_contact_no;
                    document.getElementById("shareholder_address").value = order.shareholder_address;
                    document.getElementById("area").value = order.area;
                    matched = true;
                }
                if(!matched) {
                    let idNum = parseInt(lastCustomerID.substring(5, 9), 10);
                    idNum += 1;

                    const formattedNum = idNum.toString().padStart(4, '0');

                    const newID = `#TWF-${formattedNum}`;
                    document.getElementById("customer_id").value = newID;
                    document.getElementById("booking_name").value = document.getElementById("booking_name").value;
                    document.getElementById("alternate_contact_no").value = document.getElementById("alternate_contact_no").value;
                    document.getElementById("shareholder_address").value = document.getElementById("shareholder_address").value;
                    document.getElementById("area").value = document.getElementById("area").value;
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
                    case "Mango - Chaunsa" || "Mango - Sindhri" || "Mango - Anwar Ratol": 
                        (order.order_type == orderTypeInput)? lastOrderID = order.order_id : lastOrderID = lastOrderID;
                        let prefixW = "#M-";
                        let orderIdNumW = parseInt(lastOrderID.substring(3, 7));
                        orderIdNumW += 1;
        
                        const orderFormattedNumW = orderIdNumW.toString().padStart(4, '0');
                        
                        const newOrderIDW = `${prefixW}${orderFormattedNumW}-2025`;
                        document.getElementById("order_id").value = newOrderIDW;
                        console.log(newOrderIDW);
                        break;

                    case "Orange - 10KG": 
                        (order.order_type == orderTypeInput)? lastOrderID = order.order_id : lastOrderID = lastOrderID;
                        let prefixG = "#O-";
                        let orderIdNumG = parseInt(lastOrderID.substring(3, 7));
                        orderIdNumG += 1;
        
                        const orderFormattedNumG = orderIdNumG.toString().padStart(4, '0');
        
                        const newOrderIDG = `${prefixG}${orderFormattedNumG}-2025`;
                        document.getElementById("order_id").value = newOrderIDG;
                        console.log(newOrderIDG);
                        break;
                }
            });
        })
        .catch(error => {
            console.error("Error loading orders:", error);
        });
});

//PRICES (BASED ON ORDER TYPE)


document.getElementById("order_type").addEventListener("input", function () {
    calculateTotal();

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

document.getElementById("shareholder_name").addEventListener("input", function () {
    calculateTotal();
});

document.getElementById("day").addEventListener("input", function () {
    calculateTotal();
});

//Function For Setting Total AMount

function calculateTotal(){
    const orderType = document.getElementById("order_type").value;
    const orderWeight = document.getElementById("shareholder_name").value;

    switch(orderType){
        case "Mango - Chaunsa": 
            switch(orderWeight){
                case "5KG - Premium"    : setTotal(1750); break;
                case "10KG - Premium"   : setTotal(3500); break;
                case "5KG - Wooden Box" : setTotal(1700); break;
                case "10KG - Wooden Box": setTotal(3400); break;
            }
            break;

        case "Mango - Sindhri": 
            switch(orderWeight){
                case "5KG - Premium"    : setTotal(1850); break;
                case "10KG - Premium"   : setTotal(3600); break;
                case "5KG - Wooden Box" : setTotal(1800); break;
                case "10KG - Wooden Box": setTotal(3500); break;
            }
            break;

        case "Mango - Anwar Ratol": 
            switch(orderWeight){
                case "5KG - Premium"    : setTotal(1950); break;
                case "10KG - Premium"   : setTotal(3700); break;
                case "5KG - Wooden Box" : setTotal(1900); break;
                case "10KG - Wooden Box": setTotal(3600); break;
            }
            break;

        default: setTotal(0); break;
    }
}

function setTotal(price){
    const qty = Number(document.getElementById("day").value);
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