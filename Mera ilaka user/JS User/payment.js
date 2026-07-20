const orderDetails = document.getElementById("orderDetails");

const paymentMethod = document.getElementById("paymentMethod");

const totalAmount = document.getElementById("totalAmount");

const payNowBtn = document.getElementById("payNowBtn");

let order = JSON.parse(localStorage.getItem("currentOrder"));

function displayOrder() {

    if (!order) {

        orderDetails.innerHTML = "<h3>No Order Found</h3>";

        payNowBtn.disabled = true;

        return;

    }

    orderDetails.innerHTML = `

        <div class="order-item">

            <p><strong>Order ID :</strong> ${order.orderId}</p>

            <p><strong>Customer :</strong> ${order.customerName}</p>

            <p><strong>Phone :</strong> ${order.phone}</p>

            <p><strong>City :</strong> ${order.city}</p>

            <p><strong>Pincode :</strong> ${order.pincode}</p>

            <p><strong>Order Date :</strong> ${order.orderDate}</p>

            <p><strong>Status :</strong> ${order.status}</p>

        </div>

    `;

    paymentMethod.innerHTML = order.paymentMethod;

    totalAmount.innerHTML = order.total;

}

displayOrder();

payNowBtn.addEventListener("click", function () {

    if (!order) {

        alert("No order found.");

        return;

    }

    // Update Order Status

    if (order.paymentMethod === "Cash on Delivery") {

        order.status = "Cash on Delivery";

    } else {

        order.status = "Paid";

    }


    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders = orders.map(function (item) {

        if (item.orderId === order.orderId) {

            return order;

        }

        return item;

    });

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.setItem("currentOrder", JSON.stringify(order));

    alert("Payment Successful!");

    window.location.href = "my-orders.html";

});