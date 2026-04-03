const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");

let image = new Image();

// Upload image
document.getElementById("imageInput").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        image.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

// Draw image
image.onload = function() {
    canvas.width = 400;
    canvas.height = 400;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

// Generate normal meme
function generateMeme() {
    const topText = document.getElementById("topText").value;
    const bottomText = document.getElementById("bottomText").value;
    const color = document.getElementById("textColor").value;
    const size = document.getElementById("fontSize").value;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.font = size + "px Impact";
    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);

    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
}

// Download meme
function downloadMeme() {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
}

// Split meme
function generateSplitMeme() {
    canvas.width = 400;
    canvas.height = 400;

    ctx.fillStyle = "#3498db";
    ctx.fillRect(0, 0, 200, 400);

    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(200, 0, 200, 400);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";

    ctx.fillText("Expectation", 100, 50);
    ctx.fillText("Reality", 300, 50);
}

// Chat messages
function addMessage() {
    const text = document.getElementById("chatInput").value;
    const sender = document.getElementById("sender").value;

    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;

    document.getElementById("chatBox").appendChild(msg);

    document.getElementById("chatInput").value = "";
}

// Download chat meme
function downloadChat() {
    html2canvas(document.getElementById("chatBox")).then(canvas => {
        const link = document.createElement("a");
        link.download = "chat-meme.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}