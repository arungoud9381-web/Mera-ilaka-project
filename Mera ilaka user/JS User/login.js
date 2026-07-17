const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const rememberMe = document.getElementById("rememberMe");
const homeBtn = document.getElementById("homeBtn");

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.classList.replace("fa-eye", "fa-eye-slash");

    } else {

        password.type = "password";
        togglePassword.classList.replace("fa-eye-slash", "fa-eye");

    }

});

window.addEventListener("load", function () {

    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {

        email.value = savedEmail;
        rememberMe.checked = true;

    }

});

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (email.value.trim() === "" || password.value.trim() === "") {

        alert("Please enter Email and Password.");
        return;

    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(function (item) {

        return item.email === email.value.trim() &&
            item.password === password.value.trim();

    });

    if (user) {

        if (rememberMe.checked) {

            localStorage.setItem("rememberEmail", email.value);

        } else {

            localStorage.removeItem("rememberEmail");

        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Email or Password!");

    }

});

homeBtn.addEventListener("click", function () {

    window.location.href = "index.html";

});