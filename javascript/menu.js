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

// Function to render menu items in DOM
export function renderMenu(items) {
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.innerHTML = ''; // Clear previous content

    // Filter and render categories
    const wontonItems = items.filter(item => item.type === 'wonton');
    const dipsItems = items.filter(item => item.type === 'dip');
    const drinkItems = items.filter(item => item.type === 'drink');

    renderCategory(menuContainer, 'WONTONS', wontonItems);
    renderSelectableSection(menuContainer, 'DIPSÅS', dipsItems, 19);
    renderSelectableSection(menuContainer, 'DRICKA', drinkItems, 19);
}

// Function to render Wonton items
function renderCategory(container, categoryName, items) {
    const categoryTitle = document.createElement('h2');
    categoryTitle.innerText = categoryName;
    container.appendChild(categoryTitle);

    items.forEach(item => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("dish-container");
        itemContainer.innerHTML = `
            <h3>${item.name} ............................<span>${item.price} SEK</span></h3>
            <p>${item.ingredients.join(", ")}</p>
        `;
        itemContainer.addEventListener("click", () => addToCart(item));
        container.appendChild(itemContainer);
    });
}

// Generalized function for selectable button sections (Dipsås and Dricka)
function renderSelectableSection(container, categoryName, items, price) {
    const section = document.createElement('div');
    section.classList.add('selectable-section');

    const title = document.createElement('h2');
    title.innerHTML = `${categoryName} <span>${price} SEK</span>`;
    section.appendChild(title);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('selectable-container');

    items.forEach(item => {
        const button = document.createElement('button');
        button.textContent = item.name;
        button.classList.add('selectable-button');

        // Event listener to toggle active class and add to cart
        button.addEventListener('click', () => {
            buttonContainer.querySelectorAll('.selectable-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            addToCart(item);
        });

        buttonContainer.appendChild(button);
    });

    section.appendChild(buttonContainer);
    container.appendChild(section);
}
