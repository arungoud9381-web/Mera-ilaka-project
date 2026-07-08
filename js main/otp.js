const otpInputs = document.querySelectorAll(".otp");

otpInputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        if (input.value.length === 1 && index < otpInputs.length - 1) {

            otpInputs[index + 1].focus();

        }

    });

    input.addEventListener("keydown", (e) => {

        if (e.key === "Backspace" && input.value === "") {

            if (index > 0) {

                otpInputs[index - 1].focus();

            }

        }

    });

});

let seconds = 60;

const timer = document.getElementById("timer");

const resend = document.getElementById("resend");

const countdown = setInterval(() => {

    seconds--;

    let min = Math.floor(seconds / 60);

    let sec = seconds % 60;

    timer.innerHTML = `0${min}:${sec < 10 ? "0" : ""}${sec}`;

    if (seconds <= 0) {

        clearInterval(countdown);

        timer.innerHTML = "OTP Expired";

    }

}, 1000);

resend.addEventListener("click", (e) => {

    e.preventDefault();

    alert("OTP Sent Again");

    location.reload();

});

document.getElementById("otpForm")

    .addEventListener("submit", (e) => {

        e.preventDefault();

        let otp = "";

        otpInputs.forEach(box => {

            otp += box.value;

        });

        if (otp.length !== 6) {

            alert("Enter Valid OTP");

            return;

        }

        alert("OTP Verified Successfully");

    });