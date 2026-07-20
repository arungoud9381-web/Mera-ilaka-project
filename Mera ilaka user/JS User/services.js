const serviceContainer = document.getElementById("serviceContainer");
const searchService = document.getElementById("searchService");
const categoryFilter = document.getElementById("categoryFilter");

let services = JSON.parse(localStorage.getItem("services")) || [];

function displayServices(list) {

    serviceContainer.innerHTML = "";

    if (list.length === 0) {

        serviceContainer.innerHTML = `

            <div class="no-services">

                <h2>No Services Available</h2>

                <p>Please check back later.</p>

            </div>

        `;

        return;

    }

    list.forEach(function (service, index) {

        serviceContainer.innerHTML += `

        <div class="service-card">

            <img src="${service.image && service.image.trim() !== ""
                ? service.image
                : "https://via.placeholder.com/400x250?text=Service"
            }" alt="${service.serviceName}">

            <div class="service-content">

                <h2>${service.serviceName}</h2>

                <p><strong>Provider :</strong> ${service.providerName}</p>

                <p><strong>Category :</strong> ${service.category}</p>

                <p><strong>Experience :</strong> ${service.experience}</p>

                <p><strong>Phone :</strong> ${service.phone}</p>

                <p class="price">${service.price}</p>

                <span class="status ${service.status.toLowerCase()}">

                    ${service.status}

                </span>

                <div class="buttons">

                    <button
                        class="view-btn"
                        onclick="viewService(${index})">

                        View Details

                    </button>

                    <button
                        class="call-btn"
                        onclick="callService('${service.phone}')">

                        Call

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

function filterServices() {

    const search = searchService.value.toLowerCase();

    const category = categoryFilter.value;

    const filtered = services.filter(function (service) {

        const matchSearch =

            service.serviceName.toLowerCase().includes(search) ||

            service.providerName.toLowerCase().includes(search) ||

            service.category.toLowerCase().includes(search);

        const matchCategory =

            category === "All" ||

            service.category === category;

        return matchSearch && matchCategory;

    });

    displayServices(filtered);

}

searchService.addEventListener("keyup", filterServices);

categoryFilter.addEventListener("change", filterServices);

function viewService(index) {

    localStorage.setItem(

        "selectedService",

        JSON.stringify(services[index])

    );

    window.location.href = "service-details.html";

}

function callService(phone) {

    if (phone && phone.trim() !== "") {

        window.location.href = "tel:" + phone;

    } else {

        alert("Phone number not available.");

    }

}

displayServices(services);