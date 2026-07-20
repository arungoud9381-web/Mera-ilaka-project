const communityBtn = document.getElementById("communityBtn");

communityBtn.addEventListener("click", function () {

    window.location.href = "community.html";

});

const title = document.getElementById("title");
const category = document.getElementById("category");
const image = document.getElementById("image");
const description = document.getElementById("description");

const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");

let posts = JSON.parse(localStorage.getItem("communityPosts")) || [];

submitBtn.addEventListener("click", function () {

    if (

        title.value.trim() === "" ||

        category.value === "" ||

        description.value.trim() === ""

    ) {

        alert("Please fill all required fields.");

        return;

    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {

        id: "USR001",

        name: "Guest User"

    };

    const post = {

        id: Date.now(),

        userId: currentUser.id,

        userName: currentUser.name,

        title: title.value,

        category: category.value,

        image: image.value,

        description: description.value,

        date: new Date().toLocaleDateString(),

        likes: 0,

        comments: [],

        status: "Pending"

    };

    posts.push(post);

    localStorage.setItem("communityPosts", JSON.stringify(posts));

    alert("Post submitted successfully.\n\nWaiting for admin approval.");

    clearForm();

    window.location.href = "community.html";

});

function clearForm() {

    title.value = "";

    category.value = "";

    image.value = "";

    description.value = "";

}

clearBtn.addEventListener("click", clearForm);