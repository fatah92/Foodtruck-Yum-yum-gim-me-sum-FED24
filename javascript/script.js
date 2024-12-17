import { fetchMenu } from './menu.js';

// Globala variabler
let cart = [];
let totalPrice = 0;

// Starta applikationen när DOM är redo
document.addEventListener('DOMContentLoaded', async () => {
    const menuData = await fetchMenu(); // Hämta menyn från API
    if (menuData) {
        renderMenu(menuData.items); // Rendera menyn
    } else {
        displayMenuError(); // Visa felmeddelande
    }

    // Uppdatera cart-badge (initialt)
    updateCartCount();
});

// Funktion för att rendera menyn i DOM
function renderMenu(items) {
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.innerHTML = ''; // Rensa eventuell tidigare meny

    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <h3>${item.name} ............................<span>${item.price} SEK</span></h3>
           
            <button data-item="${item.name}" data-price="${item.price}">+</button>
        `;
        menuContainer.appendChild(menuItem);
    });
     //<p>${item.description}</p>

    // Lägg till event listeners för alla knappar
    const buttons = document.querySelectorAll('.menu-item button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.dataset.item;
            const itemPrice = parseFloat(button.dataset.price);
            addToCart(itemName, itemPrice);
        });
    });
}

// Funktion för att visa felmeddelande
function displayMenuError() {
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.innerHTML = `<p style="color: white; text-align: center;">Menyn kunde inte hämtas.</p>`;
}

// Funktion för att lägga till objekt i varukorgen
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    totalPrice += itemPrice;
    updateCartCount();
    console.log(`Tillagd i varukorgen: ${itemName} - ${itemPrice} SEK`);
}

// Funktion för att uppdatera varukorgsräknare
function updateCartCount() {
    const cartCount = document.querySelector('#cart-count');
    cartCount.textContent = cart.length;
}

// Funktion för att visa varukorgen
function showCart() {
    const cartItemsContainer = document.querySelector('#cart-items');
    const cartTotalContainer = document.querySelector('#total-price');

    cartItemsContainer.innerHTML = ''; // Rensa tidigare lista
    cart.forEach(item => {
        cartItemsContainer.innerHTML += `<div>${item.name} - ${item.price} SEK</div>`;
    });

    cartTotalContainer.textContent = `${totalPrice} SEK`;
    document.querySelector('.cart-section').style.display = 'block';
}
