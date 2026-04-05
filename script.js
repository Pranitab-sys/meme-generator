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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

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

    ctx.fillText(top, canvas.width / 2, 40);
    ctx.strokeText(top, canvas.width / 2, 40);

    ctx.fillText(bottom, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottom, canvas.width / 2, canvas.height - 20);
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
    const msg = document.createElement("div");
    msg.innerText = document.getElementById("chatInput").value;
    document.getElementById("chatBox").appendChild(msg);
}