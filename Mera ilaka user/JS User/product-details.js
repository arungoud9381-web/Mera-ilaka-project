let product = JSON.parse(localStorage.getItem("selectedProduct"));

let quantity = 1;

let price = 0;

if (product) {

    document.getElementById("productName").textContent = product.product;

    document.getElementById("seller").textContent = product.seller;

    document.getElementById("category").textContent = product.category;

    document.getElementById("price").textContent = product.price;

    document.getElementById("status").textContent = product.status;

    document.getElementById("description").textContent = product.description;

    document.getElementById("contact").textContent = product.contact;

    price = Number(product.price.replace("₹", "").replace(/,/g, ""));

    updateTotal();

}
else {

    alert("No product selected.");

    window.location.href = "marketplace.html";

}

function updateTotal() {

    document.getElementById("quantity").textContent = quantity;

    document.getElementById("subtotal").textContent = "₹" + (price * quantity);

}

document.getElementById("plusBtn").addEventListener("click", function () {

    quantity++;

    updateTotal();

});

document.getElementById("minusBtn").addEventListener("click", function () {

    if (quantity > 1) {

        quantity--;

        updateTotal();

    }

});

document.getElementById("wishlistBtn").addEventListener("click", function () {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let exists = wishlist.find(function (item) {

        return item.product === product.product;

    });

    if (exists) {

        alert("Product already exists in Wishlist.");

        return;

    }

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert("Product added to Wishlist.");

});

document.getElementById("cartBtn").addEventListener("click", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let exists = cart.find(function (item) {

        return item.product === product.product;

    });

    if (exists) {

        exists.quantity += quantity;

    } else {

        cart.push({

            product: product.product,

            seller: product.seller,

            category: product.category,

            price: product.price,

            description: product.description,

            contact: product.contact,

            status: product.status,

            quantity: quantity

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to Cart.");

});

document.getElementById("buyBtn").addEventListener("click", function () {

    localStorage.setItem("buyNow", JSON.stringify({

        product: product.product,

        seller: product.seller,

        category: product.category,

        price: product.price,

        description: product.description,

        contact: product.contact,

        status: product.status,

        quantity: quantity

    }));

    window.location.href = "checkout.html";

});

document.getElementById("backBtn").addEventListener("click", function () {

    window.location.href = "marketplace.html";

});