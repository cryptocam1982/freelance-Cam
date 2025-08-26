/* jshint esversion: 6 */
/* jshint browser: true */
/* global alert */

document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // Contact form
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get("name");
            const email = formData.get("email");
            const project = formData.get("project");

            if (!name || !email || !project) return alert("Please fill in all fields.");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) return alert("Please enter a valid email address.");

            const submitBtn = this.querySelector(".submit-btn");
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent. I'll get back to you within 24 hours.`);
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Header scroll effect
    const header = document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                header.style.background = "rgba(255, 255, 255, 0.98)";
                header.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
            } else {
                header.style.background = "rgba(255, 255, 255, 0.95)";
                header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("mobile-open");
            this.textContent = navMenu.classList.contains("mobile-open") ? "✕" : "☰";
        });
    }

    // Close mobile menu when link clicked
    document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            if (navMenu && mobileMenuBtn && window.innerWidth <= 768) {
                navMenu.classList.remove("mobile-open");
                mobileMenuBtn.textContent = "☰";
            }
        });
    });

    // Service card hover effect
    document.querySelectorAll(".service-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px) scale(1.02)";
            card.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)";
            card.style.transition = "all 0.3s ease";
        });
    });

    // Init scroll animations
    document.querySelectorAll(".service-card, .stat, .contact-item").forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease";
    });

    // Form field focus effect
    document.querySelectorAll(".form-group input, .form-group textarea").forEach((field) => {
        field.addEventListener("focus", () => {
            field.parentElement.style.transform = "scale(1.02)";
            field.parentElement.style.transition = "transform 0.2s ease";
        });
        field.addEventListener("blur", () => {
            field.parentElement.style.transform = "scale(1)";
        });
    });

    // Fade in page
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.opacity = "1";
        document.body.style.transition = "opacity 0.3s ease-in-out";
    }, 100);
});

// Animate on scroll
function animateOnScroll() {
    document.querySelectorAll(".service-card, .stat, .contact-item").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 150) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
}

// Stats animation
function animateStats() {
    document.querySelectorAll(".stat-number").forEach((stat) => {
        const originalText = stat.textContent;
        const target = parseInt(originalText.replace(/[^\d]/g, ""));
        if (isNaN(target) || target === 0) return;

        const suffix = originalText.replace(/[\d]/g, "");
        let current = 0,
            increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            if (suffix.includes("M")) stat.textContent = (current / 1000000).toFixed(1) + "M+";
            else if (suffix.includes("+")) stat.textContent = Math.floor(current) + "+";
            else stat.textContent = Math.floor(current);
        }, 20);
    });
}

// Trigger stats when visible
let statsAnimated = false;
function checkStatsVisibility() {
    const about = document.getElementById("about");
    if (!about) return;
    const rect = about.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0 && !statsAnimated) {
        animateStats();
        statsAnimated = true;
    }
}

// Global listeners
window.addEventListener("scroll", () => {
    animateOnScroll();
    checkStatsVisibility();
});

// Escape key closes menu
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const navMenu = document.querySelector(".nav-menu");
        const mobileBtn = document.querySelector(".mobile-menu-btn");
        if (navMenu && mobileBtn && navMenu.classList.contains("mobile-open")) {
            navMenu.classList.remove("mobile-open");
            mobileBtn.textContent = "☰";
        }
    }
});
