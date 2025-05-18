const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading spinner
function loading() {
    loader.hidden = false; // Show the loader
    quoteContainer.hidden = true; // Hide the quote container
}

// Hide loading spinner
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false; // Show the quote container
        loader.hidden = true; // Hide the loader
    }
}

// get quote from API
async function getQuote() {
    // Show loading spinner
    loading();
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
        authorText.innerText = data.quoteAuthor || 'Anonymous'; // If no author, set to 'Anonymous'
        quoteText.innerText = data.quoteText; // Set the quote text
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        // Hide the loading spinner
        complete();
    } catch (error) {
        getQuote(); // Try again if there is an error
    }
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    // Create a Twitter share link with the quote and author
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}%0A- ${author}`;
    // Open the Twitter share link in a new tab
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote); // Get a new quote when the button is clicked
twitterBtn.addEventListener('click', tweetQuote); // Tweet the quote when the button is clicked

// On load, get a new quote
getQuote();