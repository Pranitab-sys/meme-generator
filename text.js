
import { db, auth } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// ==========================
// TEXT MEME GENERATOR
// ==========================

const canvas = document.getElementById("textCanvas");
const ctx = canvas.getContext("2d");


const textInput = document.getElementById("memeText");
const fontStyle = document.getElementById("fontStyle");
const fontSize = document.getElementById("fontSize");
const textColor = document.getElementById("textColor");
const bgColor = document.getElementById("bgColor");



// ==========================
// GENERATE
// ==========================

function generateTextMeme(){


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Background

    ctx.fillStyle = bgColor.value;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    // Text

    ctx.fillStyle = textColor.value;

    ctx.font =
    `bold ${fontSize.value}px ${fontStyle.value}`;


    ctx.textAlign = "center";
    ctx.textBaseline = "middle";


    let text = textInput.value;


    if(text.trim()===""){

        text="Your Meme Text";

    }



    ctx.fillText(

        text,

        canvas.width/2,

        canvas.height/2

    );


}




// ==========================
// DOWNLOAD + SAVE FIREBASE
// ==========================

async function downloadTextMeme(){


    generateTextMeme();


    const data =
    canvas.toDataURL("image/png");



    // Download

    const link =
    document.createElement("a");


    link.download =
    "text-meme.png";


    link.href=data;


    link.click();



    // Firebase Save

    try{


        await addDoc(
            collection(db,"memes"),
            {

                imageUrl:data,

                type:"text",

                createdAt:Date.now(),

                ownerId:auth.currentUser.uid

            }
        );


        alert(
            "Text meme downloaded and saved 🚀"
        );


    }


    catch(error){

        alert(error.message);

    }


}




// ==========================
// LIVE PREVIEW
// ==========================

textInput.addEventListener(
    "input",
    generateTextMeme
);


fontStyle.addEventListener(
    "change",
    generateTextMeme
);


fontSize.addEventListener(
    "input",
    generateTextMeme
);


textColor.addEventListener(
    "input",
    generateTextMeme
);


bgColor.addEventListener(
    "input",
    generateTextMeme
);



// First Preview

generateTextMeme();



// Make buttons work with onclick

document.getElementById("generateBtn")
.addEventListener(
    "click",
    generateTextMeme
);


document.getElementById("downloadBtn")
.addEventListener(
    "click",
    downloadTextMeme
);