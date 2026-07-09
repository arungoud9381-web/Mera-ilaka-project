const form = document.getElementById("loginForm");

const togglePassword =
    document.getElementById("togglePassword");

const password =
    document.getElementById("password");

togglePassword.addEventListener("click", () => {

    const type =
        password.getAttribute("type") === "password"
            ?
            "text"
            :
            "password";

    password.setAttribute("type", type);

    togglePassword.classList.toggle("fa-eye");

    togglePassword.classList.toggle("fa-eye-slash");

});

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const pass = password.value;

    if (email === "" || pass === "") {

        alert("Please fill all fields");

        return;

    }

    alert("Login Successful");

    window.location.href = "dashboard.html";


});