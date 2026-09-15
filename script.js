
/*==========================
    MOBILE MENU
========================= */

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navbar.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   DARK / LIGHT MODE
========================= */

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("light-mode")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});


/* =========================
   TYPING EFFECT
========================= */

const typingText = document.getElementById("typing-text");

const roles = [
    "Web Developer",
    "Frontend Developer",
    "React Developer",
    "Java Learner",
    "Tech Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();

/* =========================
   CODE BOX DEVELOPER TYPING
========================= */

const codeDeveloper = document.getElementById("code-developer");

const codeText = "Developer";

let codeIndex = 0;

function typeCodeDeveloper() {

    if (codeIndex < codeText.length) {

        codeDeveloper.textContent +=
            codeText.charAt(codeIndex);

        codeIndex++;

        setTimeout(typeCodeDeveloper, 150);

    } else {

        // Wait after completing "developer"
        setTimeout(() => {

            // Clear the word
            codeDeveloper.textContent = "";

            // Start typing again
            codeIndex = 0;

            typeCodeDeveloper();

        }, 1500);
    }
}

typeCodeDeveloper();




/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;

        const elementTop =
            element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {

            element.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;

    alert(
        `Thank you ${name}! Your message has been received.`
    );

    contactForm.reset();

});
