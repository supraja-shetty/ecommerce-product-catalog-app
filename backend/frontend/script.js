const API = "http://127.0.0.1:5000";

let allProducts = [];
let currentProducts = [];

// 🛒 Cart Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("count").innerText = cart.length;
}

// 📦 Load Products
async function loadProducts() {
    let res = await fetch(`${API}/products`);
    allProducts = await res.json();
    currentProducts = [...allProducts];
    displayProducts(currentProducts);
}

// 🖥 Display Products
function displayProducts(products) {
    let container = document.getElementById("products");
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "<h2>No products found 😢</h2>";
        return;
    }

    products.forEach(p => {
        container.innerHTML += `
        <div class="card">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p class="price">₹${p.price}</p>
            <button class="view-btn" onclick="viewProduct(${p.id})">View</button>
            <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
        `;
    });
}

// 👁 View Product
function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

// 🛒 Add to Cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to Cart ✅");
}

// ❤️ Wishlist
function addToWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist ❤️");
}

// 🔍 Search
function searchProduct() {
    let q = document.getElementById("search").value;

    fetch(`${API}/search?q=${q}`)
    .then(res => res.json())
    .then(data => {
        currentProducts = data;
        displayProducts(data);
    });
}

// 📂 Filter Category
function filterCategory(category) {
    if (!category) {
        currentProducts = [...allProducts];
        return displayProducts(currentProducts);
    }

    fetch(`${API}/products/category/${category}`)
    .then(res => res.json())
    .then(data => {
        currentProducts = data;
        displayProducts(data);
    });
}

// 🔽 SORT (FIXED)
function sortProducts(type) {
    let sorted = [...currentProducts];

    if (type === "low") {
        sorted.sort((a, b) => a.price - b.price);
    } else if (type === "high") {
        sorted.sort((a, b) => b.price - a.price);
    }

    displayProducts(sorted);
}

// 💳 Checkout
function checkout() {
    alert("Payment Successful ✅ (Mock)");
    localStorage.removeItem("cart");
    location.reload();
}

// 🚀 Init
updateCartCount();
loadProducts();