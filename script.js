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
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
};

function generateMeme() {
    const topText = document.getElementById("topText").value;
    const bottomText = document.getElementById("bottomText").value;

    ctx.drawImage(image, 0, 0);

    ctx.font = "40px Impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    // Top text
    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);

    // Bottom text
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
}

function downloadMeme() {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
}