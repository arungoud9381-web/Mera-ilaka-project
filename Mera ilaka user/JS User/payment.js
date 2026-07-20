const orderDetails = document.getElementById("orderDetails");
const paymentMethod = document.getElementById("paymentMethod");
const totalAmount = document.getElementById("totalAmount");
const payNowBtn = document.getElementById("payNowBtn");

let currentOrder = JSON.parse(localStorage.getItem("currentOrder"));

function displayOrder() {

    if (!currentOrder) {

        orderDetails.innerHTML = "<h3>No Order Found</h3>";

        paymentMethod.innerHTML = "-";

        totalAmount.innerHTML = "₹0";

        payNowBtn.disabled = true;

        return;

    }

    let productsHTML = "";

    currentOrder.items.forEach(function (item) {

        productsHTML += `

            <div class="order-item">

                <h4>${item.product}</h4>

                <p>Seller : ${item.seller}</p>

                <p>Category : ${item.category}</p>

                <p>Price : ${item.price}</p>

                <p>Quantity : ${item.quantity}</p>

            </div>

        `;

    });

    orderDetails.innerHTML = `

        <p><strong>Order ID :</strong> ${currentOrder.orderId}</p>

        <p><strong>Customer :</strong> ${currentOrder.customerName}</p>

        <p><strong>Phone :</strong> ${currentOrder.phone}</p>

        <p><strong>Address :</strong> ${currentOrder.address}</p>

        <p><strong>City :</strong> ${currentOrder.city}</p>

        <p><strong>Pincode :</strong> ${currentOrder.pincode}</p>

        <hr>

        <h3>Products</h3>

        ${productsHTML}

    `;

    paymentMethod.innerHTML = currentOrder.paymentMethod;

    totalAmount.innerHTML = currentOrder.total;

}

displayOrder();

// Confirm Payment

payNowBtn.addEventListener("click", function () {

    if (!currentOrder) {

        return;

    }

    // Update Status

    if (currentOrder.paymentMethod === "Cash on Delivery") {

        currentOrder.status = "Cash on Delivery";

    }

    else {

        currentOrder.status = "Paid";

    }

    // Update Orders List

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders = orders.map(function (order) {

        if (order.orderId === currentOrder.orderId) {

            return currentOrder;

        }

        return order;

    });

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));

    alert("Payment Successful!");

    window.location.href = "my-orders.html";

});