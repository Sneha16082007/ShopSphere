// ======================================
// ShopSphere - cart.js
// ======================================

const cartContainer = document.getElementById("cart-items");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});

// Load Products
async function loadCart() {

    try {

        const response = await fetch("data/products.json");
        products = await response.json();

        displayCart();

    } catch (error) {

        console.error(error);

    }

}

// Display Cart
function displayCart() {

    cartContainer.innerHTML = "";

    if(cart.length === 0){

        cartContainer.innerHTML = `
        <div class="empty-cart">

            <h2>Your Cart is Empty 🛒</h2>

            <p>Start shopping now!</p>

        </div>
        `;

        subtotal.innerText="₹0";
        total.innerText="₹99";

        return;
    }

    let sub = 0;

    cart.forEach((id,index)=>{

        const product = products.find(p=>p.id===id);

        if(!product) return;

        sub += product.price;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <img src="${product.image}" alt="${product.name}">

            <div class="cart-details">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="cart-price">

                    ₹${product.price}

                </div>

            </div>

            <button
            class="remove-btn"
            onclick="removeItem(${index})">

            Remove

            </button>

        </div>

        `;

    });

    subtotal.innerText=`₹${sub}`;

    total.innerText=`₹${sub+99}`;

}

// Remove Product
function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

// Checkout
const checkout=document.getElementById("checkoutBtn");

checkout.addEventListener("click",()=>{

    if(cart.length===0){

        alert("Your cart is empty.");

        return;

    }

    alert("Thank you for shopping with ShopSphere!");

    localStorage.removeItem("cart");

    cart=[];

    displayCart();

});