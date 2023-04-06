// KWHEyRCioJhTUxBjmJ2OYUg4DBMDeJDdqZYJfyQB	curl "https://freesound.org/apiv2/search/text/?query=piano&token=YOUR_API_KEY"
// https://freesound.org/apiv2/oauth2/authorize/?client_id=YOUR_CLIENT_ID&response_type=code&state=xyz

const API_KEY = 'KWHEyRCioJhTUxBjmJ2OYUg4DBMDeJDdqZYJfyQB';
const NUM_RESULTS = 5;

const bgcolor = `rgb(${+Math.random() * 100}, ${+Math.random() * 100}, ${+Math.random() * 100})`;
document.querySelector('#demobutton .sound__background').style.backgroundColor = bgcolor;

const searchInput = document.getElementById('search-input');
const buttonSearch = document.getElementById('button__search');

searchInput.addEventListener('keydown', (event) => {
    // reageren wnr enter 
    if (event.key == 'Enter') {
        search();
    }
});

function search() {
    // haal zoekterm op
    const searchTerm = searchInput.value;

    // maak GET request naar API met zoekterm
    fetch(`https://freesound.org/apiv2/search/text/?query=${searchTerm}&token=${API_KEY}&fields=id,name,previewsduration,images`)
    .then(response => response.json())
        .then(data => {
            // verwijder alle knoppen uit het search element
            buttonSearch.innerHTML = '';

            // maak een knop voor elk resultaat en voeg deze toe aan het container element
            data.results.slice(0, NUM_RESULTS).forEach(result => {
                const button = document.createElement('button');
                button.innerHTML = result.name;
                button.addEventListener('click', () => {
                    // speel het geluid af
                    const audio = new Audio(result.previews['preview-lq-mp3']);
                    audio.play();
                    });
                    buttonSearch.appendChild(button);
                });
            })
            .catch(error => {
                console.error(error);
                const errorMessage = document.getElementById('error-message');
                errorMessage.textContent = 'Er is een fout opgetreden bij het ophalen van de geluidseffecten.';
                errorMessage.style.display = 'block';
              });
    }