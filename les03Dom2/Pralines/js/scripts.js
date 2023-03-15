const figures = document.querySelectorAll('figure');

figures.forEach(figure => {
    figure.addEventListener('click', e => {
        e.preventDefault();
        figures.forEach(fig => fig.classList.remove('active'));
        figure.classList.add('active');
        updateEigenschappen(figure);
    });
});

function updateEigenschappen(figure) {
    const name = figure.querySelector('img').alt;
    const calories = figure.dataset.calorieën;
    const description = figure.dataset.beschrijving;
    document.querySelector('#inpNaam').textContent = name;
    document.querySelector('#inpCalorien').textContent = calories;
    document.querySelector('#inpBeschrijving').textContent = description;
}