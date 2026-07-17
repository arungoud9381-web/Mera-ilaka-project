const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}

const profileForm = document.getElementById("profileForm");

const name = document.getElementById("name");

const email = document.getElementById("email");

const phone = document.getElementById("phone");

const address = document.getElementById("address");

name.value = currentUser.name || "";

email.value = currentUser.email || "";

phone.value = currentUser.phone || "";

address.value = currentUser.address || "";

profileForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (

        name.value.trim() === "" ||

        phone.value.trim() === "" ||

        address.value.trim() === ""

    ) {

        alert("Please fill all fields.");

        return;

    }

    // Update Current User

    currentUser.name = name.value.trim();

    currentUser.phone = phone.value.trim();

    currentUser.address = address.value.trim();

    // Save Current User

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Update User List

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(function (user) {

        if (user.email === currentUser.email) {

            return currentUser;

        }

        return user;

    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Profile updated successfully!");

});

console.log("Profile Loaded Successfully");