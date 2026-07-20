const serviceImage = document.getElementById("serviceImage");
const serviceName = document.getElementById("serviceName");
const provider = document.getElementById("provider");
const category = document.getElementById("category");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const experience = document.getElementById("experience");
const price = document.getElementById("price");
const status = document.getElementById("status");
const description = document.getElementById("description");

const callBtn = document.getElementById("callBtn");
const bookBtn = document.getElementById("bookBtn");
const backBtn = document.getElementById("backBtn");

let service = JSON.parse(localStorage.getItem("selectedService"));

if (!service) {

    alert("Service not found.");

    window.location.href = "services.html";

}

serviceName.innerText = service.serviceName;

provider.innerText = service.providerName;

category.innerText = service.category;

address.innerText = service.address;

phone.innerText = service.phone;

email.innerText = service.email || "Not Available";

experience.innerText = service.experience;

price.innerText = service.price;

status.innerText = service.status;

description.innerText = service.description || "No Description Available";

if (service.image && service.image.trim() !== "") {

    serviceImage.src = service.image;

}
else {

    serviceImage.src =
        "https://via.placeholder.com/900x450?text=Service+Image";

}

if (service.status === "Active") {

    status.style.color = "green";

}
else {

    status.style.color = "red";

}

callBtn.addEventListener("click", function () {

    if (service.phone && service.phone.trim() !== "") {

        window.location.href = "tel:" + service.phone;

    }
    else {

        alert("Phone number not available.");

    }

});

bookBtn.addEventListener("click", function () {

    let bookedServices =
        JSON.parse(localStorage.getItem("bookedServices")) || [];

    const booking = {

        bookingId: "SER" + Date.now(),

        serviceName: service.serviceName,

        providerName: service.providerName,

        phone: service.phone,

        category: service.category,

        price: service.price,

        bookingDate: new Date().toLocaleString(),

        status: "Booked"

    };

    bookedServices.push(booking);

    localStorage.setItem(

        "bookedServices",

        JSON.stringify(bookedServices)

    );

    alert("Service Booked Successfully!");

});

backBtn.addEventListener("click", function () {

    window.location.href = "services.html";

});