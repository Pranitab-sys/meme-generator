```javascript
import { db, auth } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // VIDEO UPLOAD
    // ===============================

    const videoInput = document.getElementById("videoInput");
    const videoPreview = document.getElementById("videoPreview");

    if (videoInput && videoPreview) {

        videoInput.addEventListener("change", (e) => {

            const file = e.target.files[0];

            if (!file) return;

            videoPreview.src = URL.createObjectURL(file);

        });

    }

    // ===============================
    // GENERATE VIDEO MEME
    // ===============================

    window.generateVideoMeme = function () {

        const topText =
            document.getElementById("topVideoText").value;

        const bottomText =
            document.getElementById("bottomVideoText").value;

        const size =
            document.getElementById("videoFontSize").value;

        const color =
            document.getElementById("videoFontColor").value;

        const font =
            document.getElementById("videoFontFamily").value;

        const topOverlay =
            document.getElementById("videoTopOverlay");

        const bottomOverlay =
            document.getElementById("videoBottomOverlay");

        topOverlay.innerText = topText;
        bottomOverlay.innerText = bottomText;

        topOverlay.style.fontSize = size + "px";
        bottomOverlay.style.fontSize = size + "px";

        topOverlay.style.color = color;
        bottomOverlay.style.color = color;

        topOverlay.style.fontFamily = font;
        bottomOverlay.style.fontFamily = font;

    };

    // ===============================
    // DOWNLOAD + SAVE
    // ===============================

    window.downloadVideoMeme = function () {

        const preview =
            document.querySelector(".video-preview-box");

        html2canvas(preview).then(async (canvas) => {

            const data = canvas.toDataURL();

            // Download

            const link = document.createElement("a");

            link.download = "video-meme.png";

            link.href = data;

            link.click();

            // Save to Firebase

            try {

                await addDoc(collection(db, "memes"), {

                    imageUrl: data,

                    type: "video",

                    createdAt: Date.now(),

                    ownerId: auth.currentUser.uid

                });

                alert("Video meme saved successfully 🚀");

            }

            catch (error) {

                alert(error.message);

            }

        });

    };

});
```
