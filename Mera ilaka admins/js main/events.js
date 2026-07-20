const dashboardBtn = document.getElementById("dashboardBtn");

if (dashboardBtn) {

    dashboardBtn.addEventListener("click", function () {

        window.location.href = "dashboard.html";

    });

}

const eventName = document.getElementById("eventName");
const category = document.getElementById("category");
const date = document.getElementById("date");
const time = document.getElementById("time");
const eventLocation = document.getElementById("location");
const organizer = document.getElementById("organizer");
const phone = document.getElementById("phone");
const description = document.getElementById("description");
const image = document.getElementById("image");
const status = document.getElementById("status");

const saveEventBtn = document.getElementById("saveEventBtn");
const clearBtn = document.getElementById("clearBtn");
const searchEvent = document.getElementById("searchEvent");

const tableBody = document.querySelector("#eventTable tbody");

let events = JSON.parse(localStorage.getItem("events")) || [];

let editIndex = -1;

function displayEvents() {

    tableBody.innerHTML = "";

    if (events.length === 0) {

        tableBody.innerHTML = `

        <tr>

            <td colspan="7">No Events Available</td>

        </tr>

        `;

        return;

    }

    events.forEach(function (event, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${event.eventName}</td>

            <td>${event.category}</td>

            <td>${event.date}</td>

            <td>${event.location}</td>

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

}

saveEventBtn.addEventListener("click", function () {

    if (

        eventName.value.trim() === "" ||

        category.value === "" ||

        date.value === "" ||

        time.value === "" ||

        eventLocation.value.trim() === "" ||

        organizer.value.trim() === "" ||

        phone.value.trim() === ""

    ) {

        alert("Please fill all required fields.");

        return;

    }

    const event = {

        id: Date.now(),

        eventName: eventName.value,

        category: category.value,

        date: date.value,

        time: time.value,

        location: eventLocation.value,

        organizer: organizer.value,

        phone: phone.value,

        description: description.value,

        image: image.value,

        status: status.value

    };

    if (editIndex === -1) {

        events.push(event);

        alert("Event Added Successfully.");

    }

    else {

        event.id = events[editIndex].id;

        events[editIndex] = event;

        editIndex = -1;

        alert("Event Updated Successfully.");

    }

    localStorage.setItem("events", JSON.stringify(events));

    clearForm();

    displayEvents();

});

function viewEvent(index) {

    const event = events[index];

    alert(

        "Event Name : " + event.eventName +

        "\n\nCategory : " + event.category +

        "\n\nDate : " + event.date +

        "\n\nTime : " + event.time +

        "\n\nLocation : " + event.location +

        "\n\nOrganizer : " + event.organizer +

        "\n\nPhone : " + event.phone +

        "\n\nStatus : " + event.status +

        "\n\nDescription : " + event.description

    );

}

function editEvent(index) {

    editIndex = index;

    const event = events[index];

    eventName.value = event.eventName;

    category.value = event.category;

    date.value = event.date;

    time.value = event.time;

    eventLocation.value = event.location;

    organizer.value = event.organizer;

    phone.value = event.phone;

    description.value = event.description;

    image.value = event.image;

    status.value = event.status;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

function deleteEvent(index) {

    if (confirm("Delete this event?")) {

        events.splice(index, 1);

        localStorage.setItem("events", JSON.stringify(events));

        displayEvents();

        alert("Event Deleted Successfully.");

    }

}

function clearForm() {

    eventName.value = "";

    category.value = "";

    date.value = "";

    time.value = "";

    eventLocation.value = "";

    organizer.value = "";

    phone.value = "";

    description.value = "";

    image.value = "";

    status.value = "Active";

}

clearBtn.addEventListener("click", clearForm);

searchEvent.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

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