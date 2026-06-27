// ==========================================
// ShopSphere - app.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initTheme();
    initStickyNavbar();
    initScrollReveal();
    initBackToTop();
    initNewsletter();
    loadFeaturedProducts();

});

// ==========================================
// Dark Mode
// ==========================================

function initTheme() {

    const toggle = document.getElementById("theme-toggle");

    if (!toggle) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    toggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        if (document.body.classList.contains("light-theme")) {

            localStorage.setItem("theme", "light");
            toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "dark");
            toggle.innerHTML = '<i class="fa-solid fa-moon"></i>';

        }

    });

}

// ==========================================
// Sticky Navbar
// ==========================================

function initStickyNavbar() {

    const header = document.querySelector("header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.background = "rgba(5,8,22,0.95)";
            header.style.boxShadow = "0 8px 25px rgba(0,0,0,.25)";

        } else {

            header.style.background = "rgba(8,10,30,.35)";
            header.style.boxShadow = "none";

        }

    });

}

// ==========================================
// Scroll Reveal Animation
// ==========================================

function initScrollReveal() {

    const sections = document.querySelectorAll(
        ".hero, .categories, .featured, .why-us, .stats, .newsletter"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {
        threshold: 0.2
    });

    sections.forEach(section => {

        section.style.opacity = "0";
        section.style.transform = "translateY(40px)";
        section.style.transition = "all .8s ease";

        observer.observe(section);

    });

}

// ==========================================
// Back To Top
// ==========================================

function initBackToTop() {

    const button = document.createElement("button");

    button.innerHTML = "↑";

    button.id = "topBtn";

    document.body.appendChild(button);

    Object.assign(button.style, {
        position: "fixed",
        right: "25px",
        bottom: "25px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        fontSize: "20px",
        background: "#6C63FF",
        color: "#fff",
        display: "none",
        zIndex: "9999"
    });

    window.addEventListener("scroll", () => {

        button.style.display = window.scrollY > 300 ? "block" : "none";

    });

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// ==========================================
// Newsletter
// ==========================================

function initNewsletter() {

    const button = document.querySelector(".newsletter button");

    const input = document.querySelector(".newsletter input");

    if (!button || !input) return;

    button.addEventListener("click", () => {

        if (input.value.trim() === "") {

            showToast("Please enter your email.");

            return;

        }

        showToast("Subscribed successfully!");

        input.value = "";

    });

}

// ==========================================
// Featured Products (Placeholder)
// ==========================================

async function loadFeaturedProducts() {

    const container = document.getElementById("featured-products");

    if (!container) return;

    try {

        const response = await fetch("products.json");

        const products = await response.json();

        const featured = products.slice(0, 4);

        container.innerHTML = featured.map(product => `

            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p>${product.category}</p>

                    <div class="price">₹${product.price}</div>

                    <a href="#" class="buy-btn">
                        View Details
                    </a>

                </div>

            </div>

        `).join("");

    } catch (error) {

        container.innerHTML = "<p>Unable to load products.</p>";

        console.error(error);

    }

}

// ==========================================
// Toast Notification
// ==========================================

function showToast(message) {

    const toast = document.createElement("div");

    toast.textContent = message;

    Object.assign(toast.style, {

        position: "fixed",
        top: "30px",
        right: "30px",
        background: "#6C63FF",
        color: "#fff",
        padding: "15px 25px",
        borderRadius: "10px",
        fontWeight: "600",
        zIndex: "10000",
        opacity: "0",
        transition: "all .3s ease"

    });

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "1";

    }, 100);

    setTimeout(() => {

        toast.style.opacity = "0";

        setTimeout(() => toast.remove(), 300);

    }, 2500);

}
