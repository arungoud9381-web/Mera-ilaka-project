const password = document.getElementById("newPassword");
const confirm = document.getElementById("confirmPassword");
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

    let p = password.value;

    if (p.length < 6) {

        strength.innerHTML = "Weak Password";
        strength.style.color = "red";

    }

    else if (p.length < 10) {

        strength.innerHTML = "Medium Password";
        strength.style.color = "orange";

    }

    else {

        strength.innerHTML = "Strong Password";
        strength.style.color = "green";

    }

});

document
    .getElementById("forgotForm")
    .addEventListener("submit", (e) => {

        e.preventDefault();

        if (password.value !== confirm.value) {

            alert("Passwords do not match");

            return;

        }

        alert("Password Updated Successfully");

        window.location = "login.html";

    });