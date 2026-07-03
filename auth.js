
import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


// ===============================
// SHOW LOGIN / SIGNUP PAGES
// ===============================

 
window.showSignup = function () {
    document.getElementById("loginPage").classList.remove("active");
    document.getElementById("signupPage").classList.add("active");
};

window.showLogin = function () {
    document.getElementById("signupPage").classList.remove("active");
    document.getElementById("loginPage").classList.add("active");
};


// ===============================
// SIGN UP
// ===============================

window.signupUser = async function () {

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Account Created Successfully 🎉");

        showLogin();

    }

    catch (error) {

        alert(error.message);

    }

};


// ===============================
// LOGIN
// ===============================

window.loginUser = async function () {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

       alert("Login Successful 🎉");

document.getElementById("loginPage").classList.remove("active");

document.getElementById("signupPage").classList.remove("active");

document.getElementById("home").classList.add("active");
    }

    catch (error) {

        alert(error.message);

    }

};


window.logoutuser = async function () {

    

    try {

        await signOut(auth);

        alert("Logged Out Successfully 👋");

        document.getElementById("home").classList.remove("active");
        document.getElementById("signupPage").classList.remove("active");
        document.getElementById("loginPage").classList.add("active");

    }

    catch(error){

        alert(error.message);

    }


    };

    