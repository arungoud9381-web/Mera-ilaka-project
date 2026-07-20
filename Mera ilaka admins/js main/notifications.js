const dashboardBtn = document.getElementById("dashboardBtn");

if (dashboardBtn) {

    dashboardBtn.addEventListener("click", function () {

        window.location.href = "dashboard.html";

    });

}

const notificationList = document.getElementById("notificationList");

const clearAllBtn = document.getElementById("clearAllBtn");

let adminNotifications = JSON.parse(localStorage.getItem("adminNotifications")) || [];

if (adminNotifications.length === 0) {

    adminNotifications = [

        {

            id: 1,

            title: "New Business Request",

            message: "Rahul submitted a new business for approval.",

            date: "Today",

            read: false

        },

        {

            id: 2,

            title: "New Community Post",

            message: "Arunsai submitted a community post.",

            date: "Today",

            read: false

        },

        {

            id: 3,

            title: "New Support Request",

            message: "Priya created a support request.",

            date: "Yesterday",

            read: true

        }

    ];

    localStorage.setItem(

        "adminNotifications",

        JSON.stringify(adminNotifications)

    );

}

function displayNotifications() {

    notificationList.innerHTML = "";

    if (adminNotifications.length === 0) {

        notificationList.innerHTML = `

        <div class="empty">

            <h2>No Notifications</h2>

            <p>You're all caught up.</p>

        </div>

        `;

        return;

    }

    adminNotifications.forEach(function (notification, index) {

        notificationList.innerHTML += `

        <div class="notification ${notification.read ? "" : "unread"}">

            <h3>${notification.title}</h3>

            <p>${notification.message}</p>

            <small>${notification.date}</small>

            <div class="actions">

                ${notification.read

                ?

                ""

                :

                `<button class="readBtn"

                    onclick="markRead(${index})">

                    Mark as Read

                    </button>`
            }

                <button class="deleteBtn"

                    onclick="deleteNotification(${index})">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}

function markRead(index) {

    adminNotifications[index].read = true;

    localStorage.setItem(

        "adminNotifications",

        JSON.stringify(adminNotifications)

    );

    displayNotifications();

}

function deleteNotification(index) {

    if (confirm("Delete this notification?")) {

        adminNotifications.splice(index, 1);

        localStorage.setItem(

            "adminNotifications",

            JSON.stringify(adminNotifications)

        );

        displayNotifications();

    }

}

clearAllBtn.addEventListener("click", function () {

    if (confirm("Clear all notifications?")) {

        adminNotifications = [];

        localStorage.setItem(

            "adminNotifications",

            JSON.stringify(adminNotifications)

        );

        displayNotifications();

    }

});

displayNotifications();

function addAdminNotification(title, message) {

    let adminNotifications = JSON.parse(localStorage.getItem("adminNotifications")) || [];

    adminNotifications.unshift({

        id: Date.now(),

        title: title,

        message: message,

        date: new Date().toLocaleString(),

        read: false

    });

    localStorage.setItem(

        "adminNotifications",

        JSON.stringify(adminNotifications)

    );

}