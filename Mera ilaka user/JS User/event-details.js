const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

const eventImage = document.getElementById("eventImage");
const eventName = document.getElementById("eventName");
const eventCategory = document.getElementById("eventCategory");
const eventDate = document.getElementById("eventDate");
const eventTime = document.getElementById("eventTime");
const eventLocation = document.getElementById("eventLocation");
const eventOrganizer = document.getElementById("eventOrganizer");
const eventPhone = document.getElementById("eventPhone");
const eventStatus = document.getElementById("eventStatus");
const eventDescription = document.getElementById("eventDescription");

const callBtn = document.getElementById("callBtn");
const backBtn = document.getElementById("backBtn");

const event = JSON.parse(localStorage.getItem("selectedEvent"));

if (!event) {

    alert("No Event Found");

    window.location.href = "events.html";

}

eventImage.src = event.image || "https://via.placeholder.com/900x400?text=No+Image";

eventName.textContent = event.eventName;

eventCategory.textContent = event.category;

eventDate.textContent = event.date;

eventTime.textContent = event.time;

eventLocation.textContent = event.location;

eventOrganizer.textContent = event.organizer;

eventPhone.textContent = event.phone;

eventStatus.textContent = event.status;

eventDescription.textContent = event.description;

if (event.status === "Active") {

    eventStatus.style.background = "#d1e7dd";

    eventStatus.style.color = "#198754";

}

else {

    eventStatus.style.background = "#f8d7da";

    eventStatus.style.color = "#dc3545";

}

callBtn.addEventListener("click", function () {

    window.location.href = "tel:" + event.phone;

});

backBtn.addEventListener("click", function () {

    window.location.href = "events.html";

});