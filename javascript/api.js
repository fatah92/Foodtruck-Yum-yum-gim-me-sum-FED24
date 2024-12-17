//const apiUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';
//const tenantName = "Abdul"; // Ange ditt namn här



// Variabler för att spara API-nyckel och Tenant-ID
const apiKey = 'yum-7BTxHCyHhzIME5TI';
const tenantId = 'i46r';
const apiUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';


// Funktion för att hämta en API-nyckel
export async function fetchApiKey() {
    try {
        const options = { method: 'POST' };
        const response = await fetch(apiUrl + '/keys', options);
        const data = await response.json();

        apiKey = data.key;
        console.log('API-nyckel skapad:', apiKey);
        return apiKey;
    } catch (error) {
        console.error('Fel vid hämtning av API-nyckel:', error);
    }
}

// Funktion för att skapa en Tenant
export async function createTenant(name) {
    if (!apiKey) {
        console.error("API-nyckel saknas. Hämta API-nyckel först.");
        return;
    }
    try {
        const response = await fetch(url + "/menu", options);
        const data = await response.json()
        return data.items;
    } catch (error) {
        console.log("Fel:", response.status, error);
    }
}

async function sendOrder(cart) {
    const bodyToSend = { items: cart };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-zocom": KEY,
        },
        body: JSON.stringify(bodyToSend),
    };
    try {
        const response = await fetch(url + ID + "/orders", options);

        if (!response.ok) {
            console.error(
                `Fel vid anrop: ${response.status} ${response.statusText}`
            );
            return;
        }

        const data = await response.json();
        console.log(data);
        console.log(response.status);
        return data;
    } catch (error) {
        console.log("Fel:", error.message);
    }
}

export { sendOrder, getMenu};