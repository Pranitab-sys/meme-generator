```javascript
import { db, auth } from "../firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("memeCanvas");
    const ctx = canvas.getContext("2d");

    let image = new Image();

    // ==========================
    // IMAGE UPLOAD
    // ==========================

    const imageInput = document.getElementById("imageInput");

    image.onload = function () {

        canvas.width = 400;
        canvas.height = 400;

        ctx.drawImage(image, 0, 0, 400, 400);

    };

    imageInput.addEventListener("change", function (e) {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (event) {

            image.src = event.target.result;

        };

        reader.readAsDataURL(file);

    });

    // ==========================
    // GENERATE MEME
    // ==========================

    window.generateMeme = function () {

        if (!image.src) {

            alert("Upload image first!");

            return;

        }

        const maxWidth = 500;
        const maxHeight = 500;

        let ratio = Math.min(
            maxWidth / image.width,
            maxHeight / image.height
        );

        const drawWidth = image.width * ratio;
        const drawHeight = image.height * ratio;

        canvas.width = maxWidth;
        canvas.height = maxHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const x = (canvas.width - drawWidth) / 2;
        const y = (canvas.height - drawHeight) / 2;

        ctx.drawImage(image, x, y, drawWidth, drawHeight);

        const top = document.getElementById("topText").value;

        const bottom = document.getElementById("bottomText").value;

        const size = document.getElementById("fontSize").value;

        const color = document.getElementById("fontColor").value;

        const font = document.getElementById("fontFamily").value;

        ctx.save();

        ctx.font = size + "px " + font;

        ctx.textAlign = "center";

        ctx.fillStyle = color;

        if (font === "Impact") {

            ctx.strokeStyle = "black";

            ctx.lineWidth = 3;

        }

        else {

            ctx.strokeStyle = "transparent";

            ctx.lineWidth = 0;

        }

        ctx.fillText(top, canvas.width / 2, 40);

        if (font === "Impact") {

            ctx.strokeText(top, canvas.width / 2, 40);

        }

        ctx.fillText(bottom, canvas.width / 2, canvas.height - 20);

        if (font === "Impact") {

            ctx.strokeText(bottom, canvas.width / 2, canvas.height - 20);

        }

        ctx.restore();

    };

    // ==========================
    // DOWNLOAD + SAVE
    // ==========================

    window.downloadMeme = async function () {

        const data = canvas.toDataURL();

        const link = document.createElement("a");

        link.download = "meme.png";

        link.href = data;

        link.click();

        try {

            await addDoc(collection(db, "memes"), {

                imageUrl: data,

                createdAt: Date.now(),

                ownerId: auth.currentUser.uid,

                type: "image"

            });

            alert("Meme Saved Successfully 🚀");

        }

        catch (error) {

            alert(error.message);

        }

    };

});
```
