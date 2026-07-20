const dashboardBtn = document.getElementById("dashboardBtn");

if (dashboardBtn) {

    dashboardBtn.addEventListener("click", function () {

        window.location.href = "dashboard.html";

    });

}

document.addEventListener("DOMContentLoaded", function () {

    console.log("Emergency Page Loaded Successfully");

});