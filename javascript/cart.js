let cart = [];
let totalPrice = 0;

// Function to add an item to the cart
export function addToCart(item) {
    cart.push(item);
    totalPrice += item.price;
    updateCartCount();
    console.log(`Added to cart: ${item.name} - ${item.price} SEK`);
}

// Function to update cart badge
function updateCartCount() {
    const cartCount = document.querySelector('#cart-count');
    cartCount.textContent = cart.length;
}

// Function to display the cart
export function showCart() {
    const cartItemsContainer = document.querySelector('#cart-items');
    const cartTotalContainer = document.querySelector('#total-price');

    cartItemsContainer.innerHTML = ''; // Clear previous items
    cart.forEach(item => {
        cartItemsContainer.innerHTML += `<div>${item.name} - ${item.price} SEK</div>`;
    });

    cartTotalContainer.textContent = `${totalPrice} SEK`;
    document.querySelector('#cart').style.display = 'block';
}
