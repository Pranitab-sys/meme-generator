// WAIT for page load (IMPORTANT FIX)
window.onload = function () {

    function openPage(id) {
        document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
        document.getElementById(id).classList.add("active");
    }

    function goHome() {
        openPage("home");
    }

    // Make functions global
    window.openPage = openPage;
    window.goHome = goHome;

    // Meme
    const canvas = document.getElementById("memeCanvas");
    const ctx = canvas.getContext("2d");
    let image = new Image();

    image.onload = function () {
        canvas.width = 400;
        canvas.height = 400;
        ctx.drawImage(image, 0, 0);
    };

    document.getElementById("imageInput").addEventListener("change", function (e) {
        const reader = new FileReader();
        reader.onload = function (event) {
            image.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    window.generateMeme = function () {
        ctx.drawImage(image, 0, 0);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "30px Arial";

        ctx.fillText(document.getElementById("topText").value, 200, 40);
        ctx.fillText(document.getElementById("bottomText").value, 200, 380);
    };

    window.downloadMeme = function () {
        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = canvas.toDataURL();
        link.click();
    };

    // Split
    const splitCanvas = document.getElementById("splitCanvas");
    const sctx = splitCanvas.getContext("2d");

    window.generateSplit = function () {
        splitCanvas.width = 400;
        splitCanvas.height = 400;

        sctx.fillStyle = "blue";
        sctx.fillRect(0, 0, 200, 400);

        sctx.fillStyle = "red";
        sctx.fillRect(200, 0, 200, 400);
    };

    // Chat
    window.addMessage = function () {
        const msg = document.createElement("div");
        msg.innerText = document.getElementById("chatInput").value;
        document.getElementById("chatBox").appendChild(msg);
    };
};
