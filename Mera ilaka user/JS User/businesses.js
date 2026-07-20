let businesses = JSON.parse(localStorage.getItem("businesses")) || [];

const businessContainer = document.getElementById("businessContainer");
const searchBusiness = document.getElementById("searchBusiness");
const categoryFilter = document.getElementById("categoryFilter");

function displayBusinesses(list) {

    businessContainer.innerHTML = "";

    if (list.length === 0) {

        businessContainer.innerHTML = `

            <h2>No Businesses Available</h2>

        `;

        return;

    }

    list.forEach(function (business, index) {

        businessContainer.innerHTML += `

        <div class="business-card">

            <h2>${business.name}</h2>

            <p><strong>Category :</strong> ${business.category}</p>

            <p><strong>Owner :</strong> ${business.owner}</p>

            <p><strong>Address :</strong> ${business.address}</p>

            <p><strong>Phone :</strong> ${business.phone}</p>

            <p>${business.description}</p>

            <div class="buttons">

                <button
                    class="view-btn"
                    onclick="viewBusiness(${index})">

                    View Details

                </button>

                <button
                    class="call-btn"
                    onclick="callBusiness('${business.phone}')">

                    Call

                </button>

            </div>

        </div>

        `;

    });

}

// Search

searchBusiness.addEventListener("keyup", filterBusinesses);

// Category Filter

categoryFilter.addEventListener("change", filterBusinesses);

// Filter

function filterBusinesses() {

    let search = searchBusiness.value.toLowerCase();

    let category = categoryFilter.value;

    let filtered = businesses.filter(function (business) {

        let matchSearch =

            business.name.toLowerCase().includes(search) ||

            business.category.toLowerCase().includes(search) ||

            business.owner.toLowerCase().includes(search);

        let matchCategory =

            category === "All" ||

            business.category === category;

        return matchSearch && matchCategory;

    });

    displayBusinesses(filtered);

}

function viewBusiness(index) {

    localStorage.setItem(

        "selectedBusiness",

        JSON.stringify(businesses[index])

    );

    window.location.href = "business-details.html";

}

// Call

function callBusiness(phone) {

    window.location.href = "tel:" + phone;

}

// Load

displayBusinesses(businesses);