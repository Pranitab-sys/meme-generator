```javascript
import { db, auth } from "../firebase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    loadSavedMemes();

});

// ===============================
// LOAD SAVED MEMES
// ===============================

async function loadSavedMemes() {

    const container = document.getElementById("savedContainer");

    if (!container) return;

    container.innerHTML = "<p>Loading memes...</p>";

    try {

        const snapshot = await getDocs(collection(db, "memes"));

        container.innerHTML = "";

        if (snapshot.empty) {

            container.innerHTML = "<p>No memes found 😢</p>";

            return;

        }

        snapshot.forEach(docSnap => {

            const meme = docSnap.data();

            const currentUser = auth.currentUser;

            const card = document.createElement("div");
            card.className = "meme-box";

            // ================= IMAGE =================

            const img = document.createElement("img");

            img.src = meme.imageUrl;

            img.style.width = "100%";
            img.style.height = "300px";
            img.style.objectFit = "contain";
            img.style.borderRadius = "12px";
            img.style.background = "#222";

            card.appendChild(img);

            // ================= BUTTON ROW =================

            const buttonRow = document.createElement("div");

            buttonRow.className = "saved-buttons";

            // ================= DOWNLOAD =================

            const downloadBtn = document.createElement("button");

            downloadBtn.innerText = "⬇ Download";

            downloadBtn.onclick = () => {

                const link = document.createElement("a");

                link.href = meme.imageUrl;

                link.download = "meme.png";

                link.click();

            };

            buttonRow.appendChild(downloadBtn);

            // ================= DELETE =================

            if (
                currentUser &&
                meme.ownerId === currentUser.uid
            ) {

                const deleteBtn = document.createElement("button");

                deleteBtn.innerText = "🗑 Delete";

                deleteBtn.onclick = async () => {

                    const confirmDelete = confirm(
                        "Delete this meme?"
                    );

                    if (!confirmDelete) return;

                    try {

                        await deleteDoc(
                            doc(db, "memes", docSnap.id)
                        );

                        alert("Deleted Successfully ✅");

                        loadSavedMemes();

                    }

                    catch (error) {

                        alert(error.message);

                    }

                };

                buttonRow.appendChild(deleteBtn);

            }

            card.appendChild(buttonRow);

            container.appendChild(card);

        });

    }

    catch (error) {

        console.error(error);

        container.innerHTML =
            "<p>Error loading memes ❌</p>";

    }

}
```
