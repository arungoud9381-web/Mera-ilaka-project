const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

// Elements
const addEventBtn = document.getElementById("addEventBtn");
const searchEvent = document.getElementById("searchEvent");
const tableBody = document.querySelector("#eventTable tbody");

// Events Data
let events = JSON.parse(localStorage.getItem("events")) || [

    {

        event: "Blood Donation Camp",

        organizer: "Red Cross",

        date: "20-Jul-2026",

        status: "Upcoming"

    },

    {

        event: "Clean City Drive",

        organizer: "Municipality",

        date: "15-Jul-2026",

        status: "Completed"

    }

];

function displayEvents() {

    tableBody.innerHTML = "";

    events.forEach(function (event, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${event.event}</td>

            <td>${event.organizer}</td>

            <td>${event.date}</td>

            <td>

                <span class="${event.status.toLowerCase()}">

                    ${event.status}

                </span>

            </td>

            <td>

                <button class="view" onclick="viewEvent(${index})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="edit" onclick="editEvent(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete" onclick="deleteEvent(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    localStorage.setItem("events", JSON.stringify(events));

}

addEventBtn.addEventListener("click", function () {

    let eventName = prompt("Enter Event Name");

    if (eventName == null || eventName.trim() == "") return;

    let organizer = prompt("Enter Organizer Name");

    if (organizer == null || organizer.trim() == "") return;

    let date = prompt("Enter Event Date");

    if (date == null || date.trim() == "") return;

    events.push({

        event: eventName,

        organizer: organizer,

        date: date,

        status: "Upcoming"

    });

    displayEvents();

    alert("Event Added Successfully.");

});

function viewEvent(index) {

    const event = events[index];

    alert(

        "Event : " + event.event +

        "\n\nOrganizer : " + event.organizer +

        "\n\nDate : " + event.date +

        "\n\nStatus : " + event.status

    );

}

function editEvent(index) {

    let eventName = prompt("Edit Event Name", events[index].event);

    if (eventName == null) return;

    let organizer = prompt("Edit Organizer", events[index].organizer);

    if (organizer == null) return;

    let date = prompt("Edit Date", events[index].date);

    if (date == null) return;

    events[index].event = eventName;
    events[index].organizer = organizer;
    events[index].date = date;

    displayEvents();

    alert("Event Updated Successfully.");

}

function deleteEvent(index) {

    if (confirm("Delete this event?")) {

        events.splice(index, 1);

        displayEvents();

        alert("Event Deleted Successfully.");

    }

}

searchEvent.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#eventTable tbody tr");

    rows.forEach(function (row) {

        if (row.innerText.toLowerCase().includes(value)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});

displayEvents();