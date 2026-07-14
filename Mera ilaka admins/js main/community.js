const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

// Elements
const addPostBtn = document.getElementById("addPostBtn");
const searchPost = document.getElementById("searchPost");
const tableBody = document.querySelector("#postTable tbody");

// Community Posts
let posts = JSON.parse(localStorage.getItem("communityPosts")) || [

    {
        user: "Arun",
        post: "Need an Electrician in my area.",
        date: "15-Jul-2026",
        status: "Pending"
    },

    {
        user: "Prem",
        post: "Blood Donation Camp this Sunday.",
        date: "14-Jul-2026",
        status: "Approved"
    }

];

function displayPosts() {

    tableBody.innerHTML = "";

    posts.forEach(function (post, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${post.user}</td>

            <td>${post.post}</td>

            <td>${post.date}</td>

            <td>

                <span class="${post.status.toLowerCase()}">

                    ${post.status}

                </span>

            </td>

            <td>

                <button class="view" onclick="viewPost(${index})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="approve" onclick="approvePost(${index})">

                    <i class="fa-solid fa-check"></i>

                </button>

                <button class="reject" onclick="rejectPost(${index})">

                    <i class="fa-solid fa-xmark"></i>

                </button>

                <button class="delete" onclick="deletePost(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    localStorage.setItem("communityPosts", JSON.stringify(posts));

}

function viewPost(index) {

    const post = posts[index];

    alert(

        "User : " + post.user +

        "\n\nPost : " + post.post +

        "\n\nDate : " + post.date +

        "\n\nStatus : " + post.status

    );

}

function approvePost(index) {

    posts[index].status = "Approved";

    displayPosts();

    alert("Post Approved Successfully.");

}

function rejectPost(index) {

    posts[index].status = "Rejected";

    displayPosts();

    alert("Post Rejected Successfully.");

}

function deletePost(index) {

    if (confirm("Delete this post?")) {

        posts.splice(index, 1);

        displayPosts();

        alert("Post Deleted Successfully.");

    }

}

searchPost.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#postTable tbody tr");

    rows.forEach(function (row) {

        if (row.innerText.toLowerCase().includes(value)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});

addPostBtn.addEventListener("click", function () {

    const user = prompt("Enter User Name");

    if (user == null || user.trim() == "") return;

    const postText = prompt("Enter Community Post");

    if (postText == null || postText.trim() == "") return;

    const today = new Date().toLocaleDateString("en-GB");

    posts.push({

        user: user,

        post: postText,

        date: today,

        status: "Pending"

    });

    displayPosts();

    alert("Post Added Successfully.");

});

displayPosts();