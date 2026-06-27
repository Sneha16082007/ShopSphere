// ==========================================
// ShopSphere Search Utility
// ==========================================

function searchProducts(products,keyword){

    keyword = keyword.toLowerCase();

    return products.filter(product=>{

        return product.name.toLowerCase().includes(keyword)

        ||

        product.description.toLowerCase().includes(keyword);

    });

}

// Category

function categoryFilter(products,category){

    if(category==="all"){

        return products;

    }

    return products.filter(product=>

        product.category===category

    );

}

// Sorting

function sortProductsByPrice(products,sort){

    let data=[...products];

    if(sort==="low"){

        data.sort((a,b)=>a.price-b.price);

    }

    if(sort==="high"){

        data.sort((a,b)=>b.price-a.price);

    }

    return data;

}