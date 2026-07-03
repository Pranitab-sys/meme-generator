import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* =========================
   AUTH STATE CONTROL (VERY IMPORTANT)
========================= */

onAuthStateChanged(auth, (user) => {

    if (user) {

        document.getElementById("loginPage").classList.remove("active");

        document.getElementById("home").style.display = "flex";

    } else {

        document.getElementById("home").style.display = "none";

        document.getElementById("loginPage").classList.add("active");

    }

});

/* =========================
   PAGE SWITCHER (GLOBAL FIX)
========================= */

window.showPage = function (id) {

    document.querySelectorAll(".page").forEach(page => {
        page.style.display = "none";
    });

    const el = document.getElementById(id);
    if (el) el.style.display = "block";
};

/* =========================
   SIGNUP
========================= */

window.signupUser = async function () {

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!email || !password) {
        alert("Fill all fields");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        alert("Account Created 🎉");

        showPage("home");

    } catch (err) {
        alert(err.message);
    }
};

/* =========================
   LOGIN
========================= */

window.loginUser = async function () {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Enter email & password");
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);

        alert("Login Successful 🎉");

        showPage("home");

    } catch (err) {
        alert(err.message);
    }
};

/* =========================
   LOGOUT
========================= */

window.logoutuser = async function () {

    try {
        await signOut(auth);
        showPage("loginPage");
    } catch (err) {
        alert(err.message);
    }
};

/* =========================
   NAV HELPERS
========================= */

window.showSignup = function () {
    showPage("signupPage");
};

window.showLogin = function () {
    showPage("loginPage");
};

window.goHome = function () {
    showPage("home");
};

window.openPage = function(id){

    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("active");
    });

    const target = document.getElementById(id);

    if(target){
        target.classList.add("active");
    }

    if(id === "savedPage"){
        loadSavedMemes();
    }

};