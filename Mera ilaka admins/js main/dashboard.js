const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-theme");

        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    }

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {

            localStorage.setItem("theme", "dark");

            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "light");

            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';

        }

    });

}

const dateTime = document.getElementById("dateTime");

function updateDateTime() {

    if (!dateTime) return;

    const now = new Date();

    const options = {

        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"

    };

    dateTime.innerHTML = now.toLocaleString("en-IN", options);

}

updateDateTime();

setInterval(updateDateTime, 1000);

const notificationBtn = document.getElementById("notificationBtn");

if (notificationBtn) {

    notificationBtn.addEventListener("click", function () {

        alert("No new notifications.");

    });

}

const menuItems = document.querySelectorAll(".sidebar ul li");

menuItems.forEach(function (item) {

    item.addEventListener("click", function () {

        menuItems.forEach(function (menu) {

            menu.classList.remove("active");

        });

        this.classList.add("active");

    });

});

const profile = document.querySelector(".profile");

if (profile) {

    profile.addEventListener("click", function () {

        window.location.href = "profile.html";

    });

}

const logoutBtn = document.querySelector(".sidebar ul li:last-child");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        let result = confirm("Are you sure you want to logout?");

        if (result) {

            window.location.href = "login.html";

        }

    });

}

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        menuItems.forEach(function (item) {

            let text = item.textContent.toLowerCase();

            if (text.indexOf(value) > -1) {

                item.style.display = "";

            } else {

                item.style.display = "none";

            }

        });

    });

}

window.addEventListener("load", function () {

    console.log("Welcome to Mera Ilaka Admin Dashboard");

});