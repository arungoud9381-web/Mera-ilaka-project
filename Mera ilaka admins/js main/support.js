const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});


const addTicketBtn = document.getElementById("addTicketBtn");
const searchTicket = document.getElementById("searchTicket");
const tableBody = document.querySelector("#ticketTable tbody");

// Support Tickets
let tickets = JSON.parse(localStorage.getItem("supportTickets")) || [

    {

        user: "Arun",

        issue: "Unable to Login",

        priority: "High",

        status: "Open"

    },

    {

        user: "Prem",

        issue: "Marketplace Product Not Visible",

        priority: "Medium",

        status: "Closed"

    }

];

function displayTickets() {

    tableBody.innerHTML = "";

    tickets.forEach(function (ticket, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${ticket.user}</td>

            <td>${ticket.issue}</td>

            <td class="${ticket.priority.toLowerCase()}">

                ${ticket.priority}

            </td>

            <td>

                <span class="${ticket.status.toLowerCase()}">

                    ${ticket.status}

                </span>

            </td>

            <td>

                <button class="view" onclick="viewTicket(${index})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="edit" onclick="editTicket(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete" onclick="deleteTicket(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    localStorage.setItem("supportTickets", JSON.stringify(tickets));

}

addTicketBtn.addEventListener("click", function () {

    let user = prompt("Enter User Name");

    if (user == null || user.trim() == "") return;

    let issue = prompt("Enter Issue");

    if (issue == null || issue.trim() == "") return;

    let priority = prompt("Enter Priority (High / Medium / Low)");

    if (priority == null || priority.trim() == "") return;

    tickets.push({

        user: user,

        issue: issue,

        priority: priority,

        status: "Open"

    });

    displayTickets();

    alert("Support Ticket Added Successfully.");

});

function viewTicket(index) {

    const ticket = tickets[index];

    alert(

        "User : " + ticket.user +

        "\n\nIssue : " + ticket.issue +

        "\n\nPriority : " + ticket.priority +

        "\n\nStatus : " + ticket.status

    );

}

function editTicket(index) {

    let user = prompt("Edit User Name", tickets[index].user);

    if (user == null) return;

    let issue = prompt("Edit Issue", tickets[index].issue);

    if (issue == null) return;

    let priority = prompt("Edit Priority", tickets[index].priority);

    if (priority == null) return;

    tickets[index].user = user;
    tickets[index].issue = issue;
    tickets[index].priority = priority;

    displayTickets();

    alert("Support Ticket Updated Successfully.");

}

function deleteTicket(index) {

    if (confirm("Delete this support ticket?")) {

        tickets.splice(index, 1);

        displayTickets();

        alert("Support Ticket Deleted Successfully.");

    }

}

searchTicket.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#ticketTable tbody tr");

    rows.forEach(function (row) {

        if (row.innerText.toLowerCase().includes(value)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});

displayTickets();