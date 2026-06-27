// =========================================
// ShopSphere Wishlist
// =========================================

const wishlistContainer =
document.getElementById("wishlist-container");

let products = [];

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

// =========================================
// Initialize
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    loadWishlist();

});

// =========================================
// Load Wishlist
// =========================================

async function loadWishlist(){

    try{

        const response =
        await fetch("products.json");

        products =
        await response.json();

        displayWishlist();

    }

    catch(error){

        console.error(error);

    }

}

// =========================================
// Display Wishlist
// =========================================

function displayWishlist(){

    wishlistContainer.innerHTML="";

    if(wishlist.length===0){

        wishlistContainer.innerHTML=`

        <div class="empty">

            <h2>❤️ Your Wishlist is Empty</h2>

            <p>Add products to your wishlist.</p>

        </div>

        `;

        return;

    }

    wishlist.forEach(id=>{

        const product =
        products.find(p=>p.id===id);

        if(!product) return;

        wishlistContainer.innerHTML += `

<div class="wishlist-card">

<img
src="${product.image}"
alt="${product.name}">

<div class="wishlist-info">

<h3>${product.name}</h3>

<p>${product.description}</p>

<div class="wishlist-price">

₹${product.price}

</div>

<div class="wishlist-buttons">

<button
class="move-btn"
onclick="moveToCart(${product.id})">

<i class="fa-solid fa-cart-shopping"></i>

Move to Cart

</button>

<button
class="remove-btn"
onclick="removeWishlist(${product.id})">

<i class="fa-solid fa-trash"></i>

Remove

</button>

</div>

</div>

</div>

`;

    });

}

// =========================================
// Move To Cart
// =========================================

function moveToCart(id){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(id);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    removeWishlist(id,false);

    showToast("🛒 Moved to Cart");

}

// =========================================
// Remove Wishlist
// =========================================

function removeWishlist(id,toast=true){

    wishlist =
    wishlist.filter(item=>item!==id);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    displayWishlist();

    if(toast){

        showToast("❌ Removed");

    }

}

// =========================================
// Toast
// =========================================

function showToast(message){

    const toast =
    document.createElement("div");

    toast.innerHTML = message;

    toast.style.position="fixed";
    toast.style.top="30px";
    toast.style.right="30px";
    toast.style.padding="15px 25px";
    toast.style.background=
    "linear-gradient(135deg,#6C63FF,#00E5FF)";
    toast.style.color="white";
    toast.style.borderRadius="12px";
    toast.style.fontWeight="600";
    toast.style.opacity="0";
    toast.style.transition=".35s";
    toast.style.zIndex="9999";

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.style.opacity="1";

    },100);

    setTimeout(()=>{

        toast.style.opacity="0";

        setTimeout(()=>{

            toast.remove();

        },400);

    },2500);

}
