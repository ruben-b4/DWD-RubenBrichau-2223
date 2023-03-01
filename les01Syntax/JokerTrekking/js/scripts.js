const max = 9999;
const min = 1000;
const aantalSpelers = 10000;
// eslint-disable-next-line no-magic-numbers
const Winst = [0, 2.5, 10, 100, 500];

const getrokkenGetal = (Math.floor(Math.random() * (max - min)) + min);  
const spelerGetallen = genereerGetal(aantalSpelers, min, max);
const spelerJuist = resultaten(getrokkenGetal, spelerGetallen);
const gemWinst = gemiddeldeWinst(spelerJuist, Winst);

// getrokken speler moet tussen 1 - 9999 liggen
function genereerGetal(aantal, min, max) {
    const getallen = [];
    for (let i = 0; i < aantal; i++) {
        getallen[i] = Math.floor(Math.random() * (max - min)) + min;
    }
    return getallen;
}

function resultaten(getrokkenGetal, spelerGetallen) {
    const juiste = [0, 0, 0, 0, 0];
    for (let i = 0; i < spelerGetallen.length; i++) {
        if (spelerGetallen[i] == getrokkenGetal) {
            juiste[4]++;
        } else if (spelerGetallen[i] % 1000 == getrokkenGetal % 1000) {
            juiste[3]++;
        } else if (spelerGetallen[i] % 100 == getrokkenGetal % 100) {
            juiste[2]++;
        } else if (spelerGetallen[i] % 10 == getrokkenGetal % 10) {
            juiste[1]++;
        } else juiste[0]++;
    }
    return juiste;
}

function gemiddeldeWinst(winst, juiste) {
    let totalewinst = 0;
    for (let i = 0; i < juiste.length; i++) {
        totalewinst += juiste[i] * winst[i];
    }
    return totalewinst / juiste.length;
}

console.log('%c// trekking', 'color: purple');
console.log(`%cgetrokken getal: ${getrokkenGetal}`, 'color: yellow');
console.log('%c\n// gokken', 'color: purple');
console.log(`aantal iteraties: ${aantalSpelers}`);
console.log('%c\n// resultaten', 'color: purple');
console.log(`0 juist: ${spelerJuist[0]}
1 juist: ${spelerJuist[1]}
2 juist: ${spelerJuist[2]}
3 juist: ${spelerJuist[3]}
4 juist: ${spelerJuist[4]} `);
console.log(`%cgemiddelde winst: ${gemWinst}`, 'background-color: grey; padding: 12px 12px; color: ');