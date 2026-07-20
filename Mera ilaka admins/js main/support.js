/*=========================================
        DASHBOARD
=========================================*/

const dashboardBtn = document.getElementById("dashboardBtn");

if (dashboardBtn) {

    dashboardBtn.addEventListener("click", function () {

        window.location.href = "dashboard.html";

    });

}

/*=========================================
        ELEMENTS
=========================================*/

const tableBody = document.querySelector("#supportTable tbody");

const searchSupport = document.getElementById("searchSupport");

const statusFilter = document.getElementById("statusFilter");

/*=========================================
        DATA
=========================================*/

let supports = JSON.parse(localStorage.getItem("supportRequests")) || [];

/*=========================================
        DISPLAY SUPPORT REQUESTS
=========================================*/

function displaySupport() {

    tableBody.innerHTML = "";

    let search = searchSupport.value.toLowerCase();

    let status = statusFilter.value;

    let filtered = supports.filter(function (request) {

        let matchSearch =

            (request.title || "").toLowerCase().includes(search) ||

            (request.userName || "").toLowerCase().includes(search) ||

            (request.category || "").toLowerCase().includes(search);

        let matchStatus =

            status === "All" ||

            request.status === status;

        return matchSearch && matchStatus;

    });

    if (filtered.length === 0) {

        tableBody.innerHTML = `

        <tr>

            <td colspan="7">

                No Support Requests Found

            </td>

        </tr>

        `;

        return;

    }

    filtered.forEach(function (request, index) {

        let statusClass = request.status
            .toLowerCase()
            .replace(" ", "-");

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${request.userName}</td>

            <td>${request.title}</td>

            <td>${request.category}</td>

            <td>${request.date}</td>

            <td>

                <span class="${statusClass}">

                    ${request.status}

                </span>

            </td>

            <td>

                <button class="view"

                    onclick="viewSupport(${index})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="edit"

                    onclick="updateStatus(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete"

                    onclick="deleteSupport(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

/*=========================================
        VIEW SUPPORT
=========================================*/

function viewSupport(index) {

    let request = supports[index];

    alert(

        "Title : " + request.title +

        "\n\nUser : " + request.userName +

        "\n\nCategory : " + request.category +

        "\n\nDate : " + request.date +

        "\n\nStatus : " + request.status +

        "\n\nDescription :\n\n" +

        request.description +

        "\n\nResponse :\n\n" +

        (request.response || "No Response Yet")

    );

}

/*=========================================
        UPDATE STATUS
=========================================*/

function updateStatus(index) {

    let status = prompt(

        "Enter Status\n\nPending\nIn Progress\nResolved\nRejected",

        supports[index].status

    );

    if (status == null) {

        return;

    }

    status = status.trim();

    if (

        status !== "Pending" &&

        status !== "In Progress" &&

        status !== "Resolved" &&

        status !== "Rejected"

    ) {

        alert("Invalid Status");

        return;

    }

    let response = prompt(

        "Admin Response",

        supports[index].response || ""

    );

    supports[index].status = status;

    supports[index].response = response || "";

    localStorage.setItem(

        "supportRequests",

        JSON.stringify(supports)

    );

    displaySupport();

    alert("Support Updated Successfully.");

}

/*=========================================
        DELETE SUPPORT
=========================================*/

function deleteSupport(index) {

    if (confirm("Delete this support request?")) {

        supports.splice(index, 1);

        localStorage.setItem(

            "supportRequests",

            JSON.stringify(supports)

        );

        displaySupport();

        alert("Support Request Deleted.");

    }

}

/*=========================================
        SEARCH
=========================================*/

searchSupport.addEventListener("keyup", displaySupport);

/*=========================================
        FILTER
=========================================*/

statusFilter.addEventListener("change", displaySupport);

/*=========================================
        LOAD
=========================================*/

displaySupport();