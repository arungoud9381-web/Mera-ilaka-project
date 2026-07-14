const otpInputs = document.querySelectorAll(".otp-inputs input");

const otpForm = document.getElementById("otpForm");

const resendOTP = document.getElementById("resendOTP");

const countdown = document.getElementById("countdown");

otpInputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        if (input.value.length === 1 && index < otpInputs.length - 1) {

            otpInputs[index + 1].focus();

        }

    });

});

otpInputs.forEach((input, index) => {

    input.addEventListener("keydown", (e) => {

        if (e.key === "Backspace" && input.value === "" && index > 0) {

            otpInputs[index - 1].focus();

        }

    });

});

let time = 60;

const timer = setInterval(() => {

    time--;

    countdown.innerText = time;

    if (time <= 0) {

        clearInterval(timer);

        countdown.innerText = "0";

        resendOTP.classList.add("active");

    }

}, 1000);

resendOTP.addEventListener("click", (e) => {

    e.preventDefault();

    if (resendOTP.classList.contains("active")) {

        alert("OTP Sent Successfully!");

        location.reload();

    }

});

otpForm.addEventListener("submit", (e) => {

    e.preventDefault();

    let otp = "";

    otpInputs.forEach(input => {

        otp += input.value;

    });

    if (otp === "123456") {

        alert("OTP Verified Successfully!");

        window.location.href = "reset-password.html";

    }

    else {

        alert("Invalid OTP!");

    }

});