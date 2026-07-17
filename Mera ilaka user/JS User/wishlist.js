const wishlistContainer = document.getElementById("wishlistContainer");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function displayWishlist() {

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `

            <div class="empty">

                <h2>Your Wishlist is Empty</h2>

                <p>Add products from Marketplace.</p>

            </div>

        `;

        return;

    }

    wishlist.forEach(function (product, index) {

        wishlistContainer.innerHTML += `

        <div class="card">

            <h3>${product.product}</h3>

            <p><strong>Seller :</strong> ${product.seller}</p>

            <p><strong>Category :</strong> ${product.category}</p>

            <p><strong>Price :</strong> ${product.price}</p>

            <p>

                <strong>Status :</strong>

                <span class="${product.status.toLowerCase()}">

                    ${product.status}

                </span>

            </p>

            <p>${product.description}</p>

            <div class="buttons">

                <button

                    class="cart"

                    onclick="moveToCart(${index})">

                    Move to Cart

                </button>

                <button

                    class="buy"

                    onclick="buyNow(${index})">

                    Buy Now

                </button>

                <button

                    class="remove"

                    onclick="removeWishlist(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

}

displayWishlist();
// ===============================
// Move to Cart
// ===============================

function moveToCart(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = wishlist[index];

    let exists = cart.find(function (item) {

        return item.product === product.product;

    });

    if (exists) {

        exists.quantity += 1;

    }

    else {

        cart.push({

            product: product.product,

            seller: product.seller,

            category: product.category,

            price: product.price,

            description: product.description,

            contact: product.contact,

            status: product.status,

            quantity: 1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    wishlist.splice(index, 1);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    displayWishlist();

    alert("Product moved to Cart.");

}

function buyNow(index) {

    let product = wishlist[index];

    localStorage.setItem("buyNow", JSON.stringify({

        product: product.product,

        seller: product.seller,

        category: product.category,

        price: product.price,

        description: product.description,

        contact: product.contact,

        status: product.status,

        quantity: 1

    }));

    window.location.href = "checkout.html";

}

function removeWishlist(index) {

    let check = confirm("Remove this product from Wishlist?");

    if (!check) {

        return;

    }

    wishlist.splice(index, 1);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    displayWishlist();

    alert("Product removed from Wishlist.");

}

function saveWishlist() {

    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );

}

displayWishlist();