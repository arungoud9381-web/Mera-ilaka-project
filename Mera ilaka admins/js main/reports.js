const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

const users = JSON.parse(localStorage.getItem("users")) || [];

const community = JSON.parse(localStorage.getItem("communityPosts")) || [];

const marketplace = JSON.parse(localStorage.getItem("products")) || [];

const businesses = JSON.parse(localStorage.getItem("businesses")) || [];

const services = JSON.parse(localStorage.getItem("services")) || [];

const events = JSON.parse(localStorage.getItem("events")) || [];

const support = JSON.parse(localStorage.getItem("supportTickets")) || [];

const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

document.getElementById("usersCount").innerText = users.length;

document.getElementById("communityCount").innerText = community.length;

document.getElementById("marketCount").innerText = marketplace.length;

document.getElementById("businessCount").innerText = businesses.length;

document.getElementById("serviceCount").innerText = services.length;

document.getElementById("eventCount").innerText = events.length;

document.getElementById("supportCount").innerText = support.length;

document.getElementById("notificationCount").innerText = notifications.length;

const ctx = document.getElementById("reportChart");

new Chart(ctx, {

    type: "bar",

    data: {

        labels: [

            "Users",

            "Community",

            "Marketplace",

            "Businesses",

            "Services",

            "Events",

            "Support",

            "Notifications"

        ],

        datasets: [{

            label: "Total Records",

            data: [

                users.length,

                community.length,

                marketplace.length,

                businesses.length,

                services.length,

                events.length,

                support.length,

                notifications.length

            ],

            backgroundColor: [

                "#3498db",

                "#9b59b6",

                "#e67e22",

                "#16a085",

                "#2ecc71",

                "#f39c12",

                "#e74c3c",

                "#34495e"

            ],

            borderColor: [

                "#2980b9",

                "#8e44ad",

                "#d35400",

                "#117864",

                "#27ae60",

                "#d68910",

                "#c0392b",

                "#2c3e50"

            ],

            borderWidth: 2

        }]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                display: false

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                ticks: {

                    stepSize: 1

                }

            }

        }

    }

});

console.log("Reports & Analytics Loaded Successfully");