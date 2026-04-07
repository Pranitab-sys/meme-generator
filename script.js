function openPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function goHome() {
    openPage("home");
}

// Meme Generator
const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
let image = new Image();

image.onload = function() {
    canvas.width = 400;
    canvas.height = 400;
    ctx.drawImage(image, 0, 0);
};

document.getElementById("imageInput").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        image.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

function generateMeme() {
    if (!image.src) {
        alert("Upload image first!");
        return;
    }

    const maxWidth = 500;
    const maxHeight = 500;

    // calculate ratio (fit inside box)
    let ratio = Math.min(maxWidth / image.width, maxHeight / image.height);

    const drawWidth = image.width * ratio;
    const drawHeight = image.height * ratio;

    // keep canvas FIXED (important!)
    canvas.width = maxWidth;
    canvas.height = maxHeight;

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // center image (THIS removes zoom feel)
    const x = (canvas.width - drawWidth) / 2;
    const y = (canvas.height - drawHeight) / 2;

    ctx.drawImage(image, x, y, drawWidth, drawHeight);

    // TEXT
    const top = document.getElementById("topText").value;
    const bottom = document.getElementById("bottomText").value;
    const size = document.getElementById("fontSize").value;
    const color = document.getElementById("fontColor").value;
    const font = document.getElementById("fontFamily").value;

    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    ctx.font = size + "px " + font;

    ctx.fillText(top, canvas.width / 2, size);
    ctx.strokeText(top, canvas.width / 2, size);

    ctx.fillText(bottom, canvas.width / 2, canvas.height - 10);
    ctx.strokeText(bottom, canvas.width / 2, canvas.height - 10);
}
function downloadMeme() {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
}

// Split Meme
const splitCanvas = document.getElementById("splitCanvas");
const sctx = splitCanvas.getContext("2d");

function generateSplit() {
    splitCanvas.width = 400;
    splitCanvas.height = 400;

    sctx.fillStyle = "blue";
    sctx.fillRect(0, 0, 200, 400);

    sctx.fillStyle = "red";
    sctx.fillRect(200, 0, 200, 400);
}

// Chat Meme
function addMessage() {
    const input = document.getElementById("chatInput");
    const emoji = document.getElementById("emojiPicker").value;
    const sender = document.getElementById("sender").value;
    const chatBox = document.getElementById("chatBox");

    if (input.value.trim() === "") return;

    const row = document.createElement("div");
    row.classList.add("msg-row");

    const msg = document.createElement("div");
    msg.classList.add("message");

    // Time
    const now = new Date();
    let time = now.getHours() + ":" + now.getMinutes();

    if (sender === "me") {
        msg.classList.add("sent");

        msg.innerHTML = `
            ${input.value} ${emoji}
            <span class="time">${time} <span class="tick">✔✔</span></span>
        `;

    } else {
        msg.classList.add("received");

        msg.innerHTML = `
            ${input.value} ${emoji}
            <span class="time">${time}</span>
        `;
    }

    // DP (profile pic)
    const dp = document.createElement("img");
    dp.classList.add("dp");

    if (sender === "me") {
        dp.src = "https://i.pravatar.cc/30?img=3";
        row.appendChild(msg);
        row.appendChild(dp);
    } else {
        dp.src = "https://i.pravatar.cc/30?img=5";
        row.appendChild(dp);
        row.appendChild(msg);
    }

    chatBox.appendChild(row);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

function downloadChat() {
    html2canvas(document.querySelector(".chat-container")).then(canvas => {
        const link = document.createElement("a");
        link.download = "chat-meme.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}