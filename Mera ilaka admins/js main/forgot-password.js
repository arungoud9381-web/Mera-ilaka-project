const forgotForm = document.getElementById("forgotForm");

const email = document.getElementById("email");

forgotForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (email.value.trim() === "") {

        alert("Please enter your email address.");

        email.focus();

        return;

    }

    // Demo email validation
    if (email.value !== "admin@gmail.com") {

        alert("Email not found!");

        return;

    }

    alert("OTP has been sent to your registered email.");

    window.location.href = "otp.html";

});