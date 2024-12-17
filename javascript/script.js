import { fetchMenu } from './menu.js';

document.addEventListener('DOMContentLoaded', async () => {
    const menuData = await fetchMenu();
    if (menuData) {
        renderMenu(menuData.items);
    }
});

// Renderar menyn i DOM
function renderMenu(items) {
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.innerHTML = ''; // Rensa befintligt innehåll

    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <h3>${item.name} <span>${item.price} SEK</span></h3>
            <p>${item.description}</p>
            <button data-item="${item.name}" data-price="${item.price}">+</button>
        `;
        menuContainer.appendChild(menuItem);
    });
}
