
console.log.outputEncoding = 'Encoding.UTF8';

// declarations
const players = ['Indra', 'Nelly', 'Ron', 'Prasha', 'Zakaria'];
const scores = [];
const NUM_DICE = 3;

// show header
console.log(`
DOBBELSTENEN
============
aantal deelnemers: ${players.length}
`);

// throw dice
for (let i = 0; i < players.length; i++) {
    const dice = [];
    for (let j = 0; j < NUM_DICE; j++) {
        dice[j] = Math.floor((Math.random() * 6) + 1);
    }
    scores[i] = getTotal(dice);
    console.log(`${players[i]} gooit ${scores[i]} punten`);
    console.log(`%c${diceToString(dice)}`, 'font-size: 30px;');
}

// show winner
console.log('\n WINNAAR: ');
console.log(`%c${getWinner(scores, players)}`, 'background: yellow; color: black; font-size: 13px; padding: 10px; border: double 3px black');

function diceToString(dice) {
    let retval = '';
    for (const d of dice) {
        switch (d) {
            case 1: retval += '⚀ '; break;
            case 2: retval += '⚁ '; break;
            case 3: retval += '⚂ '; break;
            case 4: retval += '⚃ '; break;
            case 5: retval += '⚄ '; break;
            case 6: retval += '⚅ '; break;
            default: break;
        }
    }
    return retval;
}
function getTotal(dice) {
    let total = 0;
    for (const d of dice) {
        total += d;
    }
    return total;
}
function getWinner(totals, names) {
    let winnerIndex = 0;
    let draw = false;
    for (let i = 1; i < totals.Length; i++) {
        if (totals[i] == totals[winnerIndex]) draw = true;
        else if (totals[i] > totals[winnerIndex]) {
            winnerIndex = i;
            draw = false;
        }
    }
    return draw ? 'gelijkspel' : names[winnerIndex];
}
