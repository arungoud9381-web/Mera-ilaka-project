const dashboardBtn = document.getElementById("dashboardBtn");

dashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

const tableBody = document.querySelector("#communityTable tbody");
const searchPost = document.getElementById("searchPost");

let posts = JSON.parse(localStorage.getItem("communityPosts")) || [];

function displayPosts() {

    tableBody.innerHTML = "";

    if (posts.length === 0) {

        tableBody.innerHTML = `

        <tr>

            <td colspan="7">No Community Posts Found</td>

        </tr>

        `;

        return;

    }

    posts.forEach(function (post, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${post.userName}</td>

            <td>${post.title}</td>

            <td>${post.category}</td>

            <td>${post.date}</td>

            <td>

                <span class="${post.status.toLowerCase()}">

                    ${post.status}

                </span>

            </td>

            <td>

                <button class="view"
                    onclick="viewPost(${index})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="approve"
                    onclick="approvePost(${index})">

                    <i class="fa-solid fa-check"></i>

                </button>

                <button class="reject"
                    onclick="rejectPost(${index})">

                    <i class="fa-solid fa-xmark"></i>

                </button>

                <button class="delete"
                    onclick="deletePost(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

function viewPost(index) {

    const post = posts[index];

    alert(

        "Title : " + post.title +

        "\n\nUser : " + post.userName +

        "\n\nCategory : " + post.category +

        "\n\nDate : " + post.date +

        "\n\nStatus : " + post.status +

        "\n\nDescription :\n\n" + post.description

    );

}

function approvePost(index) {

    posts[index].status = "Active";

    localStorage.setItem("communityPosts", JSON.stringify(posts));

    displayPosts();

    alert("Post Approved Successfully.");

}

function rejectPost(index) {

    posts[index].status = "Rejected";

    localStorage.setItem("communityPosts", JSON.stringify(posts));

    displayPosts();

    alert("Post Rejected Successfully.");

}

function deletePost(index) {

    if (!confirm("Delete this post?")) {

        return;

    }

    posts.splice(index, 1);

    localStorage.setItem("communityPosts", JSON.stringify(posts));

    displayPosts();

    alert("Post Deleted Successfully.");

}

searchPost.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#communityTable tbody tr");

    rows.forEach(function (row) {

        if (row.innerText.toLowerCase().includes(value)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});

displayPosts();