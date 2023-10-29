// Wait for the Dom to finish loading before running the game 
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }
    runGame("addition");
})
/*
in JavaScript, if you declare a variable using let within a function, it has block scope, 
meaning it is only accessible within the block (the {}) where it is defined. 
However, due to a phenomenon called "closure," the gameType variable is accessible in the runGame() function 
because it is captured within the function that defines the event handler.

Here's how it works:
When the event handler function is defined:

button.addEventListener("click", function() {
    if (this.getAttribute("data-type") === "Submit") {
        alert("You clicked submit");
    } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
    }
});

1. The gameType variable is declared using let within the event handler's function. 
This makes it a local variable for that function.

2. The runGame() function is called within this event handler function and is passed the gameType variable as an argument:
                                runGame(gameType);
The runGame() function receives the gameType argument and uses it. 
Since the gameType variable is passed as an argument, it's available within the runGame() function. 
This is possible because of the closure property in JavaScript, 
which allows inner functions to access variables from their containing (outer) functions, 
even after the outer function has finished executing.
So, in this case, the gameType variable is accessible in the runGame() function 
because it was captured within the closure of the event handler function. 
This is why it still works despite being defined in a different function.                                

*/ 

/**
 * The main game "loop", called when the script is first loaded 
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    // Creates two random numbers between 1 and 25

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {

        displayAdditionQuestion(num1, num2);

    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2)
    } else {

        alert(`Unlnown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;

    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */

function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */

function calculateCorrectAnswer() {

    operand1 = parseInt(document.getElementById("operand1").innerText);
    operand2 = parseInt(document.getElementById("operand2").innerText);
    operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];

    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unimplimented operator ${operator}`);
        throw (`Unimplimented operator ${operator}. Aborting!`);
    }
}


/**
 * Gets the current score from the DOM and increments it by 1
 */

function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operande1, operand2) {
    document.getElementById("operand1").textContent = operande1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {
   document.getElementById("operand1").textContent = operand1 > operand2 ? operand1: operand2;
   document.getElementById("operand2").textContent = operand1 > operand2 ? operand2: operand1;
   document.getElementById("operator").textContent = "-";  
}

function displayMultiplyQuestion(operande1, operand2) {
    document.getElementById("operand1").textContent = operande1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion() {
    
}