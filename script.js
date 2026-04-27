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

    ctx.font = size + "px " + font;
    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
   
// 🔥 TEXT DRAWING (REPLACE THIS PART ONLY)

ctx.save();

ctx.font = size + "px " + font;
ctx.textAlign = "center";
ctx.fillStyle = color;

// Apply stroke only for Impact
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
}
function downloadMeme() {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
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
    html2canvas(document.querySelector(".chat-box")).then(canvas => {
        const link = document.createElement("a");
        link.download = "chat-meme.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}

const captions = [
    "When assignment deadline is tomorrow 💀",
    "Me after opening exam paper 😭",
    "Brain loading... 1% 🧠",
    "When teacher says 'easy test' 😡",
    "Me pretending I understand everything 😎"
];

const prompts = [
    "dog office suit",
    "cat laptop work",
    "student crying exam",
    "funny monkey computer",
    "alien street food"
];

function generateAIMeme() {
    const caption = captions[Math.floor(Math.random() * captions.length)];
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];

    const img = `https://source.unsplash.com/300x300/?${prompt}`;

    document.getElementById("memeImg").src = img;
    document.getElementById("caption").innerText = caption;
}
function downloadAIMeme() {
    html2canvas(document.getElementById("memeBox")).then(canvas => {
        const link = document.createElement("a");
        link.download = "ai-meme.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";
}