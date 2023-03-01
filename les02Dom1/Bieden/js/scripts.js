const frmBieden = document.querySelector('#frmBieden');
const msgBod = document.querySelector('.msgBod');
let hoogsteBieder = '';
let hoogsteBod = 0;
frmBieden.setAttribute('novalidate', 'novalidate');

frmBieden.addEventListener('submit', function(e) {
  e.preventDefault();
  const bieder = document.querySelector('#naam').value;
  const bod = parseFloat(document.querySelector('#Bod').value);
  
  if (bod > hoogsteBod) {
    hoogsteBod = bod;
    hoogsteBieder = bieder;
    msgBod.textContent = `Gefeliciteerd! Je hebt momenteel het hoogste bod van ${hoogsteBod} euro.`;
  } else if (bod < hoogsteBod && hoogsteBod > 0) {
    msgBod.textContent = `Jammer, ${hoogsteBieder} heeft al een hoger bod van ${hoogsteBod} euro.`;
  } else {
    msgBod.textContent = 'Er is nog geen bod uitgebracht.';
}
  
  frmBieden.reset();
});
