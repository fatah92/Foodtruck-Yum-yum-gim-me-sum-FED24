import { addToCart } from './cart.js';

// Function to fetch menu items
export async function fetchMenu() {
    const apiUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu';
    const apiKey = 'yum-7BTxHCyHhzIME5TI'; // Replace with your valid API key

    try {
        const response = await fetch(apiUrl, {
            headers: {
                "x-zocom": apiKey,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        console.log('Menu fetched:', data);
        return data.items; // Return the array of menu items
    } catch (error) {
        console.error('Error fetching menu:', error.message);
        return null;
    }
}

// Function to create and render menu items
export function renderMenu(items) {
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.innerHTML = ''; // Clear previous content

    items.forEach(item => {
        // Create menu card
        const wontonContainer = document.createElement("div");
        const wontonTitleContainer = document.createElement("div");
        const wontonTitle = document.createElement("h3");
        const wontonPrice = document.createElement("h3");
        const dotBox = document.createElement("div");
        const wontonIngredients = document.createElement("p");

        // Add attributes and classes
        wontonContainer.setAttribute("role", "button");
        wontonContainer.setAttribute("tabindex", "0");
        wontonContainer.classList.add("dish-container");
        wontonTitleContainer.classList.add("title-container");
        dotBox.classList.add("dot-box");

        // Set content
        wontonTitle.innerText = item.name.toUpperCase();
        wontonPrice.innerText = `${item.price} SEK`;
        wontonIngredients.innerText = item.ingredients.join(", ");

        // Append elements together
        wontonContainer.append(wontonTitleContainer, wontonIngredients);
        wontonTitleContainer.append(wontonTitle, dotBox, wontonPrice);

        // Add to cart on click
        wontonContainer.addEventListener("click", () => addToCart(item));

        // Append to menu container
        menuContainer.appendChild(wontonContainer);
    });
}
