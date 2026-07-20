const supportBtn = document.getElementById("supportBtn");

const title = document.getElementById("title");
const category = document.getElementById("category");
const description = document.getElementById("description");

const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");

supportBtn.addEventListener("click", function () {

    window.location.href = "support.html";

});

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {

    id: "USR001",

    name: "Guest User"

};

let supportRequests = JSON.parse(localStorage.getItem("supportRequests")) || [];

submitBtn.addEventListener("click", function () {

    if (

        title.value.trim() === "" ||

        category.value === "" ||

        description.value.trim() === ""

    ) {

        alert("Please fill all required fields.");

        return;

    }

    const request = {

        id: Date.now(),

        userId: currentUser.id,

        userName: currentUser.name,

        title: title.value.trim(),

        category: category.value,

        description: description.value.trim(),

        date: new Date().toLocaleDateString(),

        status: "Pending",

        response: ""

    };

    supportRequests.push(request);

    localStorage.setItem(

        "supportRequests",

        JSON.stringify(supportRequests)

    );

    alert("Support request submitted successfully.");

    clearForm();

    window.location.href = "support.html";

});

function clearForm() {

    title.value = "";

    category.value = "";

    description.value = "";

}

clearBtn.addEventListener("click", clearForm);