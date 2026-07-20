const dashboardBtn = document.getElementById("dashboardBtn");

const profileForm = document.getElementById("profileForm");

const logoutBtn = document.getElementById("logoutBtn");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

const myPosts = document.getElementById("myPosts");

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {

    id: "USR001",

    name: "Guest User",

    email: "guest@gmail.com",

    phone: "",

    address: ""

};

function loadProfile() {

    userName.innerText = currentUser.name;

    userEmail.innerText = currentUser.email;

    nameInput.value = currentUser.name;

    phoneInput.value = currentUser.phone || "";

    addressInput.value = currentUser.address || "";

}

profileForm.addEventListener("submit", function (e) {

    e.preventDefault();

    currentUser.name = nameInput.value;

    currentUser.phone = phoneInput.value;

    currentUser.address = addressInput.value;

    localStorage.setItem(

        "currentUser",

        JSON.stringify(currentUser)

    );

    userName.innerText = currentUser.name;

    alert("Profile Updated Successfully.");

});

function loadMyPosts() {

    let posts = JSON.parse(

        localStorage.getItem("communityPosts")

    ) || [];

    let userPosts = posts.filter(function (post) {

        return post.userId === currentUser.id;

    });

    myPosts.innerHTML = "";

    if (userPosts.length === 0) {

        myPosts.innerHTML = `

        <p>No Community Posts Yet.</p>

        `;

        return;

    }

    userPosts.forEach(function (post) {

        myPosts.innerHTML += `

        <div class="post">

            <h3>${post.title}</h3>

            <p>

                <strong>Category :</strong>

                ${post.category}

            </p>

            <p>

                <strong>Date :</strong>

                ${post.date}

            </p>

            <p>

                <span class="status ${post.status.toLowerCase()}">

                    ${post.status}

                </span>

            </p>

        </div>

        `;

    });

}

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

logoutBtn.addEventListener("click", function () {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("currentUser");

        window.location.href = "../index.html";

    }

});

loadProfile();

loadMyPosts();