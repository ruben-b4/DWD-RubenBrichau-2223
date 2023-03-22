const categorySelect = document.querySelector('#categorie');
const quoteBlock = document.querySelector('#quote');
const select = document.querySelector('#categorie');

async function getChuckNorrisJoke(category) {
    const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);

    // zet om naar json, inspiratie genomen van https://www.youtube.com/watch?
    const jokes = await response.json();
    const joke = jokes.value;
    return joke;
}

async function getChuckNorrisCategory() {
    const response = await fetch('https://api.chucknorris.io/jokes/categories');
    const categories = await response.json();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;

        // voert code in html
        select.appendChild(option);
    });
}

categorySelect.addEventListener('change', async() => {
    const category = categorySelect.value;
    if (category === '-1') {
        quoteBlock.textContent = '';
    } else {
        const quote = await getChuckNorrisJoke(category);
        quoteBlock.textContent = quote;
    }
});

// https://codepen.io/MarkBoots/pen/gOvObMp 
getChuckNorrisCategory();