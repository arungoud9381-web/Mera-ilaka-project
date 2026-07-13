const searchInput = document.getElementById("serviceSearch");

const serviceCards = document.querySelectorAll(".service-card");

const categoryButtons = document.querySelectorAll(".categories button");

const bookButtons = document.querySelectorAll(".book-btn");

const callButtons = document.querySelectorAll(".call-btn");

const wishButtons = document.querySelectorAll(".wish-btn");

const bookingHistory = document.getElementById("bookingHistory");

const toast = document.getElementById("toast");

function showToast(message) {

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    serviceCards.forEach(card => {

        const text = card.innerText.toLowerCase();

        card.style.display = text.includes(value)

            ? "block"

            : "none";

    });

});

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const category = this.innerText;

        serviceCards.forEach(card => {

            if (category === "All") {

                card.style.display = "block";

            }

            else {

                card.style.display =

                    card.dataset.category === category

                        ? "block"

                        : "none";

            }

        });

    });

});

bookButtons.forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".service-card");

        const service = card.querySelector("h3").innerText;

        const li = document.createElement("li");

        li.innerHTML = `✅ ${service} booked successfully`;

        if (bookingHistory.innerHTML.includes("No bookings yet.")) {

            bookingHistory.innerHTML = "";

        }

        bookingHistory.prepend(li);

        showToast("Service Booked!");

    });

});

callButtons.forEach(button => {

    button.addEventListener("click", function () {

        alert("📞 Calling Service Provider...");

    });

});

wishButtons.forEach(button => {

    button.addEventListener("click", function () {

        this.classList.toggle("active");

        const icon = this.querySelector("i");

        if (this.classList.contains("active")) {

            icon.className = "fa-solid fa-heart";

            showToast("Added to Favorites");

        }

        else {

            icon.className = "fa-regular fa-heart";

            showToast("Removed from Favorites");

        }

    });

});

window.addEventListener("load", () => {

    console.log("Services Module Loaded");

});