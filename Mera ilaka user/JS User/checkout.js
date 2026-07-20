const orderItems = document.getElementById("orderItems");

const grandTotal = document.getElementById("grandTotal");

const placeOrderBtn = document.getElementById("placeOrderBtn");

let checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

let buyNow = JSON.parse(localStorage.getItem("buyNow"));

if (checkoutItems.length === 0 && buyNow) {

    checkoutItems.push(buyNow);

}

function displayOrder() {

    orderItems.innerHTML = "";

    if (checkoutItems.length === 0) {

        orderItems.innerHTML = "<h3>No Products Found</h3>";

        grandTotal.innerHTML = "₹0";

        return;

    }

    let total = 0;

    checkoutItems.forEach(function (product) {

        let price = Number(

            product.price.replace("₹", "").replace(/,/g, "")

        );

        let itemTotal = price * product.quantity;

        total += itemTotal;

        orderItems.innerHTML += `

        <div class="order-item">

            <h4>${product.product}</h4>

            <p>Price : ${product.price}</p>

            <p>Quantity : ${product.quantity}</p>

            <p>Total : ₹${itemTotal}</p>

        </div>

        `;

    });

    grandTotal.innerHTML = "₹" + total;

}

displayOrder();

placeOrderBtn.addEventListener("click", function () {

    const customerName = document.getElementById("customerName").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const address = document.getElementById("address").value.trim();

    const city = document.getElementById("city").value.trim();

    const pincode = document.getElementById("pincode").value.trim();

    const paymentMethod = document.getElementById("paymentMethod").value;

    if (
        customerName === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        pincode === "" ||
        paymentMethod === ""
    ) {

        alert("Please fill all the fields.");

        return;

    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    const order = {

        orderId: "ORD" + Date.now(),

        customerName: customerName,

        phone: phone,

        address: address,

        city: city,

        pincode: pincode,

        paymentMethod: paymentMethod,

        items: checkoutItems,

        total: grandTotal.innerText,

        orderDate: new Date().toLocaleString(),

        status: "Pending"

    };

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.setItem("currentOrder", JSON.stringify(order));

    localStorage.removeItem("cart");

    localStorage.removeItem("checkoutItems");

    localStorage.removeItem("buyNow");

    alert("Order Placed Successfully!");

    window.location.href = "payment.html";

});