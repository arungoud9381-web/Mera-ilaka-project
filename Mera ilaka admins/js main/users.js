const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});


const addUserBtn = document.getElementById("addUserBtn");
const modal = document.getElementById("userModal");
const closeBtn = document.querySelector(".close");
const userForm = document.getElementById("userForm");
const tableBody = document.querySelector("#userTable tbody");
const searchUser = document.getElementById("searchUser");
const modalTitle = document.getElementById("modalTitle");

// Users Array
let users = JSON.parse(localStorage.getItem("users")) || [

    {
        name: "Arun",
        email: "arun@gmail.com",
        phone: "9876543210",
        status: "Active"
    },

    {
        name: "Rahul",
        email: "rahul@gmail.com",
        phone: "9123456789",
        status: "Active"
    }

];

let editIndex = -1;

function displayUsers() {

    tableBody.innerHTML = "";

    users.forEach((user, index) => {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${user.name}</td>

            <td>${user.email}</td>

            <td>${user.phone}</td>

            <td>

                <span class="${user.status.toLowerCase()}">

                    ${user.status}

                </span>

            </td>

            <td>

                <button class="view" onclick="viewUser(${index})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="edit" onclick="editUser(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete" onclick="deleteUser(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    localStorage.setItem("users", JSON.stringify(users));

}

addUserBtn.addEventListener("click", function () {

    modal.style.display = "block";

    modalTitle.innerHTML = "Add User";

    userForm.reset();

    editIndex = -1;

});

closeBtn.addEventListener("click", function () {

    modal.style.display = "none";

});

window.onclick = function (e) {

    if (e.target == modal) {

        modal.style.display = "none";

    }

};

userForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const user = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        status: document.getElementById("status").value

    };

    if (editIndex === -1) {

        users.push(user);

        alert("User Added Successfully.");

    }

    else {

        users[editIndex] = user;

        alert("User Updated Successfully.");

    }

    localStorage.setItem("users", JSON.stringify(users));

    displayUsers();

    modal.style.display = "none";

    userForm.reset();

});

function editUser(index) {

    modal.style.display = "block";

    modalTitle.innerHTML = "Edit User";

    document.getElementById("name").value = users[index].name;

    document.getElementById("email").value = users[index].email;

    document.getElementById("phone").value = users[index].phone;

    document.getElementById("status").value = users[index].status;

    editIndex = index;

}

function deleteUser(index) {

    if (confirm("Delete this user?")) {

        users.splice(index, 1);

        localStorage.setItem("users", JSON.stringify(users));

        displayUsers();

        alert("User Deleted Successfully.");

    }

}

function viewUser(index) {

    const user = users[index];

    alert(

        "User Details\n\n" +

        "Name : " + user.name + "\n" +

        "Email : " + user.email + "\n" +

        "Phone : " + user.phone + "\n" +

        "Status : " + user.status

    );

}

searchUser.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#userTable tbody tr");

    rows.forEach(row => {

        if (row.innerText.toLowerCase().includes(value)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});


displayUsers();