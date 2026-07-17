window.addEventListener("load", function () {

    console.log("Welcome to Mera Ilaka");

});

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const startBtn = document.getElementById("startBtn");

loginBtn.addEventListener("click", function () {

    window.location.href = "login.html";

});

registerBtn.addEventListener("click", function () {

    window.location.href = "register.html";

});


startBtn.addEventListener("click", function () {

    window.location.href = "register.html";

});

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

window.addEventListener("scroll", function () {

    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll("nav a");

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });

    navItems.forEach(function (item) {

        item.classList.remove("active");

        if (item.getAttribute("href") === "#" + currentSection) {

            item.classList.add("active");

        }

    });

});

startBtn.addEventListener("mouseenter", function () {

    startBtn.style.transform = "scale(1.05)";

});

startBtn.addEventListener("mouseleave", function () {

    startBtn.style.transform = "scale(1)";

});

const cards = document.querySelectorAll(".card");

cards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        this.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", function () {

        this.style.transform = "translateY(0px)";

    });

});

console.log("Landing Page Loaded Successfully");