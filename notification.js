import { db, auth } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ===========================
// GENERATE NOTIFICATION
// ===========================

window.generateNotification = function () {

    const app = document.getElementById("appType").value;
    const user = document.getElementById("notifyUser").value;
    const msg = document.getElementById("notifyMsg").value;
    const time = document.getElementById("notifyTime").value;

    const preview = document.getElementById("notificationPreview");

    let logo = "";

    if (app === "Telegram") {
        logo = "images/telegram.png";
    }

    if (app === "WhatsApp") {
        logo = "images/whatsapp.jpg";
    }

    if (app === "Instagram") {
        logo = "images/instagram.jpg";
    }

    preview.innerHTML = `
        <div class="notify-card" id="notifyCard">

            <img src="${logo}" class="notify-logo">

            <div class="notify-content">

                <div class="notify-top">

                    <span>${user}</span>

                    <span>${time}</span>

                </div>

                <div class="notify-msg">

                    ${msg}

                </div>

            </div>

        </div>
    `;

};

// ===========================
// DOWNLOAD NOTIFICATION
// ===========================

window.downloadNotification = async function () {

    const preview =
        document.getElementById("notificationPreview");

    html2canvas(preview).then(async (canvas) => {

        const data = canvas.toDataURL();

        const link = document.createElement("a");

        link.download = "notification-meme.png";

        link.href = data;

        link.click();

        try {

            await addDoc(collection(db, "memes"), {

                imageUrl: data,

                type: "notification",

                createdAt: Date.now(),

                ownerId: auth.currentUser.uid

            });

            alert("Notification meme saved 🚀");

        }

        catch (error) {

            alert(error.message);

        }

    });

};