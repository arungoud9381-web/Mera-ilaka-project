const eventSearch = document.getElementById("eventSearch");

const eventCards = document.querySelectorAll(".event-card");

const categoryButtons = document.querySelectorAll(".categories button");

const createEventBtn = document.getElementById("createEventBtn");

const eventTitle = document.getElementById("eventTitle");

const eventDate = document.getElementById("eventDate");

const eventTime = document.getElementById("eventTime");

const eventLocation = document.getElementById("eventLocation");

const eventDescription = document.getElementById("eventDescription");

const eventsGrid = document.querySelector(".events-grid");

const registrationHistory = document.getElementById("registrationHistory");

const toast = document.getElementById("toast");

function showToast(message) {

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

eventSearch.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    document.querySelectorAll(".event-card").forEach(card => {

        const text = card.innerText.toLowerCase();

        card.style.display = text.includes(value)

            ? "block"

            : "none";

    });

});

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        categoryButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        const category = this.innerText;

        document.querySelectorAll(".event-card").forEach(card => {

            if (category === "All") {

                card.style.display = "block";

            }

            else {

                card.style.display =

                    card.dataset.category === category

                        ? "block"

                        : "none";

            }

        });

    });

});

createEventBtn.addEventListener("click", () => {

    if (

        eventTitle.value === ""

        || eventDate.value === ""

        || eventTime.value === ""

        || eventLocation.value === ""

        || eventDescription.value === ""

    ) {

        alert("Please fill all fields.");

        return;

    }

    const card = document.createElement("div");

    card.className = "event-card";

    card.dataset.category = "Custom";

    card.innerHTML = `

    <i class="fa-solid fa-calendar-plus event-icon"></i>

    <h3>${eventTitle.value}</h3>

    <p class="event-date">

        <i class="fa-solid fa-calendar"></i>

        ${eventDate.value}

    </p>

    <p class="event-time">

        <i class="fa-solid fa-clock"></i>

        ${eventTime.value}

    </p>

    <p class="event-location">

        <i class="fa-solid fa-location-dot"></i>

        ${eventLocation.value}

    </p>

    <p class="event-description">

        ${eventDescription.value}

    </p>

    <div class="event-actions">

        <button class="register-btn">

            <i class="fa-solid fa-ticket"></i>

            Register

        </button>

        <button class="wish-btn">

            <i class="fa-regular fa-heart"></i>

        </button>

    </div>

    `;

    eventsGrid.prepend(card);

    attachEvents();

    showToast("Event Created Successfully!");

    eventTitle.value = "";

    eventDate.value = "";

    eventTime.value = "";

    eventLocation.value = "";

    eventDescription.value = "";

});

function attachEvents() {

    document.querySelectorAll(".register-btn").forEach(btn => {

        btn.onclick = function () {

            const title = this.closest(".event-card").querySelector("h3").innerText;

            const li = document.createElement("li");

            li.innerHTML = `🎟️ Registered for <strong>${title}</strong>`;

            if (registrationHistory.innerHTML.includes("No registrations yet.")) {

                registrationHistory.innerHTML = "";

            }

            registrationHistory.prepend(li);

            this.innerHTML = '<i class="fa-solid fa-check"></i> Registered';

            this.classList.add("registered");

            this.disabled = true;

            showToast("Registration Successful!");

        };

    });

    document.querySelectorAll(".wish-btn").forEach(btn => {

        btn.onclick = function () {

            this.classList.toggle("active");

            const icon = this.querySelector("i");

            if (this.classList.contains("active")) {

                icon.className = "fa-solid fa-heart";

                showToast("Added to Favorites");

            }

            else {

                icon.className = "fa-regular fa-heart";

                showToast("Removed from Favorites");

            }

        };

    });

}

attachEvents();

window.addEventListener("load", () => {

    console.log("Events Module Loaded");

});