// ==========================
// PAGE NAVIGATION
// ==========================
function openPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function goHome() {
    openPage("home");
}

// ==========================
// MEME SYSTEM
// ==========================
let image = null;

document.getElementById("imageInput").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        image = new Image();
        image.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// TEMPLATE SELECT
function selectTemplate(src) {
    image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;
    openPage("memePage");
}

// DRAW TEXT WITH STROKE + AUTO FIT
function drawText(ctx, text, x, y, maxWidth) {
    let fontSize = 40;
    do {
        ctx.font = fontSize + "px Impact";
        fontSize--;
    } while (ctx.measureText(text).width > maxWidth && fontSize > 10);

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
}

// GENERATE MEME
function generateMeme() {
    if (!image) {
        alert("Upload or select a template!");
        return;
    }

    const canvas = document.getElementById("memeCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    const top = document.getElementById("topText").value;
    const bottom = document.getElementById("bottomText").value;

    drawText(ctx, top, canvas.width / 2, 50, canvas.width - 20);
    drawText(ctx, bottom, canvas.width / 2, canvas.height - 20, canvas.width - 20);

    saveMeme(canvas.toDataURL());
}

// DOWNLOAD MEME
function downloadMeme() {
    const canvas = document.getElementById("memeCanvas");
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
}

// ==========================
// SPLIT MEME
// ==========================
function generateSplitMeme() {
    const canvas = document.getElementById("splitCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 300;

    ctx.fillStyle = "#ff4757";
    ctx.fillRect(0, 0, 300, 300);

    ctx.fillStyle = "#3742fa";
    ctx.fillRect(300, 0, 300, 300);

    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.textAlign = "center";

    ctx.fillText(document.getElementById("leftText").value, 150, 150);
    ctx.fillText(document.getElementById("rightText").value, 450, 150);

    saveMeme(canvas.toDataURL());
}

// ==========================
// CHAT SYSTEM
// ==========================
function addMessage() {
    const text = document.getElementById("chatInput").value;
    const sender = document.getElementById("sender").value;
    const chatBox = document.getElementById("chatBox");

    if (!text.trim()) return;

    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;

    document.getElementById("chatInput").value = "";
}

// ==========================
// STORAGE SYSTEM (LOCAL)
// ==========================
function saveMeme(data) {
    let memes = JSON.parse(localStorage.getItem("memes")) || [];
    memes.push(data);
    localStorage.setItem("memes", JSON.stringify(memes));
    renderSavedMemes();
}

function renderSavedMemes() {
    const container = document.getElementById("savedMemes");
    if (!container) return;

    container.innerHTML = "";

    let memes = JSON.parse(localStorage.getItem("memes")) || [];

    memes.forEach((src, index) => {
        const div = document.createElement("div");
        div.className = "saved-item";

        const img = document.createElement("img");
        img.src = src;

        const del = document.createElement("button");
        del.innerText = "X";
        del.className = "delete-btn";
        del.onclick = () => deleteMeme(index);

        div.appendChild(img);
        div.appendChild(del);
        container.appendChild(div);
    });
}

function deleteMeme(index) {
    let memes = JSON.parse(localStorage.getItem("memes")) || [];
    memes.splice(index, 1);
    localStorage.setItem("memes", JSON.stringify(memes));
    renderSavedMemes();
}

// LOAD SAVED MEMES ON PAGE LOAD
window.onload = function() {
    renderSavedMemes();
};