import { fetchMenu } from './api.js';
import { addToCart } from './cart.js';

// Rendera menyn dynamiskt
export async function renderMenu() {
    const menuContainer = document.querySelector(".menu-container");
    menuContainer.innerHTML = ""; // Töm container innan ny render

    try {
        const menuData = await fetchMenu(); // Hämta menydata från API
        if (menuData && menuData.items) {
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
        } else {
            menuContainer.innerHTML = "<p>Menyn kunde inte hämtas.</p>";
        }
    } catch (error) {
        console.error("Fel vid rendering av meny:", error);
        menuContainer.innerHTML = "<p>Ett fel inträffade vid hämtning av menyn.</p>";
    }
}
