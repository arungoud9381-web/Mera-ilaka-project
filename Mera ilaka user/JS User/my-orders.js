const ordersContainer = document.getElementById("ordersContainer");

let orders = JSON.parse(localStorage.getItem("orders")) || [];

function displayOrders() {

    ordersContainer.innerHTML = "";

    if (orders.length === 0) {

        ordersContainer.innerHTML = `

            <div class="order-card">

                <h2>No Orders Found</h2>

                <p>You haven't placed any orders yet.</p>

            </div>

        `;

        return;

    }

    orders.forEach(function (order, index) {

        let productsHTML = "";

        if (order.items && order.items.length > 0) {

            order.items.forEach(function (item) {

                productsHTML += `

                    <div class="product">

                        <h4>${item.product}</h4>

                        <p><strong>Seller :</strong> ${item.seller}</p>

                        <p><strong>Category :</strong> ${item.category}</p>

                        <p><strong>Price :</strong> ${item.price}</p>

                        <p><strong>Quantity :</strong> ${item.quantity}</p>

                    </div>

                `;

            });

        }

        ordersContainer.innerHTML += `

            <div class="order-card">

                <h2>Order ID : ${order.orderId}</h2>

                <p><strong>Customer :</strong> ${order.customerName}</p>

                <p><strong>Phone :</strong> ${order.phone}</p>

                <p><strong>Address :</strong> ${order.address}</p>

                <p><strong>City :</strong> ${order.city}</p>

                <p><strong>Pincode :</strong> ${order.pincode}</p>

                <p><strong>Order Date :</strong> ${order.orderDate}</p>

                <p><strong>Payment :</strong> ${order.paymentMethod}</p>

                <p><strong>Total :</strong> ${order.total}</p>

                <p>

                    <strong>Status :</strong>

                    <span class="status ${order.status.replace(/\s/g, '')}">

                        ${order.status}

                    </span>

                </p>

                <div class="products">

                    <h3>Purchased Products</h3>

                    ${productsHTML}

                </div>

                <div class="buttons">

                    ${order.status === "Pending"

                ?

                `<button class="cancel-btn"

                            onclick="cancelOrder(${index})">

                            Cancel Order

                        </button>`

                :

                ""

            }

                </div>

            </div>

        `;

    });

}

// Cancel Order

function cancelOrder(index) {

    if (!confirm("Cancel this order?")) {

        return;

    }

    orders[index].status = "Cancelled";

    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

    displayOrders();

    alert("Order Cancelled Successfully.");

}

// Initial Load

displayOrders();