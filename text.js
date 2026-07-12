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


// Controls

const textInput = document.getElementById("memeText");
const fontStyle = document.getElementById("fontStyle");
const fontSize = document.getElementById("fontSize");
const textColor = document.getElementById("textColor");
const bgColor = document.getElementById("bgColor");



// ==========================
// GENERATE MEME
// ==========================

function generateTextMeme(){


    // Clear canvas

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



    // Text Style

    ctx.fillStyle = textColor.value;


    ctx.font =
    `bold ${fontSize.value}px ${fontStyle.value}`;


    ctx.textAlign = "center";

    ctx.textBaseline = "middle";



    // Text wrapping

    let text = textInput.value;


    if(text.trim()===""){

        text="Your Meme Text";

    }



    let words = text.split(" ");

    let line="";

    let lines=[];



    words.forEach(word=>{


        let testLine = line + word + " ";


        if(
            ctx.measureText(testLine).width > 420
        ){

            lines.push(line);

            line = word + " ";

        }

        else{

            line = testLine;

        }


    });



    lines.push(line);



    // Draw Text


    let startY =
    canvas.height/2 -
    ((lines.length-1)*40);



    lines.forEach((line,index)=>{


        ctx.fillText(

            line,

            canvas.width/2,

            startY + (index*80)

        );


    });



}





// ==========================
// DOWNLOAD + AUTO SAVE
// ==========================


function downloadTextMeme(){


    // Generate before download

    generateTextMeme();



    let image =
    canvas.toDataURL("image/png");



    // Download


    let link=document.createElement("a");


    link.download =
    "UK_Text_Meme.png";


    link.href=image;


    link.click();



    // AUTO SAVE TO SAVED MEMES


    let savedMemes =
    JSON.parse(
        localStorage.getItem("savedMemes")
    ) || [];



    savedMemes.push(image);



    localStorage.setItem(
        "savedMemes",
        JSON.stringify(savedMemes)
    );



    alert("Meme downloaded and saved ❤️");


}





// ==========================
// LIVE PREVIEW
// ==========================


[
    textInput,
    fontStyle,
    fontSize,
    textColor,
    bgColor

].forEach(control=>{


    control.addEventListener(
        "input",
        generateTextMeme
    );


});




// First preview

generateTextMeme();