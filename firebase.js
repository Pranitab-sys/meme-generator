// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Paste your config here
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdkf-FuxYQBQR7V9ZOcrz4dtVytKXYCzM",
  authDomain: "meme-generator-1148c.firebaseapp.com",
  projectId: "meme-generator-1148c",
  storageBucket: "meme-generator-1148c.firebasestorage.app",
  messagingSenderId: "1058530311037",
  appId: "1:1058530311037:web:666b19731d27debb97aa14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Export DB
export const db = getFirestore(app);