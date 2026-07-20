/*=========================================
        DASHBOARD BUTTON
=========================================*/

const dashboardBtn = document.getElementById("dashboardBtn");

if (dashboardBtn) {

    dashboardBtn.addEventListener("click", function () {

        window.location.href = "dashboard.html";

    });

}

/*=========================================
        GET DATA
=========================================*/

const users = JSON.parse(localStorage.getItem("users")) || [];

const businesses = JSON.parse(localStorage.getItem("businesses")) || [];

const services = JSON.parse(localStorage.getItem("services")) || [];

const events = JSON.parse(localStorage.getItem("events")) || [];

const posts = JSON.parse(localStorage.getItem("communityPosts")) || [];

const support = JSON.parse(localStorage.getItem("supportRequests")) || [];

/*=========================================
        ELEMENTS
=========================================*/

const totalUsers = document.getElementById("totalUsers");

const totalBusinesses = document.getElementById("totalBusinesses");

const totalServices = document.getElementById("totalServices");

const totalEvents = document.getElementById("totalEvents");

const totalPosts = document.getElementById("totalPosts");

const totalSupport = document.getElementById("totalSupport");

/*=========================================
        DISPLAY REPORTS
=========================================*/

function loadReports() {

    totalUsers.textContent = users.length;

    totalBusinesses.textContent = businesses.length;

    totalServices.textContent = services.length;

    totalEvents.textContent = events.length;

    totalPosts.textContent = posts.length;

    totalSupport.textContent = support.length;

}

/*=========================================
        SAMPLE DATA
=========================================*/

if (users.length === 0) {

    localStorage.setItem("users", JSON.stringify([
        { id: 1, name: "Arunsai" },
        { id: 2, name: "Rahul" },
        { id: 3, name: "Priya" }
    ]));

}

if (businesses.length === 0) {

    localStorage.setItem("businesses", JSON.stringify([
        { name: "Sri Balaji Medicals" },
        { name: "Fresh Mart" }
    ]));

}

if (services.length === 0) {

    localStorage.setItem("services", JSON.stringify([
        { name: "Electrician" },
        { name: "Plumber" },
        { name: "Home Cleaning" }
    ]));

}

if (events.length === 0) {

    localStorage.setItem("events", JSON.stringify([
        { name: "Blood Donation Camp" },
        { name: "Independence Day Celebration" }
    ]));

}

if (posts.length === 0) {

    localStorage.setItem("communityPosts", JSON.stringify([
        { title: "Road Cleaning Drive" },
        { title: "Tree Plantation Program" }
    ]));

}

if (support.length === 0) {

    localStorage.setItem("supportRequests", JSON.stringify([
        {
            title: "Street Light Not Working"
        },
        {
            title: "Garbage Collection Delay"
        }
    ]));

}

/*=========================================
        RELOAD DATA
=========================================*/

loadReports();