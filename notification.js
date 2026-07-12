import { db, auth } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// ==========================
// CANVAS
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

window.generateTextMeme = function(){


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle = bgColor.value;


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    ctx.fillStyle = textColor.value;


    ctx.font =
    `bold ${fontSize.value}px ${fontStyle.value}`;


    ctx.textAlign="center";

    ctx.textBaseline="middle";


    let text =
    textInput.value || "Your Meme Text";


    ctx.fillText(

        text,

        canvas.width/2,

        canvas.height/2

    );


};





// ==========================
// DOWNLOAD + FIREBASE SAVE
// ==========================


window.downloadTextMeme = function(){


    generateTextMeme();



    const data =
    canvas.toDataURL();



    // Download

    const link =
    document.createElement("a");


    link.download =
    "text-meme.png";


    link.href=data;


    link.click();




    // Save Firebase


    try{


        addDoc(collection(db,"memes"),{


            imageUrl:data,


            type:"text",


            createdAt:Date.now(),


            ownerId:auth.currentUser.uid


        });


        alert("Text meme saved successfully 🚀");


    }


    catch(error){

        alert(error.message);

    }


};




// Live Preview

[
textInput,
fontStyle,
fontSize,
textColor,
bgColor

].forEach(item=>{


    item.addEventListener(
        "input",
        generateTextMeme
    );


});



generateTextMeme();