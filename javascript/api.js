const API_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
let apiKey = "";

// Function to fetch API key
async function fetchAPIKey() {
    try {
        const response = await fetch(`${API_URL}/keys`, { method: "POST" });
        if (!response.ok) throw new Error("Failed to fetch API key.");

        const data = await response.json();
        apiKey = data.key;
        localStorage.setItem("apiKey", apiKey); // Store for reuse
        console.log("API Key fetched:", apiKey);
    } catch (error) {
        console.error("Error fetching API key:", error.message);
    }
}

// Initialize API key (fetch or retrieve from localStorage)
function initializeAPI() {
    const savedKey = localStorage.getItem("apiKey");
    if (savedKey) {
        apiKey = savedKey;
        console.log("Using saved API key:", apiKey);
    } else {
        fetchAPIKey();
    }
}

// Function to send an order to the API
async function placeOrderAPI(cart) {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            },
            body: JSON.stringify({ order: cart }),
        });

        if (!response.ok) throw new Error("Failed to place order.");
        const result = await response.json();
        console.log("Order placed successfully:", result);
        return result;
    } catch (error) {
        console.error("Error placing order:", error.message);
    }
}

// Initialize the API on load
initializeAPI();
