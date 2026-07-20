const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

const notificationList = document.getElementById("notificationList");

const clearAllBtn = document.getElementById("clearAllBtn");

let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

if (notifications.length === 0) {

    notifications = [

        {

            id: 1,

            title: "Support Request Updated",

            message: "Your support request 'Street Light Not Working' is now In Progress.",

            date: "Today",

            read: false

        },

        {

            id: 2,

            title: "New Event Added",

            message: "A Blood Donation Camp has been added near your locality.",

            date: "Yesterday",

            read: false

        },

        {

            id: 3,

            title: "Business Approved",

            message: "Your business 'ABC Medicals' has been approved successfully.",

            date: "2 days ago",

            read: true

        }

    ];

    localStorage.setItem(

        "notifications",

        JSON.stringify(notifications)

    );

}

function displayNotifications() {

    notificationList.innerHTML = "";

    if (notifications.length === 0) {

        notificationList.innerHTML = `

            <div class="empty">

                <h2>No Notifications</h2>

                <p>You're all caught up.</p>

            </div>

        `;

        return;

    }

    notifications.forEach(function (notification, index) {

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

    notifications[index].read = true;

    localStorage.setItem(

        "notifications",

        JSON.stringify(notifications)

    );

    displayNotifications();

}

function deleteNotification(index) {

    if (confirm("Delete this notification?")) {

        notifications.splice(index, 1);

        localStorage.setItem(

            "notifications",

            JSON.stringify(notifications)

        );

        displayNotifications();

    }

}

clearAllBtn.addEventListener("click", function () {

    if (confirm("Clear all notifications?")) {

        notifications = [];

        localStorage.setItem(

            "notifications",

            JSON.stringify(notifications)

        );

        displayNotifications();

    }

});
displayNotifications();
function addUserNotification(title, message) {

    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.unshift({

        id: Date.now(),

        title: title,

        message: message,

        date: new Date().toLocaleString(),

        read: false

    });

    localStorage.setItem(

        "notifications",

        JSON.stringify(notifications)

    );

}