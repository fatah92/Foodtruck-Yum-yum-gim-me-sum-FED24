export let cart = [];
export let totalPrice = 0;

// Lägg till produkt i varukorgen
export function addToCart(item, price) {
    cart.push({ item, price });
    totalPrice += price;
    updateCartCount();
}

// Uppdatera räkningen av varor i korgen
export function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

// Visa kundvagnen
export function showCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Rensa tidigare visning

    cart.forEach(item => {
        cartItems.innerHTML += `<div>${item.item} - ${item.price} SEK</div>`;
    });

    document.getElementById("total-price").textContent = `${totalPrice} SEK`;
    document.getElementById("cart").style.display = "block";
}

// Återställ varukorg
export function resetOrder() {
    cart = [];
    totalPrice = 0;
    updateCartCount();
    document.getElementById("status").style.display = "none";
}
