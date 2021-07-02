const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');
const count = 10;
const apiKey ='';
const apiUrl = `https://api.unslash.com/photos/random/?client_id=${apiKey}&count=${count}`
let photosArray = [];

function loading() {
    loader.hidden = false;
}

function complete() {
    loader.hidden = true;
}

function displayPhotos() {
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        // put <img> inside <a>, then put both inside image-container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from API
async function getPhotos() {
    loading();
   
    try {
        const response = await fetch(apiUrl);
        photosArray = response.json();
        displayPhotos();
    } catch (error) {
        // catch errors
    }
    complete()
}

window.onload = () => getPhotos();
