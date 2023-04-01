const prompt = require('prompt-sync')();


const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 2,
    D: 1
}

// -------Deposite some money---------
const deposit = () => {

    while(true) {
    const amount = prompt('Enter deposite amount: ')
    const numberDepositAmount = parseFloat(amount)

    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0)
    {
        console.log('Invalild deposite, try again')
    }else {
        return numberDepositAmount
    }
    }
    
}




// -------Determine number of lines to bet on ---------

const line = () => {
    while(true) {
        const numberOfLines = prompt("Enter number of lines you want to bet on (1-3): ")

        const lineAmount = parseFloat(numberOfLines)
    
        if(isNaN(lineAmount) || lineAmount <= 0 || lineAmount > 3) {
            console.log("Invalid bet, please try again")
        } else {
            return lineAmount
        }
    }
}





// -------Collect a bet amount---------


const getBet = (balance, lines) => {
    while(true) { 
        
    const amount = prompt('Enter the bet amount per line: ') 

    const betAmountNumber = parseFloat(amount)

    const totalBet = betAmountNumber * lines

    if(isNaN(totalBet) || totalBet<=0 || totalBet> balance)
    {
        console.log("Invalid bet amount, please enter a valid amount to bet")
    }

    else {
        return totalBet
    }
}
}

//-------Spin the slot machine---------
const spin = () => {
    let symbols = []
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol)
        }
    }
    const reels = []
    for (let i = 0; i < COLS; i++) {
        reels.push([])
        const reelSymbols = [...symbols]
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * (reelSymbols.length))
            reels[i].push(reelSymbols[randomIndex])
            reelSymbols.splice(randomIndex, 1)
        }

    }
    return reels
}


const transpose = (reels) => {
    const rows = []

    for (let i = 0; i < COLS; i++) {
        rows.push([])
        for (let j = 0; j < ROWS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows
}


const printRows = (rows) => {
    for (const row of rows) {
        let rowString = ''
        for (const [i, value] of row.entries()) {
            rowString += value

            if (i !== rows.length - 1) {
                rowString += ' | '
            }
        }
        console.log(rowString)
    }
}

// -------Check if user won ---------

const getWinnings = (rows, bettingAmount, numberOfLines) => {
    let winnings = 0;

    for (let row = 0; row < numberOfLines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bettingAmount * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
}


const game = () => {
    let balance = deposit();
    while (true) {
        console.log("YOUR CURRENT BALANCE IS $" + balance)
        const numberOfLines = line()
        const bettingAmount = getBet(balance, numberOfLines)
        balance -= bettingAmount * numberOfLines
        const reels = spin();
        const rows = transpose(reels)
        printRows(rows)
        const winnings = getWinnings(rows, bettingAmount, numberOfLines)
        balance += winnings
        console.log("You won " + "$" + winnings + ". Congrats")

        if (balance <= 0) {
            console.log('you ran out of money')
            break;
        }
        const playAgain = prompt('Do you want to plat again (y/n)?')

        if (playAgain != 'y') break;
    }
}

game()





