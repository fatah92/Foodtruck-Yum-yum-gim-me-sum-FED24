const apiUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';
const tenantName = "Abdul Fatah"; // Ange ditt namn här

// Variabler för att spara API-nyckel och Tenant-ID
let apiKey = '';
let tenantId = '';

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
        const options = {
            method: 'POST',
            body: JSON.stringify({ name: name }),
            headers: {
                "Content-Type": 'application/json',
                "x-zocom": apiKey
            }
        };
        const response = await fetch(apiUrl + '/tenants', options);
        const data = await response.json();

        tenantId = data.id;
        console.log('Tenant skapad:', tenantId);
        return tenantId;
    } catch (error) {
        console.error('Fel vid skapande av Tenant:', error);
    }
}

// Funktion för att hämta menyn
export async function fetchMenu() {
    if (!apiKey || !tenantId) {
        console.error("API-nyckel och Tenant-ID krävs för att hämta menyn.");
        return;
    }
    try {
        const options = {
            method: 'GET',
            headers: {
                "x-zocom": apiKey
            }
        };
        const response = await fetch(apiUrl + '/menu', options);
        const data = await response.json();

        console.log('Menyn hämtad:', data);
        return data;
    } catch (error) {
        console.error('Fel vid hämtning av menyn:', error);
    }
}
