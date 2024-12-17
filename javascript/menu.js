// menu.js

const apiUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu';
const apiKey = 'din-giltiga-nyckel'; // Ersätt med din API-nyckel

// Hämta menyn från API:et
export async function fetchMenu() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "x-zocom": apiKey,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP fel: ${response.status}`);
        }

        const data = await response.json();
        console.log('Meny hämtad:', data);
        return data; // Returnera menydatan
    } catch (error) {
        console.error('Fel vid hämtning av menyn:', error.message);
        return null; // Returnera null vid fel
    }
}
