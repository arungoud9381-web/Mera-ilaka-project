const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

const businessName = document.getElementById("businessName");
const ownerName = document.getElementById("ownerName");
const category = document.getElementById("category");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const description = document.getElementById("description");
const image = document.getElementById("image");
const status = document.getElementById("status");

const saveBusinessBtn = document.getElementById("saveBusinessBtn");
const clearBtn = document.getElementById("clearBtn");

const searchBusiness = document.getElementById("searchBusiness");

const tableBody = document.querySelector("#businessTable tbody");

let businesses = JSON.parse(localStorage.getItem("businesses")) || [];

let editIndex = -1;

function displayBusinesses() {

    tableBody.innerHTML = "";

    businesses.forEach(function (business, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${business.name}</td>

            <td>${business.owner}</td>

            <td>${business.category}</td>

            <td>${business.phone}</td>

            <td>

                <span class="${business.status.toLowerCase()}">

                    ${business.status}

                </span>

            </td>

            <td>

                <button class="view"

                    onclick="viewBusiness(${index})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="edit"

                    onclick="editBusiness(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete"

                    onclick="deleteBusiness(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    localStorage.setItem("businesses", JSON.stringify(businesses));

}

saveBusinessBtn.addEventListener("click", function () {

    if (

        businessName.value.trim() === "" ||
        ownerName.value.trim() === "" ||

        category.value === "" ||

        address.value.trim() === "" ||

        phone.value.trim() === ""

    ) {

        alert("Please fill all required fields.");

        return;

    }

    const business = {

        name: businessName.value,

        owner: ownerName.value,

        category: category.value,

        address: address.value,

        phone: phone.value,

        email: email.value,

        description: description.value,

        image: image.value,

        status: status.value

    };

    if (editIndex === -1) {

        businesses.push(business);

        alert("Business Added Successfully.");

    }

    else {

        businesses[editIndex] = business;

        alert("Business Updated Successfully.");

        editIndex = -1;

    }

    localStorage.setItem("businesses", JSON.stringify(businesses));

    clearForm();

    displayBusinesses();

});

function viewBusiness(index) {

    const b = businesses[index];

    alert(

        "Business : " + b.name +

        "\nOwner : " + b.owner +

        "\nCategory : " + b.category +

        "\nAddress : " + b.address +

        "\nPhone : " + b.phone +

        "\nEmail : " + b.email +

        "\nDescription : " + b.description +

        "\nStatus : " + b.status

    );

}

function editBusiness(index) {

    editIndex = index;

    const b = businesses[index];

    businessName.value = b.name;

    ownerName.value = b.owner;

    category.value = b.category;

    address.value = b.address;

    phone.value = b.phone;

    email.value = b.email;

    description.value = b.description;

    image.value = b.image;

    status.value = b.status;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

function deleteBusiness(index) {

    if (confirm("Delete this Business?")) {

        businesses.splice(index, 1);

        localStorage.setItem("businesses", JSON.stringify(businesses));

        displayBusinesses();

        alert("Business Deleted.");

    }

}

function clearForm() {

    businessName.value = "";

    ownerName.value = "";

    category.value = "";

    address.value = "";

    phone.value = "";

    email.value = "";

    description.value = "";

    image.value = "";

    status.value = "Active";

}

clearBtn.addEventListener("click", clearForm);

searchBusiness.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#businessTable tbody tr");

    rows.forEach(function (row) {

        if (row.innerText.toLowerCase().includes(value)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});

displayBusinesses();