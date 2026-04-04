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

document.getElementById("imageInput").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        image.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

image.onload = function() {
    canvas.width = 400;
    canvas.height = 400;
    ctx.drawImage(image, 0, 0);
};

function generateMeme() {
    ctx.drawImage(image, 0, 0);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";

    ctx.fillText(document.getElementById("topText").value, 200, 40);
    ctx.fillText(document.getElementById("bottomText").value, 200, 380);
}

function downloadMeme() {
    const data = canvas.toDataURL();

    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = data;
    link.click();

    saveMeme(data);
}

// Split Meme
const splitCanvas = document.getElementById("splitCanvas");
const sctx = splitCanvas.getContext("2d");

function generateSplitMeme() {
    splitCanvas.width = 400;
    splitCanvas.height = 400;

    sctx.fillStyle = "blue";
    sctx.fillRect(0, 0, 200, 400);

    sctx.fillStyle = "red";
    sctx.fillRect(200, 0, 200, 400);

    sctx.fillStyle = "white";
    sctx.fillText(document.getElementById("leftText").value, 100, 200);
    sctx.fillText(document.getElementById("rightText").value, 300, 200);
}

// Chat
function addMessage() {
    const input = document.getElementById("chatInput");

    if (input.value.trim() === "") return;

    const msg = document.createElement("div");
    msg.classList.add("message", document.getElementById("sender").value);
    msg.innerText = input.value;

    document.getElementById("chatBox").appendChild(msg);

    input.value = "";
    document.getElementById("chatBox").scrollTop = 9999;
}

// Templates
function selectTemplate(src) {
    openPage("memePage");
    image.src = src;
}

// Save + Delete Memes
function saveMeme(data) {
    let memes = JSON.parse(localStorage.getItem("memes")) || [];
    memes.push(data);
    localStorage.setItem("memes", JSON.stringify(memes));
    displayMemes();
}

function deleteMeme(index) {
    let memes = JSON.parse(localStorage.getItem("memes")) || [];
    memes.splice(index, 1);
    localStorage.setItem("memes", JSON.stringify(memes));
    displayMemes();
}

function displayMemes() {
    const container = document.getElementById("savedMemes");
    container.innerHTML = "";

    let memes = JSON.parse(localStorage.getItem("memes")) || [];

    memes.forEach((src, index) => {
        const div = document.createElement("div");
        div.classList.add("saved-item");

        const img = document.createElement("img");
        img.src = src;

        const btn = document.createElement("button");
        btn.innerText = "X";
        btn.classList.add("delete-btn");
        btn.onclick = () => deleteMeme(index);

        div.appendChild(img);
        div.appendChild(btn);
        container.appendChild(div);
    });
}

window.onload = displayMemes;