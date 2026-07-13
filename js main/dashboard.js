const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target = +counter.getAttribute("data-target");

    let count = 0;

    const increment = Math.ceil(target / 100);

    function updateCounter() {

        if (count < target) {

            count += increment;

            if (count > target) count = target;

            counter.innerText = count.toLocaleString();

            setTimeout(updateCounter, 20);

        }

    }

    updateCounter();

});


const darkBtn = document.getElementById("darkBtn");

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = darkBtn.querySelector("i");

    if (document.body.classList.contains("dark")) {

        icon.className = "fa-solid fa-sun";

    } else {

        icon.className = "fa-solid fa-moon";

    }

});

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("show");

});

const bell = document.getElementById("bell");

const notifyBox = document.getElementById("notifyBox");

bell.addEventListener("click", (e) => {

    e.stopPropagation();

    notifyBox.style.display =
        notifyBox.style.display === "block"
            ? "none"
            : "block";

});

document.addEventListener("click", () => {

    notifyBox.style.display = "none";

});

const exploreBtn = document.getElementById("exploreBtn");

exploreBtn.addEventListener("click", () => {

    document.querySelector(".quick-access").scrollIntoView({

        behavior: "smooth"

    });

});

const searchInput = document.querySelector(".search input");

const moduleCards = document.querySelectorAll(".module-card");

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    moduleCards.forEach(card => {

        const text = card.innerText.toLowerCase();

        card.style.display = text.includes(value)

            ? "block"

            : "none";

    });

});

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {

    const confirmLogout = confirm("Do you want to logout?");

    if (confirmLogout) {

        window.location.href = "../index.html";

    }

});

const profileBtn = document.querySelector(".profile-content button");

if (profileBtn) {

    profileBtn.addEventListener("click", () => {

        window.location.href = "profile.html";

    });

}

const temperatures = [28, 29, 30, 31, 32];

const weatherStatus = [

    "Sunny",

    "Cloudy",

    "Rainy",

    "Partly Cloudy"

];

setInterval(() => {

    const temp = document.querySelector(".weather-content h1");

    const status = document.querySelector(".weather-content p");

    if (temp && status) {

        temp.innerText =

            temperatures[Math.floor(Math.random() * temperatures.length)] + "°C";

        status.innerText =

            weatherStatus[Math.floor(Math.random() * weatherStatus.length)];

    }

}, 10000);

const today = new Date();

console.log(

    "Dashboard Loaded:",

    today.toDateString()

);

window.addEventListener("load", () => {

    console.log("Welcome to Mera Ilaka Dashboard");

});