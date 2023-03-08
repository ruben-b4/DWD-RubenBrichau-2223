const navLinks = document.querySelectorAll('.nav__filters a');
const ViewGrid = document.querySelector('#lnkViewGrid');
const ViewList = document.querySelector('#lnkViewList');
const grid = document.querySelector('#grid');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        // verwijderen active classes + toevoegen active
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');

        const filter = link.getAttribute('data-filter');
        filteren(filter);
    });
});

function filteren(filter) {
    const fotos = document.querySelectorAll('figure');
    const aantalFotos = document.querySelector('#numFound');
    let count = 0;

    fotos.forEach(img => {
        if (filter === 'alle' || img.dataset.filters.includes(filter)) {
            img.style.display = 'block';
            count++;
        } else {
            img.style.display = 'none';
        }
    });

    aantalFotos.textContent = count;
}

ViewGrid.addEventListener('click', e => {
    e.preventDefault();

    ViewList.classList.remove('active');
    ViewGrid.classList.add('active');
    grid.classList.remove('viewList');
    grid.classList.add('viewGrid');
});

ViewList.addEventListener('click', e => {
    e.preventDefault();

    ViewGrid.classList.remove('active');
    ViewList.classList.add('active');
    grid.classList.remove('viewGrid');
    grid.classList.add('viewList');
});
