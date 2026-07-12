// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Firebase Config
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

// Exports
export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);