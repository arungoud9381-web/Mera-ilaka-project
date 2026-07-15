const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

// Elements
const addNotificationBtn = document.getElementById("addNotificationBtn");
const searchNotification = document.getElementById("searchNotification");
const tableBody = document.querySelector("#notificationTable tbody");

// Notifications Data
let notifications = JSON.parse(localStorage.getItem("notifications")) || [

    {

        title: "Welcome",

        message: "Welcome to Mera Ilaka.",

        type: "Info",

        date: "15-07-2026"

    },

    {

        title: "Service Update",

        message: "New services are available.",

        type: "Success",

        date: "16-07-2026"

    }

];

function displayNotifications() {

    tableBody.innerHTML = "";

    notifications.forEach(function (notification, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${notification.title}</td>

            <td>${notification.message}</td>

            <td>

                <span class="${notification.type.toLowerCase()}">

                    ${notification.type}

                </span>

            </td>

            <td>${notification.date}</td>

            <td>

                <button class="view" onclick="viewNotification(${index})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="edit" onclick="editNotification(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete" onclick="deleteNotification(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    localStorage.setItem("notifications", JSON.stringify(notifications));

}

addNotificationBtn.addEventListener("click", function () {

    let title = prompt("Enter Notification Title");

    if (title == null || title.trim() == "") return;

    let message = prompt("Enter Notification Message");

    if (message == null || message.trim() == "") return;

    let type = prompt("Enter Type (Info / Success / Warning / Danger)");

    if (type == null || type.trim() == "") return;

    let today = new Date().toLocaleDateString("en-GB");

    notifications.push({

        title: title,

        message: message,

        type: type,

        date: today

    });

    displayNotifications();

    alert("Notification Added Successfully.");

});

function viewNotification(index) {

    const notification = notifications[index];

    alert(

        "Title : " + notification.title +

        "\n\nMessage : " + notification.message +

        "\n\nType : " + notification.type +

        "\n\nDate : " + notification.date

    );

}

function editNotification(index) {

    let title = prompt("Edit Title", notifications[index].title);

    if (title == null) return;

    let message = prompt("Edit Message", notifications[index].message);

    if (message == null) return;

    let type = prompt("Edit Type", notifications[index].type);

    if (type == null) return;

    notifications[index].title = title;
    notifications[index].message = message;
    notifications[index].type = type;

    displayNotifications();

    alert("Notification Updated Successfully.");

}

function deleteNotification(index) {

    if (confirm("Delete this notification?")) {

        notifications.splice(index, 1);

        displayNotifications();

        alert("Notification Deleted Successfully.");

    }

}

searchNotification.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#notificationTable tbody tr");

    rows.forEach(function (row) {

        if (row.innerText.toLowerCase().includes(value)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});

displayNotifications();