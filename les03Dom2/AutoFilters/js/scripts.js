const img = document.querySelector('#van');
const filterNormaal = document.querySelector('#filter-normal');
const filterGray = document.querySelector('#filter-gray');
const filterSepia = document.querySelector('#filter-sepia');
const filterHue = document.querySelector('#filter-hue');
const filterBlur = document.querySelector('#filter-blur');
const slider = document.querySelector('#slider1');
const sliderVal = document.querySelector('#slider1-val');

// click voor elke filter
filterNormaal.addEventListener('click', (e) => {
    e.preventDefault();
    removeFilters();
    img.classList.add('filter-normal');
    filterNormaal.classList.add('active');
});

filterGray.addEventListener('click', (e) => {
    e.preventDefault();
    removeFilters();
    img.classList.add('filter-gray');
    filterGray.classList.add('active');
});

filterSepia.addEventListener('click', (e) => {
    e.preventDefault();
    removeFilters();
    img.classList.add('filter-sepia');
    filterSepia.classList.add('active');
});

filterHue.addEventListener('click', (e) => {
    e.preventDefault();
    removeFilters();
    img.classList.add('filter-hue');
    filterHue.classList.add('active');
});

filterBlur.addEventListener('click', (e) => {
    e.preventDefault();
    removeFilters();
    img.classList.add('filter-blur');
    filterBlur.classList.add('active');
});

// verwijderen filters
function removeFilters() {
    img.classList.remove('filter-normal', 'filter-gray', 'filter-sepia', 'filter-hue', 'filter-blur');
    filterNormaal.classList.remove('active');
    filterGray.classList.remove('active');
    filterSepia.classList.remove('active');
    filterHue.classList.remove('active');
    filterBlur.classList.remove('active');
}

// slider
slider.addEventListener('input', () => {
    const opacity = slider.value;
    img.style.opacity = opacity;
    sliderVal.textContent = `${Math.round(opacity * 100)}%`;
});
