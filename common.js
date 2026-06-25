// =========================
// COMMON FUNCTIONS
// =========================

// Back to Home
window.goHome = function () {
    window.location.href = "index.html";
};

// Logout
window.logoutuser = async function () {

    try {

        const { signOut } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js");
        const { auth } = await import("../firebase.js");

        await signOut(auth);

        window.location.href = "login.html";

    }

    catch (error) {

        alert(error.message);

    }

};

// Sidebar Active Menu

document.addEventListener("DOMContentLoaded", () => {

    const menus = document.querySelectorAll(".menu");

    menus.forEach(menu => {

        menu.addEventListener("click", () => {

            menus.forEach(m => m.classList.remove("active"));

            menu.classList.add("active");

        });

    });

});

// Card Hover Animation

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".action-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-8px) scale(1.02)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0) scale(1)";

        });

    });

});

// Welcome Button Animation

document.addEventListener("DOMContentLoaded", () => {

    const createBtn = document.querySelector(".welcome button");

    if (createBtn) {

        createBtn.addEventListener("mouseenter", () => {

            createBtn.style.transform = "scale(1.05)";

        });

        createBtn.addEventListener("mouseleave", () => {

            createBtn.style.transform = "scale(1)";

        });

    }

});

// Mobile Sidebar

window.toggleSidebar = function () {

    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {

        sidebar.classList.toggle("show");

    }

};