import { fetchMenu, renderMenu } from './menu.js';

document.addEventListener('DOMContentLoaded', async () => {
    const menuData = await fetchMenu(); // Fetch menu from API
    if (menuData) {
        renderMenu(menuData); // Render the menu dynamically
    } else {
        console.error('Failed to load menu');
        document.querySelector('.menu-container').innerHTML = '<p>Menyn kunde inte hämtas.</p>';
    }

    // Attach cart button functionality
    document.querySelector('#show-cart-btn').addEventListener('click', () => {
        import('./cart.js').then(module => module.showCart());
    });
});
