const API_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
let apiKey = "";

// Funktion för att hämta API-nyckel
async function fetchAPIKey() {
    try {
        // Skapa ett POST request
        const response = await fetch(`${API_URL}/keys`, {
            method: "POST", // Vi använder POST-metoden
        });

        // Kontrollera om svaret från servern är OK (status 200)
        if (!response.ok) {
            throw new Error(`Failed to fetch API key. Status: ${response.status}`);
        }

        // Läsa JSON-svaret från servern
        const data = await response.json();
        apiKey = data.key; // Hämta nyckeln från JSON-objektet

        // Spara API-nyckeln i localStorage för framtida användning
        localStorage.setItem("apiKey", apiKey);
        console.log("Fetched API Key:", apiKey);
    } catch (error) {
        console.error("Error fetching API key:", error.message);
    }
}

// Funktion för att kontrollera om nyckeln redan finns
async function initializeAPIKey() {
    // Hämta nyckeln från localStorage
    apiKey = localStorage.getItem("apiKey");

    if (!apiKey) {
        console.log("Ingen sparad nyckel hittades. Hämtar ny nyckel...");
        await fetchAPIKey(); // Om ingen nyckel finns, hämta en ny
    } else {
        console.log("Använder sparad API-nyckel:", apiKey);
    }
}

// Starta processen för att hämta nyckeln
initializeAPIKey();
