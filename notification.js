
import { db, auth } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // GENERATE NOTIFICATION
    // ===============================

    window.generateNotification = function () {

        const app = document.getElementById("appType").value;

        const user = document.getElementById("notifyUser").value;

        const msg = document.getElementById("notifyMsg").value;

        const time = document.getElementById("notifyTime").value;

        const preview =
            document.getElementById("notificationPreview");

        let logo = "";

        // APP LOGOS

        if (app === "WhatsApp") {

            logo = "images/whatsapp.jpg";

        }

        else if (app === "Instagram") {

            logo = "images/instagram.jpg";

        }

        else if (app === "Telegram") {

            logo = "images/telegram.png";

        }

        // CREATE PREVIEW

        preview.innerHTML = `

            <div class="notify-card" id="notifyCard">

                <img
                    src="${logo}"
                    class="notify-logo">

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



    // ===============================
    // DOWNLOAD + SAVE
    // ===============================

    window.downloadNotification = function () {

        const preview =
            document.getElementById("notificationPreview");

        html2canvas(preview).then(async (canvas) => {

            const data = canvas.toDataURL();

            // Download

            const link =
                document.createElement("a");

            link.download = "notification-meme.png";

            link.href = data;

            link.click();

            // Save to Firebase

            try {

                await addDoc(collection(db, "memes"), {

                    imageUrl: data,

                    type: "notification",

                    createdAt: Date.now(),

                    ownerId: auth.currentUser.uid

                });

                alert("Notification meme saved successfully 🚀");

            }

            catch (error) {

                alert(error.message);

            }

        });

    };

});
