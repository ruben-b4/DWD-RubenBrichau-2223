// KWHEyRCioJhTUxBjmJ2OYUg4DBMDeJDdqZYJfyQB	curl "https://freesound.org/apiv2/search/text/?query=piano&token=YOUR_API_KEY"
// https://freesound.org/apiv2/oauth2/authorize/?client_id=YOUR_CLIENT_ID&response_type=code&state=xyz

const API_KEY = 'KWHEyRCioJhTUxBjmJ2OYUg4DBMDeJDdqZYJfyQB';
const NUM_RESULTS = 5;
const searchInput = document.getElementById('search-input');
const sound = document.querySelector('.soundwrapper');
const favorites = document.querySelector('.favorites');

const bgcolor = `rgb(${+Math.random() * 100}, ${+Math.random() * 100}, ${+Math.random() * 100})`; // RVDL Buttons toledo

let activeButtons = [];

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

        const resultCount = data.results.length;
        const resultCountText = `Aantal resultaten: ${resultCount}`;
        const resultCountParagraph = document.querySelector('.searchBar p');
        resultCountParagraph.innerHTML = resultCountText;

        sound.innerHTML = '';

        // maakt button en paragraph
        data.results.slice(0, NUM_RESULTS).forEach(result => {
            const button = document.createElement('button');
            const par = document.createElement('p');

            par.innerHTML = result.name;
            par.setAttribute('class', 'paragraphs');
            button.setAttribute('class', 'sound__button');
            button.style.backgroundColor = bgcolor;
            button.style.opacity = '0.5';

            const heartButton = document.createElement('button');
            heartButton.classList.add('heart__button');

            let isPlaying = false;
            let audio = null;
            const opacity = 0.5;

            // inspiratie genomen https://www.youtube.com/watch?v=xu3y6lKD6kY&t=576s
            button.addEventListener('click', () => {
                if (activeButtons.length > 0) {
                    // stop alle actieve audio
                    activeButtons.forEach((activeButton) => {
                        activeButton.audio.pause();
                        activeButton.isPlaying = false;
                        activeButton.button.style.opacity = 0.5;
                        console.log('test stop ander');
                    });
                    activeButtons = [];
                }
                if (audio && isPlaying) {
                    // stop deze audio
                    audio.pause();
                    isPlaying = false;

                    // verwijderd deze knop uit activebuttons, inspiratie: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript 
                    const index = activeButtons.indexOf(button);
                    if (index > -1) {
                        activeButtons.splice(index, 1); // splice zal wegdoen active
                        button.style.opacity = opacity;
                    }
                } else {
                    // start audio
                    isPlaying = true;
                    audio = new Audio(result.previews['preview-lq-mp3']);
                    audio.play();

                    // voegt button toe aan activebuttons
                    activeButtons.push({
                        button,
                        audio,
                        isPlaying,
                    });
                    button.style.opacity = '1';
                }
            });
            
            favorites.appendChild(heartButton);
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