const registerForm = document.getElementById("registerForm");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");


togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.classList.replace("fa-eye", "fa-eye-slash");

    } else {

        password.type = "password";
        togglePassword.classList.replace("fa-eye-slash", "fa-eye");

    }

});

registerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Validation

    if (
        name.value.trim() === "" ||
        email.value.trim() === "" ||
        phone.value.trim() === "" ||
        address.value.trim() === "" ||
        password.value.trim() === "" ||
        confirmPassword.value.trim() === ""
    ) {

        alert("Please fill all fields.");
        return;

    }

    // Password Match

    if (password.value !== confirmPassword.value) {

        alert("Passwords do not match.");
        return;

    }

    if (password.value.length < 6) {

        alert("Password must be at least 6 characters.");
        return;

    }

    // Get Existing Users

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check Duplicate Email

    const existingUser = users.find(function (user) {

        return user.email === email.value.trim();

    });

    if (existingUser) {

        alert("Email already registered.");
        return;

    }

   
    const newUser = {

        id: Date.now(),

        name: name.value.trim(),

        email: email.value.trim(),

        phone: phone.value.trim(),

        address: address.value.trim(),

        password: password.value,

        role: "user",

        status: "Active"

    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    registerForm.reset();

    window.location.href = "login.html";

});

console.log("User Registration Loaded Successfully");