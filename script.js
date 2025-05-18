// get quote from API
async function getQuote() {
    // Fetch a random quote from the Forismatic API
    // Use a proxy server to avoid CORS issues
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        // Fetch the quote from the API
        // Use the proxy server to avoid CORS issues
        const response = await fetch(proxyUrl + apiUrl);
        // Check if the response is ok (status code 200)
        const data = await response.json();
        // Check if the data is valid
        console.log(data);
    } catch (error) {
        getQuote(); // Try again if there is an error
        console.log('Error, no quote', error);
    }
}

// On load, get a new quote
getQuote();