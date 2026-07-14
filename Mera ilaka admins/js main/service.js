const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

const addServiceBtn = document.getElementById("addServiceBtn");
const searchService = document.getElementById("searchService");
const tableBody = document.querySelector("#serviceTable tbody");

let services = JSON.parse(localStorage.getItem("services")) || [

    {

        service: "Electrician",

        provider: "Krishna",

        category: "Home Repair",

        status: "Available"

    },

    {

        service: "Plumber",

        provider: "Hari",

        category: "Home Repair",

        status: "Available"

    }

];

function displayServices() {

    tableBody.innerHTML = "";

    services.forEach(function (service, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${service.service}</td>

            <td>${service.provider}</td>

            <td>${service.category}</td>

            <td>

                <span class="${service.status.toLowerCase()}">

                    ${service.status}

                </span>

            </td>

            <td>

                <button class="view" onclick="viewService(${index})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="edit" onclick="editService(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete" onclick="deleteService(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    localStorage.setItem("services", JSON.stringify(services));

}

addServiceBtn.addEventListener("click", function () {

    let service = prompt("Enter Service Name");

    if (service == null || service.trim() == "") return;

    let provider = prompt("Enter Provider Name");

    if (provider == null || provider.trim() == "") return;

    let category = prompt("Enter Category");

    if (category == null || category.trim() == "") return;

    services.push({

        service: service,

        provider: provider,

        category: category,

        status: "Available"

    });

    displayServices();

    alert("Service Added Successfully.");

});

function viewService(index) {

    const service = services[index];

    alert(

        "Service : " + service.service +

        "\n\nProvider : " + service.provider +

        "\n\nCategory : " + service.category +

        "\n\nStatus : " + service.status

    );

}

function editService(index) {

    let serviceName = prompt("Edit Service Name", services[index].service);

    if (serviceName == null) return;

    let provider = prompt("Edit Provider Name", services[index].provider);

    if (provider == null) return;

    let category = prompt("Edit Category", services[index].category);

    if (category == null) return;

    services[index].service = serviceName;
    services[index].provider = provider;
    services[index].category = category;

    displayServices();

    alert("Service Updated Successfully.");

}

function deleteService(index) {

    if (confirm("Delete this service?")) {

        services.splice(index, 1);

        displayServices();

        alert("Service Deleted Successfully.");

    }

}

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