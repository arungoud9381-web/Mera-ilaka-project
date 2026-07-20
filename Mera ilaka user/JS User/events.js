const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

const eventContainer = document.getElementById("eventContainer");
const searchEvent = document.getElementById("searchEvent");
const categoryFilter = document.getElementById("categoryFilter");

let events = JSON.parse(localStorage.getItem("events")) || [];

function displayEvents(list) {

    eventContainer.innerHTML = "";

    if (list.length === 0) {

        eventContainer.innerHTML = `

        <div class="no-events">

            <h2>No Events Available</h2>

            <p>Please check back later.</p>

        </div>

        `;

        return;

    }

    list.forEach(function (event, index) {

        eventContainer.innerHTML += `

        <div class="event-card">

            

            <div class="event-content">

                <h2>${event.eventName}</h2>

                <p><strong>Category :</strong> ${event.category}</p>

                <p><strong>Date :</strong> ${event.date}</p>

                <p><strong>Time :</strong> ${event.time}</p>

                <p><strong>Location :</strong> ${event.location}</p>

                <p><strong>Organizer :</strong> ${event.organizer}</p>

                <span class="status ${event.status.toLowerCase()}">

                    ${event.status}

                </span>

                <div class="buttons">

                    <button class="view-btn"

                        onclick="viewEvent(${index})">

                        View Details

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

function filterEvents() {

    const search = searchEvent.value.toLowerCase();

    const category = categoryFilter.value;

    const filtered = events.filter(function (event) {

        const matchSearch =

            event.eventName.toLowerCase().includes(search) ||

            event.location.toLowerCase().includes(search) ||

            event.organizer.toLowerCase().includes(search);

        const matchCategory =

            category === "All" ||

            event.category === category;

        return matchSearch && matchCategory;

    });

    displayEvents(filtered);

}

searchEvent.addEventListener("keyup", filterEvents);

categoryFilter.addEventListener("change", filterEvents);

function viewEvent(index) {

    localStorage.setItem(

        "selectedEvent",

        JSON.stringify(events[index])

    );

    window.location.href = "event-details.html";

}

displayEvents(events);