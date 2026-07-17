// Dashboard Button

const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

// Elements

const addProductBtn = document.getElementById("addProductBtn");
const searchProduct = document.getElementById("searchProduct");
const tableBody = document.querySelector("#productTable tbody");

// Products

let products = JSON.parse(localStorage.getItem("products")) || [

    {

        product: "Laptop",

        seller: "Arun",

        category: "Electronics",

        price: "₹45,000",

        description: "Dell Laptop with 16GB RAM and 512GB SSD.",

        contact: "9876543210",

        status: "Available"

    },

    {

        product: "Mobile Phone",

        seller: "Rahul",

        category: "Mobiles",

        price: "₹15,000",

        description: "Android Mobile with 128GB Storage.",

        contact: "9876501234",

        status: "Sold"

    }

];

// Display Products

function displayProducts() {

    tableBody.innerHTML = "";

    products.forEach(function (product, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${product.product}</td>

            <td>${product.seller}</td>

            <td>${product.category}</td>

            <td>${product.price}</td>

            <td>

                <span class="${product.status.toLowerCase()}">

                    ${product.status}

                </span>

            </td>

            <td>

                <button class="view" onclick="viewProduct(${index})">

                    View

                </button>

                <button class="edit" onclick="editProduct(${index})">

                    Edit

                </button>

                <button class="delete" onclick="deleteProduct(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    localStorage.setItem("products", JSON.stringify(products));

}

// Add Product

addProductBtn.addEventListener("click", function () {

    let product = prompt("Enter Product Name");

    if (product == null || product.trim() == "") return;

    let seller = prompt("Enter Seller Name");

    if (seller == null || seller.trim() == "") return;

    let category = prompt("Enter Product Category");

    if (category == null || category.trim() == "") return;

    let price = prompt("Enter Product Price");

    if (price == null || price.trim() == "") return;

    let description = prompt("Enter Product Description");

    if (description == null || description.trim() == "") return;

    let contact = prompt("Enter Contact Number");

    if (contact == null || contact.trim() == "") return;

    let status = prompt("Enter Status (Available/Sold)");

    if (status == null || status.trim() == "") {

        status = "Available";

    }

    products.push({

        product: product,

        seller: seller,

        category: category,

        price: "₹" + price,

        description: description,

        contact: contact,

        status: status

    });

    displayProducts();

    alert("Product Added Successfully.");

});

// View Product

function viewProduct(index) {

    const product = products[index];

    alert(

        "Product : " + product.product +

        "\nSeller : " + product.seller +

        "\nCategory : " + product.category +

        "\nPrice : " + product.price +

        "\nDescription : " + product.description +

        "\nContact : " + product.contact +

        "\nStatus : " + product.status

    );

}

// Edit Product

function editProduct(index) {

    let productName = prompt("Edit Product Name", products[index].product);

    if (productName == null) return;

    let seller = prompt("Edit Seller Name", products[index].seller);

    if (seller == null) return;

    let category = prompt("Edit Category", products[index].category);

    if (category == null) return;

    let price = prompt("Edit Price", products[index].price.replace("₹", ""));

    if (price == null) return;

    let description = prompt("Edit Description", products[index].description);

    if (description == null) return;

    let contact = prompt("Edit Contact", products[index].contact);

    if (contact == null) return;

    let status = prompt("Edit Status", products[index].status);

    if (status == null) return;

    products[index].product = productName;

    products[index].seller = seller;

    products[index].category = category;

    products[index].price = "₹" + price;

    products[index].description = description;

    products[index].contact = contact;

    products[index].status = status;

    displayProducts();

    alert("Product Updated Successfully.");

}

// Delete Product

function deleteProduct(index) {

    if (confirm("Delete this product?")) {

        products.splice(index, 1);

        displayProducts();

        alert("Product Deleted Successfully.");

    }

}

// Search Product

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

// Load Products

displayProducts();