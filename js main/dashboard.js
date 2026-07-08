const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "scale(1)";

    });

});


const postBtn = document.getElementById("postBtn");

if (postBtn) {

    postBtn.onclick = function () {

        const text = document.getElementById("postText").value;

        if (text.trim() === "") {

            alert("Write something first!");

            return;

        }

        const container = document.getElementById("posts");

        container.insertAdjacentHTML("afterbegin", `

<div class="post-card">

<div class="user-info">

<img src="images/avatar.png">

<div>

<h3>You</h3>

<span>Just now</span>

</div>

</div>

<p>${text}</p>

<div class="post-actions">

<button>👍 Like</button>

<button>💬 Comment</button>

<button>↗ Share</button>

</div>

</div>

`);

        document.getElementById("postText").value = "";

    };

}


const editBtn = document.querySelector(".profile-widget button");

if (editBtn) {

    editBtn.onclick = function () {

        alert("Profile page will open here.");

    };

}

console.log("Weather Widget Loaded");

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.querySelector(".sidebar");

menuBtn.onclick = () => {

    sidebar.classList.toggle("show");

};


const darkBtn = document.getElementById("darkBtn");

darkBtn.onclick = () => {

    document.body.classList.toggle("dark");

};


const bell = document.getElementById("bell");

const notify = document.getElementById("notifyBox");

bell.onclick = () => {

    notify.classList.toggle("show");

};


document.getElementById("logout")

    .onclick = function () {

        if (confirm("Logout?")) {

            window.location.href = "index.html";

        }

    };

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const update = () => {

        const target = +counter.dataset.target;

        const count = +counter.innerText;

        const increment = target / 100;

        if (count < target) {

            counter.innerText = Math.ceil(count + increment);

            setTimeout(update, 20);

        }

        else {

            counter.innerText = target.toLocaleString();

        }

    };

    update();

});

let uploadedImage = "";

const imageUpload = document.getElementById("imageUpload");

const preview = document.getElementById("previewBox");

if (imageUpload) {

    imageUpload.onchange = function (e) {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function () {

            uploadedImage = reader.result;

            preview.innerHTML = `<img src="${uploadedImage}">`;

        }

        reader.readAsDataURL(file);

    };

}

const btn = document.getElementById("postBtn");

btn.onclick = function () {

    const text = document.getElementById("postText").value;

    if (text.trim() === "") {

        alert("Write something!");

        return;

    }

    const post = document.createElement("div");

    post.className = "post-card";

    post.innerHTML = `

<div class="user-info">

<img src="images/avatar.png">

<div>

<h3>You</h3>

<small>Just Now</small>

</div>

</div>

<p>${text}</p>

${uploadedImage ? `<img class="post-image" src="${uploadedImage}">` : ""}

<div class="post-actions">

<button class="like-btn">

👍 Like <span>0</span>

</button>

<button class="share-btn">

↗ Share

</button>

<button class="delete-btn">

🗑 Delete

</button>

</div>

`;

    document.getElementById("posts").prepend(post);

    document.getElementById("postText").value = "";

    preview.innerHTML = "";

    uploadedImage = "";

};

/* ===========================
Like & Delete
=========================== */

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete-btn")) {

        e.target.closest(".post-card").remove();

    }

    if (e.target.classList.contains("share-btn")) {

        alert("Share feature coming soon.");

    }

    if (e.target.classList.contains("like-btn")) {

        const span = e.target.querySelector("span");

        let count = parseInt(span.innerText);

        count++;

        span.innerText = count;

    }

});

document.addEventListener("click", function (e) {

    const post = e.target.closest(".post-card");

    if (!post) return;

    if (e.target.classList.contains("comment-btn")) {

        const text = prompt("Enter your comment");

        if (text) {

            const comments = post.querySelector(".comments");

            comments.innerHTML += `

<div class="comment">

<b>You:</b> ${text}

</div>

`;

        }

    }

    if (e.target.classList.contains("edit-btn")) {

        const p = post.querySelector("p");

        const updated = prompt("Edit Post", p.innerText);

        if (updated) {

            p.innerText = updated;

        }

    }

    if (e.target.classList.contains("pin-btn")) {

        const container = document.getElementById("posts");

        container.prepend(post);

        post.classList.toggle("pinned");

    }

});

const search = document.getElementById("postSearch");

if (search) {

    search.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".post-card").forEach(post => {

            const text = post.innerText.toLowerCase();

            post.style.display = text.includes(value) ? "block" : "none";

        });

    });

}

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("emoji-btn")) {

        const emoji = prompt("Choose emoji\n😀 😍 👍 ❤️ 🎉 😂");

        if (emoji) {

            let box = e.target.parentElement.nextElementSibling;

            if (!box || !box.classList.contains("reaction")) {

                box = document.createElement("div");

                box.className = "reaction";

                e.target.parentElement.after(box);

            }

            box.innerHTML = "Your Reaction: " + emoji;

        }

    }

});

window.addEventListener("load", () => {

    const bars = document.querySelectorAll(".bar");

    bars.forEach(bar => {

        const finalHeight = bar.style.height;

        bar.style.height = "0";

        setTimeout(() => {

            bar.style.height = finalHeight;

        }, 200);

    });

});

document.querySelectorAll(".quick-actions button").forEach(button => {

    button.addEventListener("click", () => {

        alert(button.innerText + " feature will be available soon.");

    });

});

const today = new Date().getDate();

document.querySelectorAll(".days span").forEach(day => {

    if (day.innerText == today) {

        day.classList.add("today");

    }

});

const sendBtn = document.getElementById("sendChat");
const chatInput = document.getElementById("chatInput");
const chatBox = document.getElementById("chatBox");

if (sendBtn) {

    sendBtn.addEventListener("click", () => {

        const text = chatInput.value.trim();

        if (text === "") return;

        const msg = document.createElement("div");

        msg.className = "chat-message";

        msg.innerHTML = `<strong>You:</strong> ${text}`;

        chatBox.appendChild(msg);

        chatInput.value = "";

        chatBox.scrollTop = chatBox.scrollHeight;

    });

}

document.querySelectorAll(".trending-list li").forEach(item => {

    item.addEventListener("click", () => {

        alert("Opening: " + item.innerText);

    });

});

const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {

    exploreBtn.addEventListener("click", () => {

        alert("Welcome to Mera Ilaka! Explore your community.");

    });

}

document.querySelectorAll(".badge-card").forEach(card => {

    card.addEventListener("click", () => {

        alert("🏆 Achievement Unlocked: " + card.innerText);

    });

});

window.addEventListener("load", () => {

    document.querySelectorAll(".progress-fill").forEach(bar => {

        const width = bar.style.width;

        bar.style.width = "0";

        setTimeout(() => {

            bar.style.width = width;

        }, 300);

    });

});

function updateClock() {

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString();

    document.getElementById("todayDate").innerHTML =
        now.toDateString();

}

setInterval(updateClock, 1000);

updateClock();

const saveBtn = document.getElementById("saveNote");

const note = document.getElementById("stickyNote");

if (localStorage.getItem("note")) {

    note.value = localStorage.getItem("note");

}

saveBtn.onclick = function () {

    localStorage.setItem("note", note.value);

    alert("Note Saved Successfully!");

}

