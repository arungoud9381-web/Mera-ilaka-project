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
        PAGE LOAD
=========================================*/

document.addEventListener("DOMContentLoaded", function () {

    console.log("Emergency Page Loaded Successfully");

});