const resetForm = document.getElementById("resetForm");

const newPassword = document.getElementById("newPassword");

const confirmPassword = document.getElementById("confirmPassword");

resetForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (newPassword.value.trim() === "") {

        alert("Please enter a new password.");

        newPassword.focus();

        return;

    }

    if (confirmPassword.value.trim() === "") {

        alert("Please confirm your password.");

        confirmPassword.focus();

        return;

    }

    if (newPassword.value !== confirmPassword.value) {

        alert("Passwords do not match!");

        confirmPassword.focus();

        return;

    }

    alert("Password Reset Successfully!");

    window.location.href = "login.html";

});