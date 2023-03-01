const frm = document.querySelector('#frmOrder');
const inpEmail = frm.querySelector('#inpEmail');
const msgEmail = frm.querySelector('#msgEmail');
const selMeasure = frm.querySelector('#selMeasure');
const msgMeasure = frm.querySelector('#msgMeasure');
const lblmessage = document.querySelector('#lblMessage');
const thumbLinks = document.querySelectorAll('#model a');
const figShoe = document.querySelector('#figShoe');
const imgShoe = figShoe.querySelector('img');
const textShoe = figShoe.querySelector('span');

frm.setAttribute('novalidate', 'novalidate');

frm.addEventListener('submit', function(e) {
    e.preventDefault();
    let numErrors = 0;
    let totalePrijs = 54.99; // startprijs elke aankoop -> schoen
    const gekozenModel = document.querySelector('figcaption span').textContent;
    const gekozenMaat = document.querySelector('#selMeasure').value;
    const gekozenAccessoire = document.querySelectorAll('input[type="checkbox"]:checked');
    const accessoires = [];

    // clear error messages
    msgEmail.innerHTML = '';
    msgMeasure.innerHTML = '';
    lblmessage.innerHTML = '';

    // check empty email
    if (inpEmail.value == '') {
        msgEmail.innerHTML = 'email mag niet leeg zijn';
        numErrors++;
    }

    // check empty selector
    if (selMeasure.value == 0) {
        msgMeasure.innerHTML = 'email mag niet leeg zijn';
        numErrors++;
    }

    if (numErrors == 0) {
        gekozenAccessoire.forEach(cb => {
            const prijs = parseFloat(cb.value);
            totalePrijs += prijs;
            accessoires.push(cb.name);
        });
        lblmessage.textContent = `Je keuze: ${gekozenModel} maat ${gekozenMaat}, ${accessoires.join(', ')} (totaalprijs: € ${totalePrijs} )`;
    }
});

thumbLinks.forEach(lnk => {
    lnk.addEventListener('click', function(e) {
        e.preventDefault();
        imgShoe.src = lnk.href;
        textShoe.innerHTML = lnk.textContent;
        document.querySelector('#model .selected').classList.remove('selected');
        lnk.classList.add('selected');
    });
});