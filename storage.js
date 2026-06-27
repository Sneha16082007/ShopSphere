// ==========================================
// ShopSphere Storage Utility
// ==========================================

// Get Data
function getStorage(key){

    return JSON.parse(localStorage.getItem(key)) || [];

}

// Save Data
function saveStorage(key,data){

    localStorage.setItem(key,JSON.stringify(data));

}

// Cart

function getCart(){

    return getStorage("cart");

}

function saveCart(cart){

    saveStorage("cart",cart);

}

// Wishlist

function getWishlist(){

    return getStorage("wishlist");

}

function saveWishlist(wishlist){

    saveStorage("wishlist",wishlist);

}

// Selected Product

function getSelectedProduct(){

    return Number(localStorage.getItem("selectedProduct")) || 1;

}

function saveSelectedProduct(id){

    localStorage.setItem("selectedProduct",id);

}