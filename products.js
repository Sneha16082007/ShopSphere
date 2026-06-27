// ======================================
// ShopSphere - products.js
// ======================================

let allProducts = [];

// DOM Elements
const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortProducts = document.getElementById("sortProducts");

// ======================================
// Initialize
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    fetchProducts();

    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);
    sortProducts.addEventListener("change", filterProducts);

});

// ======================================
// Fetch Products
// ======================================

async function fetchProducts() {

    try {

        const response = await fetch("data/products.json");

        allProducts = await response.json();

        displayProducts(allProducts);

    }

    catch (error) {

        console.error(error);

        productsContainer.innerHTML = `

        <h2 class="no-products">

            Unable to load products.

        </h2>

        `;

    }

}

// ======================================
// Display Products
// ======================================

function displayProducts(products) {

    if (products.length === 0) {

        productsContainer.innerHTML = `

        <h2 class="no-products">

            No Products Found

        </h2>

        `;

        return;

    }

    productsContainer.innerHTML = "";

    products.forEach(product => {

        productsContainer.innerHTML += `

<div class="product-card">

    <img src="${product.image}" alt="${product.name}">

    <div class="product-info">

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="price">

            ₹${product.price}

        </div>

        <div class="rating">

            ⭐ ${product.rating}

        </div>

        <div class="card-buttons">

            <button
            class="cart-btn"
            onclick="addToCart(${product.id})">

            <i class="fa-solid fa-cart-shopping"></i>

            Cart

            </button>

            <button
            class="wishlist-btn"
            onclick="addToWishlist(${product.id})">

            <i class="fa-regular fa-heart"></i>

            Wishlist

            </button>

            <button
            class="details-btn"
            onclick="openProduct(${product.id})">

            <i class="fa-solid fa-eye"></i>

            View

            </button>

        </div>

    </div>

</div>

`;

    });

}

// ======================================
// Search Filter Sort
// ======================================

function filterProducts() {

    let filtered = [...allProducts];

    const keyword = searchInput.value.toLowerCase();

    filtered = filtered.filter(product =>

        product.name.toLowerCase().includes(keyword)

    );

    const category = categoryFilter.value;

    if (category !== "all") {

        filtered = filtered.filter(product =>

            product.category === category

        );

    }

    const sort = sortProducts.value;

    if (sort === "low") {

        filtered.sort((a, b) =>

            a.price - b.price

        );

    }

    if (sort === "high") {

        filtered.sort((a, b) =>

            b.price - a.price

        );

    }

    displayProducts(filtered);

}
// ======================================
// Add To Cart
// ======================================

function addToCart(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(id);

    localStorage.setItem("cart", JSON.stringify(cart));

    showToast("🛒 Product added to cart!");

}

// ======================================
// Add To Wishlist
// ======================================

function addToWishlist(id) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlist.includes(id)) {

        wishlist.push(id);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        showToast("❤️ Added to wishlist!");

    } else {

        showToast("❤️ Already in wishlist!");

    }

}

// ======================================
// Open Product Details
// ======================================

function openProduct(id) {

    localStorage.setItem("selectedProduct", id);

    window.location.href = "product.html";

}

// ======================================
// Toast Notification
// ======================================

function showToast(message) {

    const toast = document.createElement("div");

    toast.innerHTML = message;

    toast.style.position = "fixed";
    toast.style.top = "25px";
    toast.style.right = "25px";
    toast.style.padding = "16px 22px";
    toast.style.background = "linear-gradient(135deg,#6C63FF,#00E5FF)";
    toast.style.color = "#fff";
    toast.style.fontWeight = "600";
    toast.style.borderRadius = "12px";
    toast.style.boxShadow = "0 12px 25px rgba(0,0,0,.25)";
    toast.style.zIndex = "99999";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-20px)";
    toast.style.transition = ".35s";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";

    }, 100);

    setTimeout(() => {

        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 2500);

}