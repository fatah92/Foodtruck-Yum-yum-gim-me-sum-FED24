import { fetchApiKey, createTenant } from './api.js';
import { renderMenu } from './menu.js';

async function initializeApp() {
    console.log("Startar upp appen...");

    // 1. Hämta API-nyckel
    await fetchApiKey();

    // 2. Skapa Tenant med ditt namn
    await createTenant("Abdul Fatah");

    // 3. Rendera menyn
    await renderMenu();
}

initializeApp();
