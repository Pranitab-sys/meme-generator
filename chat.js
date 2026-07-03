
import { db, auth } from "../firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    // ===========================
    // ADD MESSAGE
    // ===========================

    window.addMessage = function () {

        const input = document.getElementById("chatInput");
        const emoji = document.getElementById("emojiPicker").value;
        const sender = document.getElementById("sender").value;
        const chatBox = document.getElementById("chatBox");

        if (!input.value.trim()) {

            alert("Enter a message!");

            return;

        }

        const row = document.createElement("div");
        row.classList.add("msg-row");

        const msg = document.createElement("div");
        msg.classList.add("message");

        const now = new Date();

        const time =
            now.getHours() +
            ":" +
            String(now.getMinutes()).padStart(2, "0");

        if (sender === "me") {

            row.classList.add("right");
            msg.classList.add("sent");

            msg.innerHTML = `
                ${input.value} ${emoji}
                <span class="time">${time} ✔✔</span>
            `;

        }

        else {

            row.classList.add("left");
            msg.classList.add("received");

            msg.innerHTML = `
                ${input.value} ${emoji}
                <span class="time">${time}</span>
            `;

        }

        const dp = document.createElement("img");

        dp.classList.add("dp");

        dp.src =
            sender === "me"
                ? "https://i.pravatar.cc/30?img=3"
                : "https://i.pravatar.cc/30?img=5";

        if (sender === "me") {

            row.appendChild(msg);
            row.appendChild(dp);

        }

        else {

            row.appendChild(dp);
            row.appendChild(msg);

        }

        chatBox.appendChild(row);

        input.value = "";

        chatBox.scrollTop = chatBox.scrollHeight;

    };

    // ===========================
    // DOWNLOAD CHAT
    // ===========================

    window.downloadChat = function () {

        const chatBox = document.getElementById("chatBox");

        html2canvas(chatBox).then(async (canvas) => {

            const data = canvas.toDataURL();

            // Download

            const link = document.createElement("a");

            link.download = "chat-meme.png";

            link.href = data;

            link.click();

            // Save to Firebase

            try {

                await addDoc(collection(db, "memes"), {

                    imageUrl: data,

                    type: "chat",

                    createdAt: Date.now(),

                    ownerId: auth.currentUser.uid

                });

                alert("Chat meme saved successfully 🚀");

            }

            catch (error) {

                alert(error.message);

            }

        });

    };

});

