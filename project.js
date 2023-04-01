const prompt = require('prompt-sync')();



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



let balance = deposit();
const numberOfLines = line()
const bettingAmount = getBet(balance, numberOfLines)



