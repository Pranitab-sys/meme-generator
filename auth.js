```javascript
import { auth } from "../firebase.js";

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
    window.location.href = "signup.html";
};

window.showLogin = function () {
    window.location.href = "login.html";
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

        window.location.href = "index.html";

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

        window.location.href = "index.html";

    }

    catch (error) {

        alert(error.message);

    }

};


// ===============================
// AUTO LOGIN CHECK
// ===============================

onAuthStateChanged(auth, (user) => {

    const currentPage = window.location.pathname.split("/").pop();

    if (user) {

        // Already logged in
        if (
            currentPage === "login.html" ||
            currentPage === "signup.html"
        ) {

            window.location.href = "index.html";

        }

    }

    else {

        // Not logged in
        if (
            currentPage !== "login.html" &&
            currentPage !== "signup.html"
        ) {

            window.location.href = "login.html";

        }

    }

});


// ===============================
// LOGOUT
// ===============================

window.logoutuser = async function () {

    try {

        await signOut(auth);

        alert("Logged Out Successfully 👋");

        window.location.href = "login.html";

    }

    catch (error) {

        alert(error.message);

    }

};
```
