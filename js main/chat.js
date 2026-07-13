const chatBox = document.getElementById("chatBox");

const messageInput = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

const emojiBtn = document.getElementById("emojiBtn");

const searchUser = document.getElementById("searchUser");

const contacts = document.querySelectorAll(".contact");

function sendMessage() {

    const message = messageInput.value.trim();

    if (message === "") {

        return;

    }

    const div = document.createElement("div");

    div.className = "message sent";

    div.innerText = message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

    messageInput.value = "";

    autoReply();

}
sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        sendMessage();

    }

});

function autoReply() {

    setTimeout(() => {

        const replies = [

            "👍 Thanks for your message!",

            "😊 We'll get back to you soon.",

            "🎉 Great idea!",

            "👌 Noted!",

            "📢 Community Admin received your message."

        ];

        const randomReply =

            replies[Math.floor(Math.random() * replies.length)];

        const div = document.createElement("div");

        div.className = "message received";

        div.innerText = randomReply;

        chatBox.appendChild(div);

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 1000);

}

emojiBtn.addEventListener("click", () => {

    messageInput.value += "😊";

    messageInput.focus();

});

searchUser.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    contacts.forEach(contact => {

        const name = contact.innerText.toLowerCase();

        contact.style.display =

            name.includes(value)

                ? "flex"

                : "none";

    });

});

contacts.forEach(contact => {

    contact.addEventListener("click", function () {

        contacts.forEach(c => {

            c.classList.remove("active");

        });

        this.classList.add("active");

        const userName = this.querySelector("h4").innerText;

        document.querySelector(".chat-header h2").innerText = userName;

        chatBox.innerHTML = "";

        const welcome = document.createElement("div");

        welcome.className = "message received";

        welcome.innerText = "You are now chatting with " + userName;

        chatBox.appendChild(welcome);

    });

});

window.addEventListener("load", () => {

    chatBox.scrollTop = chatBox.scrollHeight;

    console.log("Chat Module Loaded");

});