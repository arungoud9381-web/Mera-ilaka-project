const searchInput = document.getElementById("businessSearch");

const businessCards = document.querySelectorAll(".business-card");

const categoryButtons = document.querySelectorAll(".categories button");

const favoriteButtons = document.querySelectorAll(".fav-btn");

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    businessCards.forEach(card => {

        const businessName = card.querySelector("h2").innerText.toLowerCase();

        const businessType = card.querySelector(".type").innerText.toLowerCase();

        if (
            businessName.includes(value) ||
            businessType.includes(value)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const category = this.innerText;

        businessCards.forEach(card => {

            if (category === "All") {

                card.style.display = "block";

            } else {

                if (card.dataset.category === category) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            }

        });

    });

});

favoriteButtons.forEach(button => {

    button.addEventListener("click", function () {

        this.classList.toggle("active");

        const icon = this.querySelector("i");

        if (this.classList.contains("active")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            this.style.background = "#ff4d6d";
            this.style.color = "#ffffff";

            alert("Business added to Favorites ❤️");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            this.style.background = "#eeeeee";
            this.style.color = "#000000";

            alert("Business removed from Favorites");

        }

    });

});
const callButtons = document.querySelectorAll(".call-btn");

callButtons.forEach(button => {

    button.addEventListener("click", function () {

        const businessName = this.closest(".business-card")
            .querySelector("h2")
            .innerText;

        alert("Calling " + businessName + "...");

    });

});

console.log("Businesses Module Loaded Successfully");

const modal = document.getElementById("businessModal");

const closeBtn = document.querySelector(".close-btn");

const detailsButtons = document.querySelectorAll(".details-btn");

const businessData = {

    "Spicy Hub": {

        category: "Restaurant",

        address: "Madhapur, Hyderabad",

        phone: "+91 9876543210",

        email: "spicyhub@gmail.com",

        hours: "10 AM - 10 PM"

    },

    "City Hospital": {

        category: "Hospital",

        address: "Kukatpally, Hyderabad",

        phone: "+91 9123456780",

        email: "cityhospital@gmail.com",

        hours: "24 Hours"

    },

    "MedPlus Pharmacy": {

        category: "Medical",

        address: "Ameerpet, Hyderabad",

        phone: "+91 9988776655",

        email: "medplus@gmail.com",

        hours: "8 AM - 11 PM"

    },

    "Reliance Mart": {

        category: "Shopping",

        address: "Gachibowli, Hyderabad",

        phone: "+91 9090909090",

        email: "reliance@gmail.com",

        hours: "9 AM - 10 PM"

    },

    "Oxford School": {

        category: "Education",

        address: "Miyapur, Hyderabad",

        phone: "+91 9012345678",

        email: "oxford@gmail.com",

        hours: "8 AM - 4 PM"

    },

    "Quick Electrician": {

        category: "Services",

        address: "KPHB, Hyderabad",

        phone: "+91 9871234567",

        email: "electrician@gmail.com",

        hours: "24 Hours"

    }

};

detailsButtons.forEach(button => {

    button.addEventListener("click", function () {

        const name = this.closest(".business-card").querySelector("h2").innerText;

        const data = businessData[name];

        document.getElementById("modalTitle").innerText = name;
        document.getElementById("modalCategory").innerText = data.category;
        document.getElementById("modalAddress").innerText = data.address;
        document.getElementById("modalPhone").innerText = data.phone;
        document.getElementById("modalEmail").innerText = data.email;
        document.getElementById("modalHours").innerText = data.hours;

        modal.style.display = "flex";

    });

});

closeBtn.addEventListener("click", function () {

    modal.style.display = "none";

});

window.addEventListener("click", function (event) {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});

const businessSelect = document.getElementById("businessSelect");
const rating = document.getElementById("rating");
const reviewText = document.getElementById("reviewText");
const submitReview = document.getElementById("submitReview");
const reviewsList = document.getElementById("reviewsList");

let reviews = JSON.parse(localStorage.getItem("businessReviews")) || [];

displayReviews();

submitReview.addEventListener("click", function () {

    if (
        businessSelect.value === "" ||
        rating.value === "" ||
        reviewText.value.trim() === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    const review = {

        business: businessSelect.value,

        rating: rating.value,

        text: reviewText.value

    };

    reviews.push(review);

    localStorage.setItem(

        "businessReviews",

        JSON.stringify(reviews)

    );

    displayReviews();

    businessSelect.value = "";
    rating.value = "";
    reviewText.value = "";

});

function displayReviews() {

    reviewsList.innerHTML = "";

    reviews.forEach(review => {

        const card = document.createElement("div");

        card.className = "review-card";

        card.innerHTML = `

            <h3>${review.business}</h3>

            <strong>${review.rating}</strong>

            <p>${review.text}</p>

        `;

        reviewsList.appendChild(card);

    });

}

const mapButtons = document.querySelectorAll(".map-btn");

const businessLocations = {

    "Spicy Hub":
        "https://www.google.com/maps/search/?api=1&query=Madhapur+Hyderabad",

    "City Hospital":
        "https://www.google.com/maps/search/?api=1&query=Kukatpally+Hyderabad",

    "MedPlus Pharmacy":
        "https://www.google.com/maps/search/?api=1&query=Ameerpet+Hyderabad",

    "Reliance Mart":
        "https://www.google.com/maps/search/?api=1&query=Gachibowli+Hyderabad",

    "Oxford School":
        "https://www.google.com/maps/search/?api=1&query=Miyapur+Hyderabad",

    "Quick Electrician":
        "https://www.google.com/maps/search/?api=1&query=KPHB+Hyderabad"

};

mapButtons.forEach(button => {

    button.addEventListener("click", function () {

        const businessName = this.closest(".business-card")
            .querySelector("h2")
            .innerText;

        window.open(

            businessLocations[businessName],

            "_blank"

        );

    });

});
const sendMessage = document.getElementById("sendMessage");

sendMessage.addEventListener("click", function () {

    const business = document.getElementById("contactBusiness").value;

    const name = document.getElementById("contactName").value.trim();

    const email = document.getElementById("contactEmail").value.trim();

    const phone = document.getElementById("contactPhone").value.trim();

    const message = document.getElementById("contactMessage").value.trim();

    if (
        business === "" ||
        name === "" ||
        email === "" ||
        phone === "" ||
        message === ""
    ) {

        alert("Please fill in all fields.");

        return;

    }

    alert("✅ Your message has been sent to " + business + "!");

    document.getElementById("contactBusiness").value = "";
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactPhone").value = "";
    document.getElementById("contactMessage").value = "";

});