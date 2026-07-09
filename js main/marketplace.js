const productPrices = {
    "HP Laptop": 45000,
    "Samsung Mobile": 18000,
    "Office Chair": 5500,
    "Smart Watch": 3999,
    "Headphones": 2999,
    "Running Shoes": 2499,
    "Java Programming": 699,
    "Football": 899
};

let cart = [];
let totalPrice = 0;

const searchInput = document.getElementById("productSearch");
const cards = document.querySelectorAll(".product-card");
const categoryButtons = document.querySelectorAll(".categories button");
const cartButtons = document.querySelectorAll(".cart-btn");
const wishButtons = document.querySelectorAll(".wish-btn");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalItems = document.getElementById("totalItems");
const checkoutItems = document.getElementById("checkoutItems");
const checkoutPrice = document.getElementById("checkoutPrice");
const toast = document.getElementById("toast");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        cards.forEach(card => {

            const name = card.querySelector("h3").innerText.toLowerCase();

            card.style.display =
                name.includes(value) ? "block" : "none";

        });

    });

}

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const category = this.innerText;

        cards.forEach(card => {

            if (category === "All") {

                card.style.display = "block";

            }

            else {

                card.style.display =
                    card.dataset.category === category ?
                        "block" : "none";

            }

        });

    });

});

function showToast(message) {

    if (!toast) return;

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

wishButtons.forEach(button => {

    button.addEventListener("click", function () {

        this.classList.toggle("active");

        const icon = this.querySelector("i");

        if (this.classList.contains("active")) {

            icon.className = "fa-solid fa-heart";

            this.style.background = "#ff4d6d";

            this.style.color = "#fff";

            showToast("Added to Wishlist ❤️");

        }

        else {

            icon.className = "fa-regular fa-heart";

            this.style.background = "#f4f4f4";

            this.style.color = "#000";

            showToast("Removed from Wishlist");

        }

    });

});

cartButtons.forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".product-card");

        const name = card.querySelector("h3").innerText;

        const price = productPrices[name];

        cart.push({

            name: name,

            price: price

        });

        showToast(name + " added to cart");

        updateCart();

    });

});

function updateCart() {

    cartItems.innerHTML = "";

    totalPrice = 0;

    cart.forEach((item, index) => {

        totalPrice += item.price;

        const li = document.createElement("li");

        li.innerHTML = `

${item.name}

<span>₹${item.price}</span>

<button class="remove-btn"
data-index="${index}">

<i class="fa-solid fa-trash"></i>

</button>

`;

        cartItems.appendChild(li);

    });

    cartCount.innerText = cart.length;

    totalItems.innerText = cart.length;

    checkoutItems.innerText = cart.length;

    checkoutPrice.innerText = totalPrice.toLocaleString();

    attachRemoveEvents();

}

function attachRemoveEvents() {

    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach(button => {

        button.addEventListener("click", function () {

            const index = this.dataset.index;

            cart.splice(index, 1);

            updateCart();

            saveCart();

            showToast("Item Removed");

        });

    });

}

function saveCart() {

    localStorage.setItem(

        "meraIlakaCart",

        JSON.stringify(cart)

    );

}

function loadCart() {

    const savedCart =

        localStorage.getItem("meraIlakaCart");

    if (savedCart) {

        cart = JSON.parse(savedCart);

        updateCart();

    }

}

loadCart();

const checkoutBtn = document.getElementById("checkoutBtn");

const orderHistory = document.getElementById("orderHistory");

checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    if (orderHistory.innerHTML.includes("No orders")) {

        orderHistory.innerHTML = "";

    }

    const order = document.createElement("li");

    let productNames = [];

    cart.forEach(item => {

        productNames.push(item.name);

    });

    order.innerHTML = `

<b>Order #${orderHistory.children.length + 1}</b><br>

${productNames.join(", ")}<br>

<b>Total :</b> ₹${totalPrice.toLocaleString()}<br>

<small>${new Date().toLocaleString()}</small>

`;

    orderHistory.prepend(order);

    showToast("Order Placed Successfully 🎉");

    alert("Order Placed Successfully!");

    cart = [];

    totalPrice = 0;

    updateCart();

    saveCart();

});

const oldUpdateCart = updateCart;

updateCart = function () {

    oldUpdateCart();

    saveCart();

}

console.log("✅ Marketplace Loaded Successfully");