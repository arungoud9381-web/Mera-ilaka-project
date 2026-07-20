const cartContainer = document.getElementById("cartContainer");

const grandTotal = document.getElementById("grandTotal");

const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty">

                <h2>Your Cart is Empty</h2>

                <p>Add products from Marketplace.</p>

            </div>

        `;

        grandTotal.innerHTML = "₹0";

        return;

    }

    let total = 0;

    cart.forEach(function (product, index) {

        let price = Number(

            product.price.replace("₹", "").replace(/,/g, "")

        );

        let itemTotal = price * product.quantity;

        total += itemTotal;

        cartContainer.innerHTML += `

        <div class="card">

            <h3>${product.product}</h3>

            <p><strong>Seller :</strong> ${product.seller}</p>

            <p><strong>Category :</strong> ${product.category}</p>

            <p><strong>Price :</strong> ${product.price}</p>

            <p><strong>Status :</strong> ${product.status}</p>

            <p>

                <strong>Total :</strong>

                ₹${itemTotal}

            </p>

            <div class="quantity">

                <button onclick="decreaseQuantity(${index})">

                    -

                </button>

                <span>

                    ${product.quantity}

                </span>

                <button onclick="increaseQuantity(${index})">

                    +

                </button>

            </div>

            <div class="buttons">

                <button

                    class="remove"

                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    grandTotal.innerHTML = "₹" + total;

}

displayCart();

function increaseQuantity(index) {

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        let confirmDelete = confirm("Remove this product from cart?");

        if (confirmDelete) {

            cart.splice(index, 1);

        }

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}

function removeItem(index) {

    let confirmDelete = confirm("Are you sure you want to remove this product?");

    if (!confirmDelete) {

        return;

    }

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    alert("Product removed from cart.");

}

checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    localStorage.setItem("checkoutItems", JSON.stringify(cart));

    window.location.href = "checkout.html";

});

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}

displayCart();