// ==========================================
// ShopSphere Router
// ==========================================

function goToHome(){

    window.location.href="index.html";

}

function goToProducts(){

    window.location.href="products.html";

}

function goToCart(){

    window.location.href="cart.html";

}

function goToWishlist(){

    window.location.href="wishlist.html";

}

function goToAbout(){

    window.location.href="about.html";

}

function goToContact(){

    window.location.href="contact.html";

}

function goToProduct(id){

    localStorage.setItem("selectedProduct",id);

    window.location.href="product.html";

}