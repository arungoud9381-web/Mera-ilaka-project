const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

const serviceName = document.getElementById("serviceName");
const providerName = document.getElementById("providerName");
const category = document.getElementById("category");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const experience = document.getElementById("experience");
const price = document.getElementById("price");
const description = document.getElementById("description");
const image = document.getElementById("image");
const status = document.getElementById("status");

const saveServiceBtn = document.getElementById("saveServiceBtn");
const clearBtn = document.getElementById("clearBtn");

const searchService = document.getElementById("searchService");

const tableBody = document.querySelector("#serviceTable tbody");

let services = JSON.parse(localStorage.getItem("services")) || [];

let editIndex = -1;

function displayServices() {

    tableBody.innerHTML = "";

    services.forEach(function (service, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${service.serviceName}</td>

            <td>${service.providerName}</td>

            <td>${service.category}</td>

            <td>${service.phone}</td>

            <td>${service.price}</td>

            <td>

                <span class="${service.status.toLowerCase()}">

                    ${service.status}

                </span>

            </td>

            <td>

                <button class="view"
                    onclick="viewService(${index})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="edit"
                    onclick="editService(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete"
                    onclick="deleteService(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    localStorage.setItem("services", JSON.stringify(services));

}

saveServiceBtn.addEventListener("click", function () {

    if (

        serviceName.value.trim() === "" ||

        providerName.value.trim() === "" ||

        category.value === "" ||

        address.value.trim() === "" ||

        phone.value.trim() === "" ||

        experience.value.trim() === "" ||

        price.value.trim() === ""

    ) {

        alert("Please fill all required fields.");

        return;

    }

    const service = {

        serviceName: serviceName.value,

        providerName: providerName.value,

        category: category.value,

        address: address.value,

        phone: phone.value,

        email: email.value,

        experience: experience.value,

        price: price.value,

        description: description.value,

        image: image.value,

        status: status.value

    };

    if (editIndex === -1) {

        services.push(service);

        alert("Service Added Successfully.");

    }

    else {

        services[editIndex] = service;

        alert("Service Updated Successfully.");

        editIndex = -1;

    }

    localStorage.setItem("services", JSON.stringify(services));

    clearForm();

    displayServices();

});

function viewService(index) {

    const s = services[index];

    alert(

        "Service : " + s.serviceName +

        "\nProvider : " + s.providerName +

        "\nCategory : " + s.category +

        "\nPhone : " + s.phone +

        "\nEmail : " + s.email +

        "\nExperience : " + s.experience +

        "\nPrice : " + s.price +

        "\nStatus : " + s.status +

        "\nAddress : " + s.address +

        "\nDescription : " + s.description

    );

}

function editService(index) {

    editIndex = index;

    const s = services[index];

    serviceName.value = s.serviceName;

    providerName.value = s.providerName;

    category.value = s.category;

    address.value = s.address;

    phone.value = s.phone;

    email.value = s.email;

    experience.value = s.experience;

    price.value = s.price;

    description.value = s.description;

    image.value = s.image;

    status.value = s.status;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

function deleteService(index) {

    if (confirm("Delete this Service?")) {

        services.splice(index, 1);

        localStorage.setItem("services", JSON.stringify(services));

        displayServices();

        alert("Service Deleted Successfully.");

    }

}

function clearForm() {

    serviceName.value = "";

    providerName.value = "";

    category.value = "";

    address.value = "";

    phone.value = "";

    email.value = "";

    experience.value = "";

    price.value = "";

    description.value = "";

    image.value = "";

    status.value = "Active";

}

clearBtn.addEventListener("click", clearForm);

searchService.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#serviceTable tbody tr");

    rows.forEach(function (row) {

        if (row.innerText.toLowerCase().includes(value)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});

displayServices();