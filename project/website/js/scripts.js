// KWHEyRCioJhTUxBjmJ2OYUg4DBMDeJDdqZYJfyQB	curl "https://freesound.org/apiv2/search/text/?query=piano&token=YOUR_API_KEY"
// https://freesound.org/apiv2/oauth2/authorize/?client_id=YOUR_CLIENT_ID&response_type=code&state=xyz

const API_KEY = 'KWHEyRCioJhTUxBjmJ2OYUg4DBMDeJDdqZYJfyQB';
const NUM_RESULTS = 5;
const searchInput = document.getElementById('search-input');
const soundButton = document.querySelector('.sound__background');
const sound = document.querySelector('.soundwrapper');

const bgcolor = `rgb(${+Math.random() * 100}, ${+Math.random() * 100}, ${+Math.random() * 100})`;
soundButton.style.backgroundColor = bgcolor;

searchInput.addEventListener('keydown', (event) => {
    // reageren wnr enter 
    if (event.key == 'Enter') {
        search();
    }
});

async function search() {
    try {
        // haal zoekterm op
        const searchTerm = searchInput.value;

        // maak GET request naar API met zoekterm
        const response = await fetch(`https://freesound.org/apiv2/search/text/?query=${searchTerm}&token=${API_KEY}&fields=id,name,previews,duration,images`);
        const data = await response.json();

        // verwijder alle knoppen en par uit sound
        sound.innerHTML = '';

        // maakt knop en par
        data.results.slice(0, NUM_RESULTS).forEach(result => {
            const button = document.createElement('button');
            const par = document.createElement('p');

            par.innerHTML = result.name;
            par.setAttribute('class', 'paragraphs');
            button.setAttribute('class', 'sound__button');
            button.style.backgroundColor = bgcolor;

            button.addEventListener('click', () => {
                // speelt het geluid af
                const audio = new Audio(result.previews['preview-lq-mp3']);
                audio.play();
            });
            button.appendChild(par);
            sound.appendChild(button);
        });
    } catch (error) {
        console.error(error);
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Er is een fout opgetreden bij het ophalen van de geluidseffecten.';
        errorMessage.style.display = 'block';
    }
}