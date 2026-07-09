const postBtn = document.getElementById("postBtn");

const postText = document.getElementById("postText");

const postImage = document.getElementById("postImage");

const feed = document.getElementById("feed");

const search = document.getElementById("searchPost");

const toast = document.getElementById("toast");


function showToast(message) {

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

postBtn.addEventListener("click", () => {

    const text = postText.value.trim();

    if (text === "") {

        alert("Please enter a post.");

        return;

    }

    const card = document.createElement("div");

    card.className = "post-card";

    let imageHTML = "";

    if (postImage.files.length > 0) {

        const imgURL = URL.createObjectURL(postImage.files[0]);

        imageHTML = `<img src="${imgURL}" alt="Post Image">`;

    }

    card.innerHTML = `

    <div class="post-header">

        <i class="fa-solid fa-circle-user profile-icon"></i>

        <div>

            <h3>You</h3>

            <small>Just Now</small>

        </div>

    </div>

    <p>${text}</p>

    ${imageHTML}

    <div class="post-actions">

        <button class="like-btn">

            <i class="fa-regular fa-thumbs-up"></i>

            Like

        </button>

        <button class="comment-btn">

            <i class="fa-regular fa-comment"></i>

            Comment

        </button>

        <button class="share-btn">

            <i class="fa-solid fa-share"></i>

            Share

        </button>

        <button class="delete-btn">

            <i class="fa-solid fa-trash"></i>

            Delete

        </button>

    </div>

    `;

    feed.prepend(card);

    postText.value = "";

    postImage.value = "";

    attachEvents();

    showToast("Post Published Successfully!");

});

search.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    document.querySelectorAll(".post-card").forEach(post => {

        const text = post.innerText.toLowerCase();

        post.style.display = text.includes(value)

            ? "block"

            : "none";

    });

});

function attachEvents() {

    /* Like */

    document.querySelectorAll(".like-btn").forEach(btn => {

        btn.onclick = function () {

            const icon = this.querySelector("i");

            if (this.classList.contains("liked")) {

                this.classList.remove("liked");

                icon.className = "fa-regular fa-thumbs-up";

                this.innerHTML = '<i class="fa-regular fa-thumbs-up"></i> Like';

            }

            else {

                this.classList.add("liked");

                icon.className = "fa-solid fa-thumbs-up";

                this.innerHTML = '<i class="fa-solid fa-thumbs-up"></i> Liked';

            }

        };

    });

    /* Comment */

    document.querySelectorAll(".comment-btn").forEach(btn => {

        btn.onclick = function () {

            const comment = prompt("Enter your comment:");

            if (comment) {

                showToast("Comment Added!");

            }

        };

    });

    /* Share */

    document.querySelectorAll(".share-btn").forEach(btn => {

        btn.onclick = function () {

            showToast("Post Shared!");

        };

    });

    /* Delete */

    document.querySelectorAll(".delete-btn").forEach(btn => {

        btn.onclick = function () {

            if (confirm("Delete this post?")) {

                this.closest(".post-card").remove();

                showToast("Post Deleted!");

            }

        };

    });

}


attachEvents();