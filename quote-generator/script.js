
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    newQuoteBtn.hidden = true;
    twitterBtn.hidden = true;    
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
    twitterBtn.hidden = false;
    newQuoteBtn.hidden = false;
    

}

// Show new quote
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Check if the Author field is blank 
    if (quote.author == null) {
        authorText.textContent = "Unknown author";
    } else {
        authorText.textContent = quote.author;
    }

    // Check the quote length to determinate the styling
    if (quote.text.length > 50) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote");
    }

    // Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();

    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch (apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error){

    }
}

// Tweet qoute
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


window.onload = () => getQuotes()