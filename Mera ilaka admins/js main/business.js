/*=========================================
        BUSINESS MANAGEMENT
=========================================*/

// Dashboard Button
const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

// Elements
const addBusinessBtn = document.getElementById("addBusinessBtn");
const searchBusiness = document.getElementById("searchBusiness");
const tableBody = document.querySelector("#businessTable tbody");

// Business Data
let businesses = JSON.parse(localStorage.getItem("businesses")) || [

    {

        name: "Sai Electronics",

        owner: "Arun",

        category: "Electronics",

        status: "Active"

    },

    {

        name: "Fresh Mart",

        owner: "Laxman",

        category: "Grocery",

        status: "Active"

    }

];

/*=========================================
        DISPLAY BUSINESSES
=========================================*/

function displayBusinesses(){

    tableBody.innerHTML = "";

    businesses.forEach(function(business,index){

        tableBody.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${business.name}</td>

            <td>${business.owner}</td>

            <td>${business.category}</td>

            <td>

                <span class="${business.status.toLowerCase()}">

                    ${business.status}

                </span>

            </td>

            <td>

                <button class="view" onclick="viewBusiness(${index})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="edit" onclick="editBusiness(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete" onclick="deleteBusiness(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    localStorage.setItem("businesses", JSON.stringify(businesses));

}

/*=========================================
        ADD BUSINESS
=========================================*/

addBusinessBtn.addEventListener("click", function(){

    let name = prompt("Enter Business Name");

    if(name == null || name.trim() == "") return;

    let owner = prompt("Enter Owner Name");

    if(owner == null || owner.trim() == "") return;

    let category = prompt("Enter Business Category");

    if(category == null || category.trim() == "") return;

    businesses.push({

        name: name,

        owner: owner,

        category: category,

        status: "Active"

    });

    displayBusinesses();

    alert("Business Added Successfully.");

});

/*=========================================
        VIEW BUSINESS
=========================================*/

function viewBusiness(index){

    const business = businesses[index];

    alert(

        "Business Name : " + business.name +

        "\n\nOwner : " + business.owner +

        "\n\nCategory : " + business.category +

        "\n\nStatus : " + business.status

    );

}

/*=========================================
        EDIT BUSINESS
=========================================*/

function editBusiness(index){

    let name = prompt("Edit Business Name", businesses[index].name);

    if(name == null) return;

    let owner = prompt("Edit Owner Name", businesses[index].owner);

    if(owner == null) return;

    let category = prompt("Edit Category", businesses[index].category);

    if(category == null) return;

    businesses[index].name = name;
    businesses[index].owner = owner;
    businesses[index].category = category;

    displayBusinesses();

    alert("Business Updated Successfully.");

}

/*=========================================
        DELETE BUSINESS
=========================================*/

function deleteBusiness(index){

    if(confirm("Delete this business?")){

        businesses.splice(index,1);

        displayBusinesses();

        alert("Business Deleted Successfully.");

    }

}

/*=========================================
        SEARCH BUSINESS
=========================================*/

searchBusiness.addEventListener("keyup", function(){

    let value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#businessTable tbody tr");

    rows.forEach(function(row){

        if(row.innerText.toLowerCase().includes(value)){

            row.style.display = "";

        }

        else{

            row.style.display = "none";

        }

    });

});

/*=========================================
        LOAD BUSINESSES
=========================================*/

displayBusinesses();