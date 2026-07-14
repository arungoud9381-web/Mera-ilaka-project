const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const rememberMe = document.getElementById("rememberMe");

window.onload = function () {

    if (localStorage.getItem("remember") === "true") {

        email.value = localStorage.getItem("email");
        password.value = localStorage.getItem("password");
        rememberMe.checked = true;

    }

};


togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.classList.replace("fa-eye", "fa-eye-slash");

    } else {

        password.type = "password";
        togglePassword.classList.replace("fa-eye-slash", "fa-eye");

    }

});

// Login

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    if (email.value === adminEmail && password.value === adminPassword) {

        if (rememberMe.checked) {

            localStorage.setItem("remember", "true");
            localStorage.setItem("email", email.value);
            localStorage.setItem("password", password.value);

        } else {

            localStorage.removeItem("remember");
            localStorage.removeItem("email");
            localStorage.removeItem("password");

        }

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Email or Password.");

    }

});