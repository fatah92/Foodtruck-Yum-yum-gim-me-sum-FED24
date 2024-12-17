import { renderMenu } from './menu.js';
import { showCart, resetOrder } from './cart.js';

// Körs när sidan laddas
document.addEventListener("DOMContentLoaded", () => {
    renderMenu(); // Ladda menyn
});

// Smooth scroll till meny
window.scrollToMenu = () => {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
};

// Gör showCart tillgänglig globalt för onclick
window.showCart = showCart;

// Gör resetOrder tillgänglig globalt för onclick
window.resetOrder = resetOrder;
