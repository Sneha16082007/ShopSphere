// =========================================
// ShopSphere Product Details
// =========================================

let products = [];
let currentProduct = null;

// Elements

const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");

const relatedContainer =
document.getElementById("relatedProducts");

const quantityInput =
document.getElementById("quantity");

const plusBtn =
document.getElementById("plusBtn");

const minusBtn =
document.getElementById("minusBtn");

const cartBtn =
document.getElementById("addCartBtn");

const wishlistBtn =
document.getElementById("wishlistBtn");

// =========================================
// Initialize
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    loadProduct();

    plusBtn.addEventListener("click", increaseQuantity);

    minusBtn.addEventListener("click", decreaseQuantity);

    cartBtn.addEventListener("click", addToCart);

    wishlistBtn.addEventListener("click", addToWishlist);

});

// =========================================
// Load Product
// =========================================

async function loadProduct(){

    try{

        const response =
        await fetch("products.json");

        products =
        await response.json();

        const selectedId =
        Number(localStorage.getItem("selectedProduct")) || 1;

        currentProduct =
        products.find(product=>product.id===selectedId);

        if(!currentProduct){

            currentProduct = products[0];

        }

        displayProduct();

        loadRelatedProducts();

    }

    catch(error){

        console.error(error);

    }

}

// =========================================
// Display Product
// =========================================

function displayProduct(){

    productImage.src =
    currentProduct.image;

    productImage.alt =
    currentProduct.name;

    productName.textContent =
    currentProduct.name;

    productPrice.textContent =
    `₹${currentProduct.price}`;

    productDescription.textContent =
    currentProduct.description;

}

// =========================================
// Quantity
// =========================================

function increaseQuantity(){

    quantityInput.value =
    Number(quantityInput.value)+1;

}

function decreaseQuantity(){

    if(Number(quantityInput.value)>1){

        quantityInput.value =
        Number(quantityInput.value)-1;

    }

}
// =========================================
// Add To Cart
// =========================================

function addToCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const quantity = Number(quantityInput.value);

    for(let i=0;i<quantity;i++){

        cart.push(currentProduct.id);

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    showToast("🛒 Product added to cart!");

}

// =========================================
// Add To Wishlist
// =========================================

function addToWishlist(){

    let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

    if(!wishlist.includes(currentProduct.id)){

        wishlist.push(currentProduct.id);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        showToast("❤️ Added to Wishlist!");

    }

    else{

        showToast("❤️ Already in Wishlist!");

    }

}

// =========================================
// Related Products
// =========================================

function loadRelatedProducts(){

    relatedContainer.innerHTML = "";

    const related = products
        .filter(product => product.id !== currentProduct.id)
        .slice(0,4);

    related.forEach(product=>{

        relatedContainer.innerHTML += `

<div class="related-card"
onclick="openRelatedProduct(${product.id})">

<img src="${product.image}"
alt="${product.name}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

</div>

`;

    });

}

// =========================================
// Open Related Product
// =========================================

function openRelatedProduct(id){

    localStorage.setItem("selectedProduct",id);

    location.reload();

}

// =========================================
// Toast
// =========================================

function showToast(message){

    const toast=document.createElement("div");

    toast.innerHTML=message;

    toast.style.position="fixed";
    toast.style.top="25px";
    toast.style.right="25px";
    toast.style.background=
    "linear-gradient(135deg,#6C63FF,#00E5FF)";
    toast.style.color="white";
    toast.style.padding="15px 25px";
    toast.style.borderRadius="12px";
    toast.style.fontWeight="600";
    toast.style.boxShadow=
    "0 15px 35px rgba(0,0,0,.25)";
    toast.style.opacity="0";
    toast.style.transition=".35s";
    toast.style.zIndex="99999";

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.style.opacity="1";

    },100);

    setTimeout(()=>{

        toast.style.opacity="0";

        setTimeout(()=>{

            toast.remove();

        },350);

    },2500);

}
