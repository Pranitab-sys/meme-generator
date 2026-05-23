import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ---------------- GLOBAL FUNCTIONS ----------------



window.openPage = function (id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    if (id === "savedPage") loadSavedMemes();
};

window.goHome = function () {
    openPage("home");
};

// ---------------- DOM LOADED ----------------

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("memeCanvas");
    const ctx = canvas.getContext("2d");
    let image = new Image();

    image.onload = function () {
        canvas.width = 400;
        canvas.height = 400;
        ctx.drawImage(image, 0, 0);
    };

    const imageInput = document.getElementById("imageInput");
    if (imageInput) {
        imageInput.addEventListener("change", function (e) {
            const reader = new FileReader();
            reader.onload = function (event) {
                image.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });
    }

    // -------- MEME GENERATOR --------

    window.generateMeme = function () {
    if (!image.src) {
        alert("Upload image first!");
        return;
    }

    const maxWidth = 500;
    const maxHeight = 500;

    let ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
    const drawWidth = image.width * ratio;
    const drawHeight = image.height * ratio;

    canvas.width = maxWidth;
    canvas.height = maxHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const x = (canvas.width - drawWidth) / 2;
    const y = (canvas.height - drawHeight) / 2;

    ctx.drawImage(image, x, y, drawWidth, drawHeight);

    // TEXT INPUTS
    const top = document.getElementById("topText").value;
    const bottom = document.getElementById("bottomText").value;
    const size = document.getElementById("fontSize").value;
    const color = document.getElementById("fontColor").value;
    const font = document.getElementById("fontFamily").value;

    ctx.save();

    ctx.font = size + "px " + font;
    ctx.textAlign = "center";
    ctx.fillStyle = color;

    if (font === "Impact") {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
    } else {
        ctx.strokeStyle = "transparent";
        ctx.lineWidth = 0;
    }

    // TOP TEXT
    ctx.fillText(top, canvas.width / 2, 40);
    if (font === "Impact") {
        ctx.strokeText(top, canvas.width / 2, 40);
    }

    // BOTTOM TEXT
    ctx.fillText(bottom, canvas.width / 2, canvas.height - 20);
    if (font === "Impact") {
        ctx.strokeText(bottom, canvas.width / 2, canvas.height - 20);
    }

    ctx.restore();
};

    window.downloadMeme = async function () {
        const data = canvas.toDataURL();

        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = data;
        link.click();

        await addDoc(collection(db, "memes"), {
            imageUrl: data,
            createdAt: Date.now()
        });

        alert("Saved to Firebase 🚀");
    };

    // -------- CHAT MEME --------

    window.addMessage = function() {
    const input = document.getElementById("chatInput");
    const emoji = document.getElementById("emojiPicker").value;
    const sender = document.getElementById("sender").value;
    const chatBox = document.getElementById("chatBox");

    if (!input.value.trim()) return;

    const row = document.createElement("div");
    row.classList.add("msg-row");

    const msg = document.createElement("div");
    msg.classList.add("message");

    const now = new Date();
    let time = now.getHours() + ":" + String(now.getMinutes()).padStart(2, '0');

    if (sender === "me") {
        row.classList.add("right");
        msg.classList.add("sent");

        msg.innerHTML = `
            ${input.value} ${emoji}
            <span class="time">${time} ✔✔</span>
        `;
    } else {
        row.classList.add("left");
        msg.classList.add("received");

        msg.innerHTML = `
            ${input.value} ${emoji}
            <span class="time">${time}</span>
        `;
    }

    const dp = document.createElement("img");
    dp.classList.add("dp");

    dp.src = sender === "me"
        ? "https://i.pravatar.cc/30?img=3"
        : "https://i.pravatar.cc/30?img=5";

    if (sender === "me") {
        row.appendChild(msg);
        row.appendChild(dp);
    } else {
        row.appendChild(dp);
        row.appendChild(msg);
    }

    chatBox.appendChild(row);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
};

    window.downloadChat = function () {
    const chatBox = document.getElementById("chatBox");

    html2canvas(chatBox).then(async (canvas) => {

        const data = canvas.toDataURL();

        // ✅ Download
        const link = document.createElement("a");
        link.download = "chat-meme.png";
        link.href = data;
        link.click();

        // ✅ Save to Firebase
        await addDoc(collection(db, "memes"), {
            imageUrl: data,
            type: "chat",
            createdAt: Date.now()
        });

        alert("Chat meme saved 🚀");
    });
};

});

// ---------------- SAVED MEMES ----------------

async function loadSavedMemes() {

    const container = document.getElementById("savedContainer");

    container.innerHTML = "Loading...";

    try {

        const snapshot = await getDocs(collection(db, "memes"));

        container.innerHTML = "";

        if (snapshot.empty) {
            container.innerHTML = "<p>No memes saved 😢</p>";
            return;
        }

        snapshot.forEach(docSnap => {

            const meme = docSnap.data();

            console.log(meme);

            const box = document.createElement("div");
            box.classList.add("meme-box");

            // ✅ IMAGE MEME
            if (meme.imageUrl) {

                const img = document.createElement("img");
                img.src = meme.imageUrl;

                img.style.width = "100%";
                img.style.borderRadius = "10px";

                box.appendChild(img);

            }

            // ✅ TEXT MEME (for testSave)
            else {

                return;
            }

            container.appendChild(box);

        });

    } catch (err) {

        console.error(err);

        container.innerHTML = "Error loading memes ❌";
    }
}

// ================= GENERATE NOTIFICATION =================

// ================= GENERATE NOTIFICATION =================

window.generateNotification = function () {

    const app = document.getElementById("appType").value;

    const user = document.getElementById("notifyUser").value;

    const msg = document.getElementById("notifyMsg").value;

    const time = document.getElementById("notifyTime").value;

    const preview = document.getElementById("notificationPreview");

    let logo = "";

    // APP LOGOS

    if(app === "Telegram"){
    logo = "images/telegram.png";
}

if(app === "WhatsApp"){
    logo= "images/whatsapp.jpg";
}

if(app === "Instagram"){
    logo = "images/instagram.jpg";
}

    // CREATE CARD

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

// ================= DOWNLOAD + SAVE =================

window.downloadNotification = async function () {

    const preview =
    document.getElementById("notificationPreview");

    html2canvas(preview).then(async canvas => {

        const data = canvas.toDataURL();

        // DOWNLOAD
        const link = document.createElement("a");

        link.download = "notification.png";

        link.href = data;

        link.click();

        // SAVE TO FIREBASE
        await addDoc(collection(db, "memes"), {

            imageUrl: data,

            createdAt: Date.now()

        });

        alert("Saved 🚀");

    });

};

// ================= VIDEO MEME =================

const videoInput =
document.getElementById("videoInput");

const videoPreview =
document.getElementById("videoPreview");

let uploadedVideo = null;

// VIDEO PREVIEW

videoInput.addEventListener("change", (e) => {

    uploadedVideo = e.target.files[0];

    if (!uploadedVideo) return;

    const url =
    URL.createObjectURL(uploadedVideo);

    videoPreview.src = url;
});

// GENERATE VIDEO MEME

window.generateVideoMeme = async function () {

    if (!uploadedVideo) {

        alert("Upload video first!");

        return;
    }

    const topText =
    document.getElementById("topVideoText").value;

    const bottomText =
    document.getElementById("bottomVideoText").value;

    // SHOW OVERLAY TEXT

    document.getElementById("videoTopOverlay")
    .innerText = topText;

    document.getElementById("videoBottomOverlay")
    .innerText = bottomText;

    alert("Processing video... ⏳");

    try {

        const { createFFmpeg, fetchFile } = FFmpeg;

        const ffmpeg = createFFmpeg({
            log: true
        });

        await ffmpeg.load();

        ffmpeg.FS(
            "writeFile",
            "input.mp4",
            await fetchFile(uploadedVideo)
        );

        await ffmpeg.run(

            "-i", "input.mp4",

            "-vf",

            `drawtext=text='${topText}':fontcolor=white:fontsize=40:x=(w-text_w)/2:y=40`,

            "-codec:a",
            "copy",

            "output.mp4"
        );

        const data =
        ffmpeg.FS("readFile", "output.mp4");

        const videoURL =
        URL.createObjectURL(

            new Blob(
                [data.buffer],
                { type: "video/mp4" }
            )
        );

        videoPreview.src = videoURL;

        // AUTO DOWNLOAD

        const link =
        document.createElement("a");

        link.href = videoURL;

        link.download = "video-meme.mp4";

        link.click();

        alert("Video meme created 🚀");

    } catch (err) {

        console.error(err);

        alert("Error generating video meme ❌");
    }
};