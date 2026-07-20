const orderItems = document.getElementById("orderItems");
const grandTotal = document.getElementById("grandTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");

// Load Products
let checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];
let buyNow = JSON.parse(localStorage.getItem("buyNow"));

// Buy Now Support
if (checkoutItems.length === 0 && buyNow) {

    checkoutItems.push(buyNow);

}

// Display Order
function displayOrder() {

    orderItems.innerHTML = "";

    if (checkoutItems.length === 0) {

        orderItems.innerHTML = "<h3>No Products Selected</h3>";
        grandTotal.innerHTML = "₹0";
        placeOrderBtn.disabled = true;

        return;

    }

    let total = 0;

    checkoutItems.forEach(function (item) {

        let price = Number(
            item.price.replace("₹", "").replace(/,/g, "")
        );

        let quantity = item.quantity || 1;

        let itemTotal = price * quantity;

        total += itemTotal;

        orderItems.innerHTML += `

            <div class="order-item">

                <h3>${item.product}</h3>

                <p><strong>Seller :</strong> ${item.seller}</p>

                <p><strong>Category :</strong> ${item.category}</p>

                <p><strong>Price :</strong> ${item.price}</p>

                <p><strong>Quantity :</strong> ${quantity}</p>

                <p><strong>Total :</strong> ₹${itemTotal}</p>

            </div>

        `;

    });

    grandTotal.innerHTML = "₹" + total;

}

displayOrder();

// Place Order
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

        alert("Please fill all fields.");
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

    localStorage.removeItem("checkoutItems");
    localStorage.removeItem("buyNow");
    localStorage.removeItem("cart");

    alert("Order Placed Successfully.");

    window.location.href = "payment.html";

});