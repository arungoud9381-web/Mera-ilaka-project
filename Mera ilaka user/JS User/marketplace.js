let products = JSON.parse(localStorage.getItem("products")) || [];

const productContainer = document.getElementById("productContainer");
const search = document.getElementById("search");

function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {

        productContainer.innerHTML = "<h2>No Products Available</h2>";

        return;
    }

    productList.forEach(function (product, index) {

        productContainer.innerHTML += `

        <div class="card">

            <h3>${product.product}</h3>

            <p><strong>Seller :</strong> ${product.seller}</p>

            <p><strong>Price :</strong> ${product.price}</p>

            <p>
                <strong>Status :</strong>
                <span class="${product.status.toLowerCase()}">
                    ${product.status}
                </span>
            </p>

            <div class="buttons">

                <button class="view" onclick="viewProduct(${index})">
                    View
                </button>

                <button class="wishlist" onclick="wishlist(${index})">
                    Wishlist
                </button>

                <button class="cart" onclick="cart(${index})">
                    Cart
                </button>

                <button class="buy" onclick="buyNow(${index})">
                    Buy Now
                </button>

            </div>

        </div>

        `;

    });

}

search.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let filteredProducts = products.filter(function (product) {

        return product.product.toLowerCase().includes(value);

    });

    displayProducts(filteredProducts);

});

function viewProduct(index) {

    alert(
        "Product : " + products[index].product +
        "\nSeller : " + products[index].seller +
        "\nPrice : " + products[index].price +
        "\nStatus : " + products[index].status
    );

}

function wishlist(index) {

    alert(products[index].product + " added to Wishlist.");

}

function cart(index) {

    alert(products[index].product + " added to Cart.");

}

function buyNow(index) {

    alert("Proceeding to Buy " + products[index].product);

}

displayProducts(products);