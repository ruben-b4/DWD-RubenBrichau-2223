const slider = document.querySelector('#slider1');
const sliderval = document.querySelector('#slider1-val');
const tekst = document.querySelector('.tekst');
const kleur = document.querySelector('#favcolor');
const checkbox1 = document.querySelector('input[value="a"]');
const checkbox2 = document.querySelector('input[value="b"]');
const checkbox3 = document.querySelector('input[value="c"]');
const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const button3 = document.getElementById('btn3');

// Verander tekstgrootte op basis van schuifregelaarwaarde
slider.addEventListener('input', function() {
    sliderval.textContent = slider.value * 100 + 'px';
    tekst.style.fontSize = slider.value * 100 + 'px';
});

kleur.addEventListener('input', function() {
    tekst.style.color = kleur.value;
});

checkbox1.addEventListener('click', function() {
    tekst.classList.toggle('bold');
});

checkbox2.addEventListener('click', function() {
    tekst.classList.toggle('italic');
});

checkbox3.addEventListener('click', function() {
    tekst.classList.toggle('upper');
});

button1.addEventListener('click', function() {
    tekst.style = 'default';
    tekst.style.textShadow = '2px 6px #ff0000';
});

button2.addEventListener('click', function() {
    tekst.style = 'default';
    tekst.style.background = 'linear-gradient(to bottom, #00abeb 10%, white 30%, yellow 50%, #66cc00 70%)';
});

button3.addEventListener('click', function() {
    tekst.style = 'default';
    tekst.style.transform = 'rotate(180deg';
});

