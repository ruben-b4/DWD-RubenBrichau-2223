function Main(args) {
    Console.OutputEncoding = Encoding.UTF8;

    // declarations
    Console.log(Math.random())
    const players = ["Indra", "Nelly", "Ron", "Prasha", "Zakaria"];
    const scores = [];
    const int = NUM_DICE = 3;
    // show header
    Console.WriteLine(`
DOBBELSTENEN
============
aantal deelnemers: ${players.length}
`);
    // throw dice
    for (let i = 0; i < players.length; i++) {
        const dice = [];
        for (int j = 0; j < NUM_DICE; j++) {
            dice[j] = Math.random(1, 7);
        }
        scores[i] = getTotal(dice);
        Console.log(`${players[i]} gooit ${scores[i]} punten`);
        Console.log(diceToString(dice));
    }
    // show winner
    Console.log(`${Environment.NewLine}WINNAAR: `);
    Console.ForegroundColor = ConsoleColor.Black;
    Console.BackgroundColor = ConsoleColor.Yellow;
    Console.log(`${getWinner(scores, players)}`);
    Console.ReadLine();

function diceToString(dice) {
    const retval = "";
        for(let d of dice) {
            switch (d) {
                case 1: retval += "⚀ "; break;
                case 2: retval += "⚁ "; break;
                case 3: retval += "⚂ "; break;
                case 4: retval += "⚃ "; break;
                case 5: retval += "⚄ "; break;
                case 6: retval += "⚅ "; break;
                default: break;
            }
        }
        return retval;
    }
    function getTotal(dice) {
    let total = 0;
        for(let d of dice) {
            total += d;
        }
        return total;
    }
    function getWinner(int = totals, string = names) {
    let winnerIndex = 0;
    let draw = false;
        for (let i = 1; i < totals.Length; i++) {
            if (totals[i] == totals[winnerIndex]) draw = true;
            else if (totals[i] > totals[winnerIndex]) {
                winnerIndex = i;
                draw = false;
            }
        }
        return draw ? `gelijkspel` : names[winnerIndex];
    } 
}