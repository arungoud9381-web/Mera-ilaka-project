const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

// Elements
const addProductBtn = document.getElementById("addProductBtn");
const searchProduct = document.getElementById("searchProduct");
const tableBody = document.querySelector("#productTable tbody");

// Products Array
let products = JSON.parse(localStorage.getItem("products")) || [

    {

        product: "Laptop",

        seller: "Arun",

        price: "₹45,000",

        status: "Available"

    },

    {

        product: "Mobile Phone",

        seller: "Saikrishna",

        price: "₹15,000",

        status: "Sold"

    }

];

function displayProducts() {

    tableBody.innerHTML = "";

    products.forEach(function (product, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${product.product}</td>

            <td>${product.seller}</td>

            <td>${product.price}</td>

            <td>

                <span class="${product.status.toLowerCase()}">

                    ${product.status}

                </span>

            </td>

            <td>

                <button class="view" onclick="viewProduct(${index})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="edit" onclick="editProduct(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete" onclick="deleteProduct(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    localStorage.setItem("products", JSON.stringify(products));

}

addProductBtn.addEventListener("click", function () {

    let product = prompt("Enter Product Name");

    if (product == null || product.trim() == "") return;

    let seller = prompt("Enter Seller Name");

    if (seller == null || seller.trim() == "") return;

    let price = prompt("Enter Product Price");

    if (price == null || price.trim() == "") return;

    products.push({

        product: product,

        seller: seller,

        price: "₹" + price,

        status: "Available"

    });

    displayProducts();

    alert("Product Added Successfully.");

});

function viewProduct(index) {

    const product = products[index];

    alert(

        "Product : " + product.product +

        "\nSeller : " + product.seller +

        "\nPrice : " + product.price +

        "\nStatus : " + product.status

    );

}

function editProduct(index) {

    let productName = prompt("Edit Product Name", products[index].product);

    if (productName == null) return;

    let seller = prompt("Edit Seller Name", products[index].seller);

    if (seller == null) return;

    let price = prompt("Edit Price", products[index].price.replace("₹", ""));

    if (price == null) return;

    products[index].product = productName;

    products[index].seller = seller;

    products[index].price = "₹" + price;

    displayProducts();

    alert("Product Updated Successfully.");

}

function deleteProduct(index) {

    if (confirm("Delete this product?")) {

        products.splice(index, 1);

        displayProducts();

        alert("Product Deleted Successfully.");

    }

}

searchProduct.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#productTable tbody tr");

    rows.forEach(function (row) {

        if (row.innerText.toLowerCase().includes(value)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});

displayProducts();