document.addEventListener("DOMContentLoaded", function () {

    console.log("Welcome to Mera Ilaka");

    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const startBtn = document.querySelector(".start-btn");

    if (loginBtn) {

        loginBtn.addEventListener("click", function () {

            window.location.href = "login.html";

        });

    }

    if (registerBtn) {

        registerBtn.addEventListener("click", function () {

            window.location.href = "register.html";

        });

    }

    if (startBtn) {

        startBtn.addEventListener("click", function (e) {

            e.preventDefault();

            window.location.href = "register.html";

        });

    }

    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

            }

        });

    });

    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", function () {

        let current = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    if (startBtn) {

        startBtn.addEventListener("mouseenter", function () {

            this.style.transform = "scale(1.05)";
            this.style.transition = "0.3s";

        });

        startBtn.addEventListener("mouseleave", function () {

            this.style.transform = "scale(1)";

        });

    }

    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-8px)";
            this.style.transition = "0.3s";

        });

        card.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0px)";

        });

    });

    console.log("Landing Page Loaded Successfully");

});