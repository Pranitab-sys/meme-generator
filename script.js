// ===============================
// 🔊 SOUND EFFECT
// ===============================
function playClick() {
    let audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
    audio.play();
}

// ===============================
// 🎴 DRAG + ROTATE + SNAP SYSTEM
// ===============================
let cards = document.querySelectorAll(".fun-card");

cards.forEach(card => {
    let isDragging = false;
    let offsetX, offsetY;

    card.addEventListener("mousedown", startDrag);
    card.addEventListener("touchstart", startDrag);

    function startDrag(e) {
        isDragging = true;

        let event = e.touches ? e.touches[0] : e;
        offsetX = event.clientX - card.offsetLeft;
        offsetY = event.clientY - card.offsetTop;

        playClick();
        burstColor(card);
    }

    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag);

    function drag(e) {
        if (!isDragging) return;

        let event = e.touches ? e.touches[0] : e;

        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;

        card.style.left = x + "px";
        card.style.top = y + "px";

        // rotation effect
        let rotate = (x % 40) - 20;
        card.style.transform = `rotate(${rotate}deg)`;
    }

    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);

    function stopDrag() {
        if (!isDragging) return;
        isDragging = false;

        snapToGrid(card);
    }
});

// ===============================
// 🧲 SNAP TO GRID
// ===============================
function snapToGrid(card) {
    let x = parseInt(card.style.left) || 0;
    let y = parseInt(card.style.top) || 0;

    let gridX = Math.round(x / 120) * 120;
    let gridY = Math.round(y / 120) * 120;

    card.style.left = gridX + "px";
    card.style.top = gridY + "px";
}

// ===============================
// 🎨 COLOR BURST
// ===============================
function burstColor(card) {
    let colors = ["#ff4b2b", "#00c6ff", "#e100ff", "#00ff87", "#ffcc00"];
    let random = colors[Math.floor(Math.random() * colors.length)];
    card.style.background = random;
}

// ===============================
// 🎲 SHUFFLE CARDS
// ===============================
function shuffleCards() {
    document.querySelectorAll(".fun-card").forEach(card => {
        card.style.left = Math.random() * 250 + "px";
        card.style.top = Math.random() * 400 + "px";
        card.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
    });
}

// ===============================
// 🖼️ MEME GENERATOR
// ===============================
let canvas = document.getElementById("memeCanvas");
let ctx = canvas.getContext("2d");

let image = new Image();

function loadImage(event) {
    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();

    reader.onload = function(e) {
        image.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
};

// ===============================
// ✍️ GENERATE MEME TEXT
// ===============================
function generateMeme() {
    let topText = document.getElementById("topText").value;
    let bottomText = document.getElementById("bottomText").value;

    ctx.drawImage(image, 0, 0);

    ctx.font = "40px Impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    // TOP TEXT
    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);

    // BOTTOM TEXT
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);

    playClick();
}

// ===============================
// 💾 DOWNLOAD MEME
// ===============================
function downloadMeme() {
    let link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
}

// ===============================
// 🚀 PAGE NAVIGATION (OPTIONAL)
// ===============================
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.style.display = "none";
    });

    document.getElementById(id).style.display = "block";
}