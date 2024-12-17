import menuData from '../menu.json' assert { type: 'json' };
import { addToCart } from './cart.js';

// Rendera menyn
export function renderMenu() {
    const menuContainer = document.querySelector(".menu-container");
    menuContainer.innerHTML = ""; // Töm container innan ny render

    menuData.items.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");

        menuItem.innerHTML = `
            <h3>${item.name} <span>${item.price} SEK</span></h3>
            <p>${item.description}</p>
            <p><strong>Ingredienser:</strong> ${item.ingredients.join(", ")}</p>
            <button onclick="addToCart('${item.name}', ${item.price})">+</button>
        `;
        menuContainer.appendChild(menuItem);
    });
}
