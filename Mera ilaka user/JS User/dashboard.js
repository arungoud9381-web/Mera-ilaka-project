const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}

const userName = document.getElementById("userName");

const logoutBtn = document.getElementById("logoutBtn");

const marketCount = document.getElementById("marketCount");

const businessCount = document.getElementById("businessCount");

const serviceCount = document.getElementById("serviceCount");

const eventCount = document.getElementById("eventCount");

const notificationList = document.getElementById("notificationList");

const upcomingEvents = document.getElementById("upcomingEvents");

userName.textContent = currentUser.name || "User";

const products = JSON.parse(localStorage.getItem("products")) || [];

const businesses = JSON.parse(localStorage.getItem("businesses")) || [];

const services = JSON.parse(localStorage.getItem("services")) || [];

const events = JSON.parse(localStorage.getItem("events")) || [];

const notifications = JSON.parse(localStorage.getItem("notifications")) || [];


marketCount.textContent = products.length + " Products";

businessCount.textContent = businesses.length + " Businesses";

serviceCount.textContent = services.length + " Services";

eventCount.textContent = events.length + " Events";

notificationList.innerHTML = "";

if (notifications.length === 0) {

    notificationList.innerHTML = "<p>No notifications available.</p>";

} else {

    notifications.slice(-5).reverse().forEach(function (item) {

        const p = document.createElement("p");

        p.textContent = "🔔 " + (item.title || item.message || "Notification");

        notificationList.appendChild(p);

    });

}

upcomingEvents.innerHTML = "";

if (events.length === 0) {

    upcomingEvents.innerHTML = "<p>No upcoming events.</p>";

} else {

    events.slice(0, 5).forEach(function (event) {

        const p = document.createElement("p");

        p.textContent = "📅 " + (event.title || event.name || "Event");

        upcomingEvents.appendChild(p);

    });

}

logoutBtn.addEventListener("click", function () {

    const confirmLogout = confirm("Do you want to logout?");

    if (confirmLogout) {

        localStorage.removeItem("currentUser");

        alert("Logged out successfully.");

        window.location.href = "login.html";

    }

});

console.log("Dashboard Loaded Successfully");