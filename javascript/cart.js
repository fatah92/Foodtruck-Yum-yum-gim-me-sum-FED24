// Global variables for the cart
let cart = [];
let totalPrice = 0;

// Function to add an item to the cart
export function addToCart(item) {
    // Add the selected item to the cart array
    cart.push(item);
    totalPrice += item.price;

    // Update the UI to reflect cart changes
    updateCartCount();
    console.log(`Added to cart: ${item.name} - ${item.price} SEK`);

    // Optional: Log the current state of the cart
    console.log("Cart:", cart);
}

// Function to update the cart count badge in the UI
function updateCartCount() {
    const cartCount = document.querySelector('#cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Function to show the cart details in the UI
export function showCart() {
    const cartItemsContainer = document.querySelector('#cart-items');
    const cartTotalContainer = document.querySelector('#total-price');

    if (!cartItemsContainer || !cartTotalContainer) {
        console.error("Cart UI elements not found.");
        return;
    }

    // Clear previous cart content
    cartItemsContainer.innerHTML = '';

    // Add each cart item to the UI
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} - ${item.price} SEK</span>
            <button data-index="${index}" class="remove-item-btn">x</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update the total price in the UI
    cartTotalContainer.textContent = `${totalPrice} SEK`;

    // Add event listeners to all "remove" buttons
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            removeFromCart(index);
        });
    });

    // Show the cart section
    document.querySelector('.cart-section').style.display = 'block';
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    totalPrice -= removedItem.price;

    // Update the UI
    updateCartCount();
    showCart();
}

// Function to clear the cart and reset everything
export function clearCart() {
    cart = [];
    totalPrice = 0;

    updateCartCount();
    const cartItemsContainer = document.querySelector('#cart-items');
    const cartTotalContainer = document.querySelector('#total-price');

    if (cartItemsContainer) cartItemsContainer.innerHTML = '';
    if (cartTotalContainer) cartTotalContainer.textContent = '0 SEK';

    document.querySelector('.cart-section').style.display = 'none';
    console.log("Cart has been cleared.");
}
