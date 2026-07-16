const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

const adminName = document.getElementById("adminName");

const adminEmail = document.getElementById("adminEmail");

const adminPhone = document.getElementById("adminPhone");

const adminAddress = document.getElementById("adminAddress");

const adminPassword = document.getElementById("adminPassword");

const saveBtn = document.getElementById("saveBtn");

window.onload = function () {

    let profile = JSON.parse(localStorage.getItem("adminProfile"));

    if (profile) {

        adminName.value = profile.name;

        adminEmail.value = profile.email;

        adminPhone.value = profile.phone;

        adminAddress.value = profile.address;

        adminPassword.value = profile.password;

    }

};

saveBtn.addEventListener("click", function () {

    if (

        adminName.value.trim() == "" ||

        adminEmail.value.trim() == "" ||

        adminPhone.value.trim() == "" ||

        adminAddress.value.trim() == "" ||

        adminPassword.value.trim() == ""

    ) {

        alert("Please fill all fields.");

        return;

    }

    const profile = {

        name: adminName.value,

        email: adminEmail.value,

        phone: adminPhone.value,

        address: adminAddress.value,

        password: adminPassword.value

    };

    localStorage.setItem("adminProfile", JSON.stringify(profile));

    alert("Profile Saved Successfully.");

});

adminEmail.addEventListener("blur", function () {

    if (

        !adminEmail.value.includes("@") ||

        !adminEmail.value.includes(".")

    ) {

        alert("Please enter a valid email.");

    }

});

adminPhone.addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9]/g, "");

    if (this.value.length > 10) {

        this.value = this.value.slice(0, 10);

    }

});

adminPassword.addEventListener("blur", function () {

    if (adminPassword.value.length < 6) {

        alert("Password must be at least 6 characters.");

    }

});

console.log("Admin Profile Loaded Successfully");