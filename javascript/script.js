let cart = [];
let totalPrice = 0;

// Add item to cart
function addToCart(item, price) {
    cart.push({ item, price });
    totalPrice += price;
    updateCartCount();
}

// Update the cart count UI
function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

// Show cart and items
function showCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Clear cart display
    cart.forEach((item, index) => {
        cartItems.innerHTML += `<div>${item.item} - ${item.price} SEK</div>`;
    });

    document.getElementById("total-price").textContent = `${totalPrice} SEK`;
    document.getElementById("cart").style.display = "block";
}

// Place order: integrates with API
async function placeOrder() {
    if (cart.length === 0) {
        alert("Din kundvagn är tom!");
        return;
    }

    const orderResponse = await placeOrderAPI(cart); // Call API
    if (orderResponse) {
        alert("Order bekräftad!");
        displayOrderStatus(orderResponse);
    }
}

// Display order confirmation status
function displayOrderStatus(response) {
    document.getElementById("cart").style.display = "none";
    document.getElementById("status").style.display = "block";
    document.getElementById("status").innerHTML = `
        <h2>DINA WONTONS TILLAGAS!</h2>
        <p>ETA: 5 MIN</p>
        <p>Order ID: ${response.orderId || "12345"}</p>
        <button onclick="resetOrder()">GÖR EN NY BESTÄLLNING</button>
    `;
}

// Reset order and cart
function resetOrder() {
    cart = [];
    totalPrice = 0;
    updateCartCount();
    document.getElementById("status").style.display = "none";
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

// Smooth scroll to menu
function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}
