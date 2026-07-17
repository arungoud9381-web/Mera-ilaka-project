const productContainer = document.getElementById("productContainer");

const searchProduct = document.getElementById("searchProduct");

const categoryFilter = document.getElementById("categoryFilter");

const sortPrice = document.getElementById("sortPrice");

let products = JSON.parse(localStorage.getItem("products")) || [];

function loadCategories() {

    let categories = [];

    products.forEach(function (product) {

        if (!categories.includes(product.category)) {

            categories.push(product.category);

        }

    });

    categories.forEach(function (category) {

        categoryFilter.innerHTML += `

            <option value="${category}">

                ${category}

            </option>

        `;

    });

}

function displayProducts(productList = products) {

    productContainer.innerHTML = "";

    if (productList.length == 0) {

        productContainer.innerHTML = `

            <div class="no-products">

                <h2>No Products Found</h2>

            </div>

        `;

        return;

    }

    productList.forEach(function (product, index) {

        productContainer.innerHTML += `

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

            <p>

                ${product.description.substring(0, 60)}...

            </p>

            <div class="buttons">

                <button

                    class="view"

                    onclick="viewProduct(${index})">

                    View

                </button>

                <button

                    class="wishlist"

                    onclick="addWishlist(${index})">

                    Wishlist

                </button>

                <button

                    class="cart"

                    onclick="addCart(${index})">

                    Add Cart

                </button>

                <button

                    class="buy"

                    onclick="buyNow(${index})">

                    Buy Now

                </button>

            </div>

        </div>

        `;

    });

}

loadCategories();

displayProducts();

searchProduct.addEventListener("keyup", function () {

    filterProducts();

});

categoryFilter.addEventListener("change", function () {

    filterProducts();

});

sortPrice.addEventListener("change", function () {

    filterProducts();

});

function filterProducts() {

    let searchValue = searchProduct.value.toLowerCase();

    let categoryValue = categoryFilter.value;

    let filtered = products.filter(function (product) {

        let matchSearch =

            product.product.toLowerCase().includes(searchValue) ||

            product.seller.toLowerCase().includes(searchValue) ||

            product.category.toLowerCase().includes(searchValue);

        let matchCategory =

            categoryValue === "All" ||

            product.category === categoryValue;

        return matchSearch && matchCategory;

    });

    if (sortPrice.value === "low") {

        filtered.sort(function (a, b) {

            return parseInt(a.price.replace("₹", "")) -

                parseInt(b.price.replace("₹", ""));

        });

    }

    if (sortPrice.value === "high") {

        filtered.sort(function (a, b) {

            return parseInt(b.price.replace("₹", "")) -

                parseInt(a.price.replace("₹", ""));

        });

    }

    displayProducts(filtered);

}

function viewProduct(index) {

    localStorage.setItem(

        "selectedProduct",

        JSON.stringify(products[index])

    );

    window.location.href = "product-details.html";

}

function addWishlist(index) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let exists = wishlist.find(function (item) {

        return item.product === products[index].product;

    });

    if (exists) {

        alert("Product already exists in Wishlist.");

        return;

    }

    wishlist.push(products[index]);

    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );

    alert("Added to Wishlist.");

}

function addCart(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let exists = cart.find(function (item) {

        return item.product === products[index].product;

    });

    if (exists) {

        exists.quantity++;

    }

    else {

        cart.push({

            ...products[index],

            quantity: 1

        });

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    alert("Added to Cart.");

}

function buyNow(index) {

    localStorage.setItem(

        "buyNow",

        JSON.stringify({

            ...products[index],

            quantity: 1

        })

    );

    window.location.href = "checkout.html";

}

filterProducts();