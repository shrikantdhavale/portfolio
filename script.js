/* =========================
   PORTFOLIO SCRIPT
   Mobile menu, theme, typing, reveal, navigation, contact form
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    function setMenuOpen(open) {
        if (!menuToggle || !navbar) return;

        navbar.classList.toggle("active", open);

        menuToggle.setAttribute("aria-expanded", String(open));

        menuToggle.setAttribute(
            "aria-label",
            open ? "Close menu" : "Open menu"
        );

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !open);
            icon.classList.toggle("fa-xmark", open);
        }
    }

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {
            setMenuOpen(!navbar.classList.contains("active"));
        });

        navbar.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                setMenuOpen(false);
            });
        });

        // Close the mobile menu when Escape is pressed.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        });

        // Close the mobile menu when switching to desktop width.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 700) {
                setMenuOpen(false);
            }
        });
    }


    /* =========================
       DARK / LIGHT MODE
    ========================= */

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle?.querySelector("i");

    function updateThemeIcon() {

        if (!themeToggle || !themeIcon) return;

        const isLight = document.body.classList.contains("light-mode");

        themeIcon.classList.toggle("fa-sun", isLight);
        themeIcon.classList.toggle("fa-moon", !isLight);

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );
    }

    // Restore the previously selected theme.
    try {

        if (localStorage.getItem("portfolio-theme") === "light") {
            document.body.classList.add("light-mode");
        }

    } catch (error) {

        // The theme toggle still works if browser storage is unavailable.

    }

    updateThemeIcon();

    // Toggle between dark and light themes.
    themeToggle?.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLight = document.body.classList.contains("light-mode");

        try {

            localStorage.setItem(
                "portfolio-theme",
                isLight ? "light" : "dark"
            );

        } catch (error) {

            // Ignore storage restrictions.

        }

        updateThemeIcon();
    });


    /* =========================
       HERO TYPING EFFECT
    ========================= */

    const typingText = document.getElementById("typing-text");

    const roles = [
        "Web Developer",
        "Frontend Developer",
        "React Developer",
        "Java Learner",
        "Tech Enthusiast"
    ];

    if (typingText) {

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeRole() {

            const role = roles[roleIndex];

            if (!deleting) {

                // Add one character.
                charIndex += 1;

                typingText.textContent = role.slice(0, charIndex);

                // Pause after completing the word.
                if (charIndex >= role.length) {

                    deleting = true;

                    window.setTimeout(typeRole, 1400);

                    return;
                }

            } else {

                // Remove one character.
                charIndex -= 1;

                typingText.textContent = role.slice(0, charIndex);

                // Move to the next role.
                if (charIndex <= 0) {

                    deleting = false;

                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            window.setTimeout(
                typeRole,
                deleting ? 45 : 95
            );
        }

        typeRole();
    }


    /* =========================
       CODE CARD TYPING EFFECT
    ========================= */

    const codeDeveloper = document.getElementById("code-developer");

    if (codeDeveloper) {

        const word = "Developer";

        let index = 0;
        let clearing = false;

        function typeCode() {

            if (!clearing) {

                // Display the next character.
                codeDeveloper.textContent = word.slice(0, index + 1);

                index += 1;

                // Pause after typing the entire word.
                if (index >= word.length) {

                    clearing = true;

                    window.setTimeout(typeCode, 1300);

                    return;
                }

            } else {

                // Clear the word and start again.
                codeDeveloper.textContent = "";

                index = 0;

                clearing = false;
            }

            window.setTimeout(
                typeCode,
                clearing ? 100 : 150
            );
        }

        typeCode();
    }


    /* =========================
       SCROLL REVEAL ANIMATION
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Show everything if animations are disabled
    // or IntersectionObserver is unavailable.
    if (
        reduceMotion ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach((element) => {
            element.classList.add("show");
        });

    } else {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        // Stop observing after the element appears.
                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(
        '.navbar a[href^="#"]'
    );

    function updateActiveNavigation() {

        if (!sections.length || !navLinks.length) {
            return;
        }

        const marker = window.scrollY + 150;

        let activeId = sections[0].id;

        sections.forEach((section) => {

            if (section.offsetTop <= marker) {
                activeId = section.id;
            }
        });

        navLinks.forEach((link) => {

            const active =
                link.getAttribute("href") === `#${activeId}`;

            link.classList.toggle("active", active);

            if (active) {

                link.setAttribute("aria-current", "location");

            } else {

                link.removeAttribute("aria-current");
            }
        });
    }

    // Update navigation while scrolling.
    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    // Recalculate navigation after resizing.
    window.addEventListener(
        "resize",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =========================
       CONTACT FORM
       Uses FormSubmit AJAX endpoint.
    ========================= */

    const contactForm = document.getElementById("contact-form");

    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {

        contactForm.addEventListener("submit", async (event) => {

            // Prevent the browser from reloading the page.
            event.preventDefault();

            // Check required fields and input validity.
            if (!contactForm.reportValidity()) {
                return;
            }

            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            if (!submitButton) {
                return;
            }

            const originalButtonHTML = submitButton.innerHTML;

            const formData = new FormData(contactForm);


            /* -------------------------
               HONEYPOT SPAM PROTECTION
            ------------------------- */

            // Ignore submissions that fill the hidden bot field.
            if (
                String(formData.get("_honey") || "").trim() !== ""
            ) {

                formStatus.textContent = "Thank you.";

                contactForm.reset();

                return;
            }


            /* -------------------------
               PREPARE FORM DATA
            ------------------------- */

            formData.set(
                "_replyto",
                String(formData.get("email") || "")
            );

            formData.delete("_honey");


            /* -------------------------
               SHOW LOADING STATUS
            ------------------------- */

            formStatus.textContent = "Sending your message…";

            formStatus.classList.remove("error");

            submitButton.disabled = true;

            submitButton.innerHTML =
                'Sending… <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';


            /* -------------------------
               SEND FORM DATA
            ------------------------- */

            try {

                const response = await fetch(
                    contactForm.action,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },

                        body: JSON.stringify(
                            Object.fromEntries(formData.entries())
                        )
                    }
                );

                let result = {};

                const responseText = await response.text();

                try {

                    result = responseText
                        ? JSON.parse(responseText)
                        : {};

                } catch {

                    result = {
                        message: responseText
                    };
                }


                /* -------------------------
                   CHECK SERVER RESPONSE
                ------------------------- */

                if (
                    !response.ok ||
                    result.success === false ||
                    result.success === "false"
                ) {

                    throw new Error(
                        result.message ||
                        "The form service rejected the request."
                    );
                }


                /* -------------------------
                   SUCCESS MESSAGE
                ------------------------- */

                formStatus.textContent =
                    "Thanks! Your message was accepted. Please check your inbox if FormSubmit asks you to verify your email.";

                formStatus.classList.remove("error");

                // Clear the form after successful submission.
                contactForm.reset();

            } catch (error) {

                /* -------------------------
                   ERROR MESSAGE
                ------------------------- */

                console.error(
                    "Contact form submission failed:",
                    error
                );

                formStatus.textContent =
                    "We couldn't send your message. Please email shrikantdhavale9517@gmail.com directly.";

                formStatus.classList.add("error");

            } finally {

                /* -------------------------
                   RESTORE SUBMIT BUTTON
                ------------------------- */

                submitButton.disabled = false;

                submitButton.innerHTML = originalButtonHTML;
            }
        });
    }

});