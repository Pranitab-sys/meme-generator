const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");

const imageInput = document.getElementById("imageInput");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

let image = new Image();
let imageLoaded = false;

// Upload Image
imageInput.addEventListener("change", function (e) {
    const file = e.target.files[0];

    if (!file) {
        alert("Please select an image!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        image.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// Image Loaded
image.onload = function () {
    imageLoaded = true;
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
};

// Generate Meme
generateBtn.addEventListener("click", function () {
    if (!imageLoaded) {
        alert("Upload image first!");
        return;
    }

    const topText = document.getElementById("topText").value;
    const bottomText = document.getElementById("bottomText").value;

    ctx.drawImage(image, 0, 0);

    ctx.font = "bold 40px Impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    // Top Text
    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);

    // Bottom Text
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
});

// Download Meme
downloadBtn.addEventListener("click", function () {
    if (!imageLoaded) {
        alert("Generate meme first!");
        return;
    }

    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
});