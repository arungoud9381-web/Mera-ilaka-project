const searchInput=document.getElementById("searchNotification");

const notificationCards=document.querySelectorAll(".notification-card");

const readButtons=document.querySelectorAll(".read-btn");

const deleteButtons=document.querySelectorAll(".delete-btn");

const markAllBtn=document.getElementById("markAllBtn");

const clearAllBtn=document.getElementById("clearAllBtn");

const notificationList=document.querySelector(".notification-list");

const toast=document.getElementById("toast");

function showToast(message){

    toast.innerText=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

searchInput.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    document.querySelectorAll(".notification-card").forEach(card=>{

        const text=card.innerText.toLowerCase();

        card.style.display=text.includes(value)

        ?"flex"

        :"none";

    });

});

function attachReadEvents(){

    document.querySelectorAll(".read-btn").forEach(button=>{

        button.onclick=function(){

            const card=this.closest(".notification-card");

            card.classList.remove("unread");

            card.classList.add("read");

            this.innerHTML="<i class='fa-solid fa-check-double'></i> Read";

            this.disabled=true;

            showToast("Notification Marked as Read");

        };

    });

}

function attachDeleteEvents(){

    document.querySelectorAll(".delete-btn").forEach(button=>{

        button.onclick=function(){

            const card=this.closest(".notification-card");

            card.remove();

            showToast("Notification Deleted");

            checkEmpty();

        };

    });

}

markAllBtn.addEventListener("click",()=>{

    document.querySelectorAll(".notification-card").forEach(card=>{

        card.classList.remove("unread");

        card.classList.add("read");

    });

    document.querySelectorAll(".read-btn").forEach(btn=>{

        btn.innerHTML="<i class='fa-solid fa-check-double'></i> Read";

        btn.disabled=true;

    });

    showToast("All Notifications Marked as Read");

});

clearAllBtn.addEventListener("click",()=>{

    notificationList.innerHTML="";

    checkEmpty();

    showToast("All Notifications Cleared");

});

function checkEmpty(){

    if(notificationList.children.length===0){

        notificationList.innerHTML=`

        <div class="notification-card">

            <div class="notification-content">

                <h3>No Notifications</h3>

                <p>You don't have any notifications.</p>

            </div>

        </div>

        `;

    }

}

attachReadEvents();

attachDeleteEvents();

window.addEventListener("load",()=>{

    console.log("Notifications Module Loaded");

});