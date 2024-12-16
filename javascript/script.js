let cart = [];
let totalPrice = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    totalPrice += price;
    document.getElementById('cart-count').textContent = cart.length;
}

function showCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        cartItems.innerHTML += `<div>${item.item} - ${item.price} SEK</div>`;
    });
    document.getElementById('total-price').textContent = `${totalPrice} SEK`;
    document.getElementById('cart').style.display = 'block';
}

function placeOrder() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('status').style.display = 'block';
}

function resetOrder() {
    cart = [];
    totalPrice = 0;
    document.getElementById('cart-count').textContent = '0';
    document.getElementById('status').style.display = 'none';
}

function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}
