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
    if (!image.src) {
        alert("Please upload or select an image first!");
        return;
    }

    const top = document.getElementById("topText").value;
    const bottom = document.getElementById("bottomText").value;
    const size = document.getElementById("fontSize").value;
    const color = document.getElementById("fontColor").value;
    const font = document.getElementById("fontFamily").value;

    // redraw image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    ctx.font = size + "px " + font;

    // top text
    ctx.fillText(top, canvas.width / 2, 50);
    ctx.strokeText(top, canvas.width / 2, 50);

    // bottom text
    ctx.fillText(bottom, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottom, canvas.width / 2, canvas.height - 20);
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
let leftImg = null;
let rightImg = null;

// LOAD LEFT IMAGE
document.getElementById("leftImage").addEventListener("change", function(e){
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function(ev){
        leftImg = new Image();
        leftImg.src = ev.target.result;
    };
    reader.readAsDataURL(file);
});

// LOAD RIGHT IMAGE
document.getElementById("rightImage").addEventListener("change", function(e){
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function(ev){
        rightImg = new Image();
        rightImg.src = ev.target.result;
    };
    reader.readAsDataURL(file);
});

// AUTO TEXT WRAP
function drawWrappedText(ctx, text, x, y, maxWidth) {
    const words = text.split(" ");
    let line = "";
    let lineHeight = 28;

    ctx.font = "bold 24px Impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        let width = ctx.measureText(testLine).width;

        if (width > maxWidth && i > 0) {
            ctx.fillText(line, x, y);
            ctx.strokeText(line, x, y);
            line = words[i] + " ";
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    ctx.fillText(line, x, y);
    ctx.strokeText(line, x, y);
}

// GENERATE SPLIT MEME (ADVANCED)
function generateSplitMeme() {
    const canvas = document.getElementById("splitCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 400;

    const leftColor = document.getElementById("leftColor").value;
    const rightColor = document.getElementById("rightColor").value;

    // LEFT SIDE
    if (leftImg) {
        ctx.drawImage(leftImg, 0, 0, 400, 400);
    } else {
        ctx.fillStyle = leftColor;
        ctx.fillRect(0, 0, 400, 400);
    }

    // RIGHT SIDE
    if (rightImg) {
        ctx.drawImage(rightImg, 400, 0, 400, 400);
    } else {
        ctx.fillStyle = rightColor;
        ctx.fillRect(400, 0, 400, 400);
    }

    // TEXT
    const leftText = document.getElementById("leftText").value;
    const rightText = document.getElementById("rightText").value;

    drawWrappedText(ctx, leftText, 200, 60, 350);
    drawWrappedText(ctx, rightText, 600, 60, 350);

    // LABELS (Premium Touch)
    ctx.font = "bold 18px Arial";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText("Expectation", 200, 30);
    ctx.fillText("Reality", 600, 30);

    // DIVIDER
    if (document.getElementById("dividerStyle").value === "line") {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(400, 0);
        ctx.lineTo(400, 400);
        ctx.stroke();
    }

    saveMeme(canvas.toDataURL());
}

// DOWNLOAD
function downloadSplit() {
    const canvas = document.getElementById("splitCanvas");
    const link = document.createElement("a");
    link.download = "split-meme.png";
    link.href = canvas.toDataURL();
    link.click();
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