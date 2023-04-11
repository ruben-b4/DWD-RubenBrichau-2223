// KWHEyRCioJhTUxBjmJ2OYUg4DBMDeJDdqZYJfyQB	curl "https://freesound.org/apiv2/search/text/?query=piano&token=YOUR_API_KEY"
// https://freesound.org/apiv2/oauth2/authorize/?client_id=YOUR_CLIENT_ID&response_type=code&state=xyz

const API_KEY = 'KWHEyRCioJhTUxBjmJ2OYUg4DBMDeJDdqZYJfyQB';
const NUM_RESULTS = 5;
const searchInput = document.getElementById('search-input');
const sound = document.querySelector('.soundwrapper');
const favorites = document.querySelector('.favorites');

const bgcolor = `rgb(${+Math.random() * 100}, ${+Math.random() * 100}, ${+Math.random() * 100})`; // RVDL Buttons toledo

let activeButtons = [];
let newActiveButtons = [];

searchInput.addEventListener('keydown', (event) => {
    // reageren klik enter
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
            const downloadButton = document.createElement('button');

            par.innerHTML = result.name;
            par.setAttribute('class', 'paragraphs');
            button.setAttribute('class', 'sound__button');
            button.style.backgroundColor = bgcolor;
            button.style.opacity = '0.5';

            const heartButton = document.createElement('button');
            heartButton.classList.add('heart__button');

            downloadButton.classList.add('download__button');
            downloadButton.innerText = 'Download';

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
                        activeButton.button.style.opacity = opacity;
                        console.log('test stop ander');
                    });
                    activeButtons = [];
                }
                if (audio && isPlaying) {
                    // stopt audio
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

            downloadButton.addEventListener('click', () => {
                const downloadLink = document.createElement('a');
                downloadLink.href = result.previews['preview-lq-mp3'];
                downloadLink.download = `${result.name}.mp3`;
                downloadLink.click();
            });
            
            favorites.appendChild(heartButton);
            button.appendChild(downloadButton);
            button.appendChild(par);
            sound.appendChild(button);

            // inspiratie https://gomakethings.com/how-to-copy-or-clone-an-element-with-vanilla-js/#:~:text=You%20call%20the%20cloneNode(),of%20it%20var%20clone%20%3D%20elem.
            heartButton.addEventListener('click', () => {
                const removeButton = document.createElement('button');
                const removeFavorites = document.querySelector('.removeFavorites');
                const dashboard = document.querySelector('.dashboard');
                const DashboardButton = dashboard.querySelectorAll('.dashboard__button');
                const currentButtonCount = DashboardButton.length;

                removeButton.classList.add('removeFavoritesButton');

                // Stopt als er 5 buttons in dashboard zitten
                if (currentButtonCount >= 5) {
                    return;
                }

                // Voegt nieuwe button toe
                let newButton;
                const buttonId = 'favorites-' + Math.random();
                do {
                    newButton = button.cloneNode(true);

                    newButton.classList.remove('sound__button');
                    newButton.classList.add('dashboard__button');

                    const buttonData = {
                        name: result.name,
                        previewUrl: result.previews['preview-lq-mp3']
                    };
                    localStorage.setItem(buttonId, JSON.stringify(buttonData)); // sla de data op met de gegenereerde identifier


                    let newIsPlaying = false;

                    // Voegt hetzelfde click event listener toe als de originele button
                    newButton.addEventListener('click', () => {
                        newButton.style.opacity = opacity;
                        if (newActiveButtons.length > 0) {
                            // stopt alle actieve audio
                            newActiveButtons.forEach((newActiveButton) => {
                                newActiveButton.audio.pause();
                                newActiveButton.newIsPlaying = false;
                                console.log('test stop ander');
                            });
                            newActiveButtons = [];
                        }
                        if (audio && newIsPlaying) {
                            // stopt deze audio
                            audio.pause();
                            newIsPlaying = false;

                            // verwijderd deze knop uit newActiveButtons, inspiratie: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript 
                            const index = newActiveButtons.indexOf(button);
                            if (index > -1) {
                                newActiveButtons.splice(index, 1); // splice zal wegdoen active
                                newButton.style.opacity = opacity;
                            }
                        } else {
                            // start audio
                            newIsPlaying = true;
                            audio = new Audio(result.previews['preview-lq-mp3']);
                            audio.play();

                            // voegt button toe aan newActiveButtons
                            newActiveButtons.push({
                                button,
                                audio,
                                newIsPlaying,
                            });
                            newButton.style.opacity = '1';
                        }
                    });
                } while (dashboard.querySelector(`.dashboard__button[data-text="${newButton.dataset.text}"]`)); // bron chatgpt

                removeButton.addEventListener('click', () => {
                    newButton.remove();
                    removeButton.remove();
                    localStorage.removeItem(buttonId);
                });

                // Voegt nieuwe button toe aan dashboard 
                dashboard.append(newButton);
                removeFavorites.append(removeButton);
            });
        });
    } catch (error) {
        console.error(error);
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Er is een fout opgetreden bij het ophalen van de geluidseffecten.';
        errorMessage.style.display = 'block';
    }
}