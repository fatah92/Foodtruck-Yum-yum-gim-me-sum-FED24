export function showReceipt(orderId) {
    const receiptContainer = document.querySelector('#kvitto-container');
    receiptContainer.innerHTML = `
        <h2>DINA WONTONS TILLAGAS!</h2>
        <img src="images/food-pack.jpg" alt="Food Package" />
        <p>ETA 5 MIN</p>
        <p>Order ID: ${orderId}</p>
        <button id="view-receipt">SE KVITTO</button>
        <button id="new-order">GÖR EN NY BESTÄLLNING</button>
    `;

    receiptContainer.style.display = 'block';

    document.querySelector('#new-order').addEventListener('click', () => {
        clearCart();
        receiptContainer.style.display = 'none';
    });
}
