const businessImage = document.getElementById("businessImage");
const businessName = document.getElementById("businessName");
const owner = document.getElementById("owner");
const category = document.getElementById("category");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const status = document.getElementById("status");
const description = document.getElementById("description");

const callBtn = document.getElementById("callBtn");
const backBtn = document.getElementById("backBtn");

let business = JSON.parse(localStorage.getItem("selectedBusiness"));

if (!business) {

    alert("Business not found.");

    window.location.href = "businesses.html";

}

businessName.innerText = business.name;

owner.innerText = business.owner;

category.innerText = business.category;

address.innerText = business.address;

phone.innerText = business.phone;

email.innerText = business.email || "Not Available";

status.innerText = business.status;

description.innerText = business.description || "No Description Available";

if (business.image && business.image.trim() !== "") {

    businessImage.src = business.image;

}
else {

    businessImage.src = "https://via.placeholder.com/900x400?text=Business+Image";

}

if (business.status === "Active") {

    status.style.color = "green";

}
else {

    status.style.color = "red";

}

callBtn.addEventListener("click", function () {

    if (business.phone && business.phone.trim() !== "") {

        window.location.href = "tel:" + business.phone;

    }
    else {

        alert("Phone number not available.");

    }

});

backBtn.addEventListener("click", function () {

    window.location.href = "businesses.html";

});