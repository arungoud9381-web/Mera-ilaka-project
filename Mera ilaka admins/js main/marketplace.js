const productForm = document.getElementById("productForm");
const productTable = document.querySelector("#productTable tbody");
const searchProduct = document.getElementById("searchProduct");

const totalProducts = document.getElementById("totalProducts");
const availableProducts = document.getElementById("availableProducts");
const soldProducts = document.getElementById("soldProducts");

const viewModal = document.getElementById("viewModal");
const closeView = document.getElementById("closeView");
const viewContent = document.getElementById("viewContent");

const saveBtn = document.getElementById("saveBtn");

let editIndex = -1;

let products = JSON.parse(localStorage.getItem("products"));

if (!products) {

    products = [

        {
            product: "Dell Laptop",
            seller: "Arun",
            category: "Electronics",
            price: "₹45000",
            description: "Dell Inspiron Laptop",
            contact: "9876543210",
            status: "Available"
        },

        {
            product: "Samsung Mobile",
            seller: "Rahul",
            category: "Mobiles",
            price: "₹18000",
            description: "Android Mobile 128GB",
            contact: "9876501234",
            status: "Available"
        },

        {
            product: "Office Chair",
            seller: "Priya",
            category: "Furniture",
            price: "₹6500",
            description: "Comfortable Office Chair",
            contact: "9876512345",
            status: "Sold"
        }

    ];

    localStorage.setItem("products", JSON.stringify(products));

}

function saveProducts() {

    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );

}

function updateStatistics() {

    totalProducts.innerHTML = products.length;

    availableProducts.innerHTML = products.filter(function (item) {

        return item.status == "Available";

    }).length;

    soldProducts.innerHTML = products.filter(function (item) {

        return item.status == "Sold";

    }).length;

}

function displayProducts(list = products) {

    productTable.innerHTML = "";

    list.forEach(function (product, index) {

        productTable.innerHTML += `

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

                <button class="view"

                    onclick="viewProduct(${index})">

                    View

                </button>

                <button class="edit"

                    onclick="editProduct(${index})">

                    Edit

                </button>

                <button class="delete"

                    onclick="deleteProduct(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    updateStatistics();

    saveProducts();

}

productForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let product = {

        product: document.getElementById("productName").value,

        seller: document.getElementById("sellerName").value,

        category: document.getElementById("category").value,

        price: "₹" + document.getElementById("price").value,

        description: document.getElementById("description").value,

        contact: document.getElementById("contact").value,

        status: document.getElementById("status").value

    };

    if (editIndex == -1) {

        products.push(product);

    }

    else {

        products[editIndex] = product;

        editIndex = -1;

        saveBtn.innerHTML = "Add Product";

    }

    saveProducts();

    displayProducts();

    productForm.reset();

});

function viewProduct(index) {

    let product = products[index];

    viewContent.innerHTML = `

        <p><strong>Product :</strong> ${product.product}</p>

        <p><strong>Seller :</strong> ${product.seller}</p>

        <p><strong>Category :</strong> ${product.category}</p>

        <p><strong>Price :</strong> ${product.price}</p>

        <p><strong>Description :</strong> ${product.description}</p>

        <p><strong>Contact :</strong> ${product.contact}</p>

        <p><strong>Status :</strong> ${product.status}</p>

    `;

    viewModal.style.display = "block";

}

closeView.onclick = function () {

    viewModal.style.display = "none";

}

window.onclick = function (event) {

    if (event.target == viewModal) {

        viewModal.style.display = "none";

    }

}

function editProduct(index) {

    let product = products[index];

    document.getElementById("productName").value = product.product;

    document.getElementById("sellerName").value = product.seller;

    document.getElementById("category").value = product.category;

    document.getElementById("price").value = product.price.replace("₹", "");

    document.getElementById("description").value = product.description;

    document.getElementById("contact").value = product.contact;

    document.getElementById("status").value = product.status;

    editIndex = index;

    saveBtn.innerHTML = "Update Product";

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

function deleteProduct(index) {

    let check = confirm("Delete this product?");

    if (!check) {

        return;

    }

    products.splice(index, 1);

    saveProducts();

    displayProducts();

}

searchProduct.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let filtered = products.filter(function (product) {

        return (

            product.product.toLowerCase().includes(value) ||

            product.seller.toLowerCase().includes(value) ||

            product.category.toLowerCase().includes(value) ||

            product.status.toLowerCase().includes(value)

        );

    });

    displayProducts(filtered);

});

function resetForm() {

    productForm.reset();

    editIndex = -1;

    saveBtn.innerHTML = "Add Product";

}

displayProducts();