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
        NEW REQUEST
=========================================*/

const newTicketBtn = document.getElementById("newTicketBtn");

if (newTicketBtn) {

    newTicketBtn.addEventListener("click", function () {

        window.location.href = "create-ticket.html";

    });

}

/*=========================================
        ELEMENTS
=========================================*/

const searchSupport = document.getElementById("searchSupport");
const statusFilter = document.getElementById("statusFilter");
const tableBody = document.querySelector("#supportTable tbody");

/*=========================================
        CURRENT USER
=========================================*/

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {

    id: "USR001",

    name: "Guest User"

};

/*=========================================
        DATA
=========================================*/

let supports = JSON.parse(localStorage.getItem("supportRequests")) || [];

/*=========================================
        DISPLAY REQUESTS
=========================================*/

function displaySupport() {

    tableBody.innerHTML = "";

    const search = searchSupport.value.toLowerCase();

    const status = statusFilter.value;

    const myRequests = supports.filter(function (request) {

        const sameUser = request.userId === currentUser.id;

        const matchSearch =

            (request.title || "").toLowerCase().includes(search) ||

            (request.category || "").toLowerCase().includes(search);

        const matchStatus =

            status === "All" ||

            request.status === status;

        return sameUser && matchSearch && matchStatus;

    });

    if (myRequests.length === 0) {

        tableBody.innerHTML = `

        <tr>

            <td colspan="6">

                No Support Requests Found

            </td>

        </tr>

        `;

        return;

    }

    myRequests.forEach(function (request, index) {

        let statusClass = request.status
            .toLowerCase()
            .replace(" ", "-");

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${request.title}</td>

            <td>${request.category}</td>

            <td>${request.date}</td>

            <td>

                <span class="${statusClass}">

                    ${request.status}

                </span>

            </td>

            <td class="response">

                ${request.response || "Waiting for admin response"}

            </td>

        </tr>

        `;

    });

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
        INITIAL LOAD
=========================================*/

displaySupport();