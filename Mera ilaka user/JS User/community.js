const dashboardBtn = document.getElementById("dashboardBtn");

if (dashboardBtn) {

    dashboardBtn.addEventListener("click", function () {

        window.location.href = "dashboard.html";

    });

}

const createPostBtn = document.getElementById("createPostBtn");
const searchPost = document.getElementById("searchPost");
const categoryFilter = document.getElementById("categoryFilter");
const postsContainer = document.getElementById("postsContainer");

let posts = JSON.parse(localStorage.getItem("communityPosts")) || [];

function displayPosts() {

    postsContainer.innerHTML = "";

    let search = "";

    if (searchPost) {

        search = searchPost.value.toLowerCase();

    }

    let category = "All";

    if (categoryFilter) {

        category = categoryFilter.value;

    }

    const filteredPosts = posts.filter(function (post) {

        const title = (post.title || "").toLowerCase();

        const user = (post.userName || "Unknown").toLowerCase();

        const postCategory = (post.category || "").toLowerCase();

        const status = (post.status || "").toLowerCase();

        return (

            status === "active" &&

            (category === "All" || post.category === category) &&

            (

                title.includes(search) ||

                user.includes(search) ||

                postCategory.includes(search)

            )

        );

    });

    if (filteredPosts.length === 0) {

        postsContainer.innerHTML = `

        <h2 style="text-align:center;margin-top:50px;">

            No Community Posts Available

        </h2>

        `;

        return;

    }

    filteredPosts.forEach(function (post) {

        const image = post.image && post.image.trim() !== ""

            ? post.image

            : "https://via.placeholder.com/600x350?text=Community+Post";

        const likes = post.likes || 0;

        const comments = post.comments ? post.comments.length : 0;

        postsContainer.innerHTML += `

        <div class="post-card">

            <div class="post-content">

                <span class="category">

                    ${post.category || "General"}

                </span>

                <h3>${post.title || "Untitled Post"}</h3>

                <p>

                    ${post.description || "No description available."}

                </p>

                <div class="post-meta">

                    <span>

                        <i class="fa-solid fa-user"></i>

                        ${post.userName || "Unknown"}

                    </span>

                    <span>

                        <i class="fa-solid fa-calendar"></i>

                        ${post.date || ""}

                    </span>

                </div>

                <div class="post-actions">

                    <button class="like-btn"

                        onclick="likePost(${post.id})">

                        ❤️ ${likes}

                    </button>

                    <button class="comment-btn"

                        onclick="commentPost(${post.id})">

                        💬 ${comments}

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

function likePost(id) {

    posts.forEach(function (post) {

        if (post.id === id) {

            if (!post.likes) {

                post.likes = 0;

            }

            post.likes++;

        }

    });

    localStorage.setItem("communityPosts", JSON.stringify(posts));

    displayPosts();

}

function commentPost(id) {

    let text = prompt("Enter your comment");

    if (text == null || text.trim() === "") {

        return;

    }

    posts.forEach(function (post) {

        if (post.id === id) {

            if (!post.comments) {

                post.comments = [];

            }

            post.comments.push({

                user: "User",

                text: text,

                date: new Date().toLocaleString()

            });

        }

    });

    localStorage.setItem("communityPosts", JSON.stringify(posts));

    displayPosts();

}

if (searchPost) {

    searchPost.addEventListener("keyup", displayPosts);

}

if (categoryFilter) {

    categoryFilter.addEventListener("change", displayPosts);

}

if (createPostBtn) {

    createPostBtn.addEventListener("click", function () {

        window.location.href = "create-post.html";

    });

}

displayPosts();