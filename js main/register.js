const form = document.getElementById("registerForm");

const password = document.getElementById("password");

const confirmPassword = document.getElementById("confirmPassword");

const strength = document.getElementById("strength");

const toggle = document.getElementById("togglePassword");

toggle.onclick = () => {

    password.type = password.type === "password"
        ?
        "text"
        :
        "password";

    toggle.classList.toggle("fa-eye-slash");

}

password.addEventListener("keyup", () => {

    let value = password.value;

    if (value.length < 6) {

        strength.innerHTML = "Weak Password";

        strength.style.color = "red";

    }

    else if (value.length < 10) {

        strength.innerHTML = "Medium Password";

        strength.style.color = "orange";

    }

    else {

        strength.innerHTML = "Strong Password";

        strength.style.color = "green";

    }

});

form.addEventListener("submit", (e) => {

    e.preventDefault();

    if (password.value !== confirmPassword.value) {

        alert("Passwords do not match");

        return;

    }

    if (!document.getElementById("terms").checked) {

        alert("Accept Terms & Conditions");

        return;

    }

    alert("Registration Successful");

    window.location = "otp.html";

});