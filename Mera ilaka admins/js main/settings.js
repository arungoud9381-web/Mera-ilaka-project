const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

const themeToggle = document.getElementById("themeToggle");

const rememberToggle = document.getElementById("rememberToggle");

const clearDataBtn = document.getElementById("clearDataBtn");

const logoutBtn = document.getElementById("logoutBtn");

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeToggle.checked = true;

}

// Remember Login

if (localStorage.getItem("rememberLogin") === "true") {

    rememberToggle.checked = true;

}

themeToggle.addEventListener("change", function () {

    if (this.checked) {

        document.body.classList.add("dark");

        localStorage.setItem("theme", "dark");

    }

    else {

        document.body.classList.remove("dark");

        localStorage.setItem("theme", "light");

    }

});

rememberToggle.addEventListener("change", function () {

    if (this.checked) {

        localStorage.setItem("rememberLogin", "true");

        alert("Remember Login Enabled.");

    }

    else {

        localStorage.setItem("rememberLogin", "false");

        alert("Remember Login Disabled.");

    }

});

clearDataBtn.addEventListener("click", function () {

    let confirmClear = confirm("Do you want to clear all project data?");

    if (confirmClear) {

        // Keep Theme & Remember Login

        const theme = localStorage.getItem("theme");

        const remember = localStorage.getItem("rememberLogin");

        localStorage.clear();

        if (theme) {

            localStorage.setItem("theme", theme);

        }

        if (remember) {

            localStorage.setItem("rememberLogin", remember);

        }

        alert("All Project Data Cleared Successfully.");

        location.reload();

    }

});

logoutBtn.addEventListener("click", function () {

    let confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        window.location.href = "login.html";

    }

});

console.log("Settings Loaded Successfully");