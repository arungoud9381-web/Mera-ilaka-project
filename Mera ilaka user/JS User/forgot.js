/*=========================================
            FORGOT PASSWORD
=========================================*/

// Get Elements

const forgotForm = document.getElementById("forgotForm");
const email = document.getElementById("email");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");


/*=========================================
        SHOW / HIDE PASSWORD
=========================================*/

togglePassword.addEventListener("click", function () {

    if (newPassword.type === "password") {

        newPassword.type = "text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        newPassword.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});


/*=========================================
        RESET PASSWORD
=========================================*/

forgotForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Validation

    if (
        email.value.trim() === "" ||
        newPassword.value.trim() === "" ||
        confirmPassword.value.trim() === ""
    ) {

        alert("Please fill all fields.");
        return;

    }

    // Password Match

    if (newPassword.value !== confirmPassword.value) {

        alert("Passwords do not match.");
        return;

    }

    // Password Length

    if (newPassword.value.length < 6) {

        alert("Password must be at least 6 characters.");
        return;

    }

    // Get Users

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check Email

    let found = false;

    users.forEach(function (user) {

        if (user.email.toLowerCase() === email.value.trim().toLowerCase()) {

            user.password = newPassword.value;

            found = true;

        }

    });

    if (!found) {

        alert("Email not found.");

        return;

    }

    // Save Updated Users

    localStorage.setItem("users", JSON.stringify(users));

    // Success Message

    alert("✅ Password changed successfully!");

    // Clear Form

    forgotForm.reset();

    // Redirect after 1 second

    setTimeout(function () {

        window.location.href = "login.html";

    }, 1000);

});

console.log("Forgot Password Loaded Successfully");