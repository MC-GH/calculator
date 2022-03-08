let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let resetScreen = false;

//select all html elements
const lastOperationScreen = document.getElementById('lastOperation');
const currentOperationScreen = document.getElementById('currentOperation');
const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator');
const equalsButton = document.getElementById('=');
const pointButton = document.getElementById('0');
const clearButton = document.getElementById('clearButton');
const deleteButton = document.getElementById('deleteButton');

clearButton.addEventListener('click', clearCalculation);
deleteButton.addEventListener('click', deleteLastNumber);
numberButtons.forEach(button => button.addEventListener('click', updateCurrentOperation));
operatorButtons.forEach(button => button.addEventListener('click', assignOperator));
equalsButton.addEventListener('click', calculateResult);



function updateCurrentOperation(e) {
    if (lastOperationScreen.textContent === '0' || resetScreen === true) removeZero();
    if (currentOperationScreen.textContent === '0') { 
        removeZero();
    }
    resetScreen = false;
    currentOperationScreen.textContent += e.target.id;
    console.log(e.target.id);
}

function assignOperator(e) {
    if(currentOperator !== '') calculateResult();
    firstNumber = currentOperationScreen.textContent;
    currentOperator = e.target.id;
    lastOperationScreen.textContent = `${firstNumber} ${currentOperator}`;
    resetScreen = true;
    }

function calculateResult() {
    if (currentOperator === '' || resetScreen) return;
    if (currentOperator === '÷' && currentOperationScreen.textContent === '0') {
        currentOperationScreen.textContent = 'Error. Unable to divide by 0.';
        return;
    }
    secondNumber = currentOperationScreen.textContent;
    let finalResult = roundNumber(operate(currentOperator, parseInt(firstNumber), parseInt(secondNumber)));
    currentOperationScreen.textContent = finalResult;
    lastOperationScreen.textContent = parseInt(`${firstNumber}`) + ' ' + currentOperator + ' ' + parseInt(`${secondNumber}`);
}

function removeZero() {
    currentOperationScreen.textContent = '';
}

function clearCalculation () {
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    resetScreen = false;
}

function defaultZero() {
    currentOperationScreen.textContent = 0;
} 

function deleteLastNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.slice(0, -1);
}

//if 1 character = display 0;
    if (currentOperationScreen.textContent === '') () => defaultZero();

//change above function, not working correctly anymore due to change in other code

function roundNumber (number) {
    let roundedNumber = Math.round(number * 1000) / 1000;
    return roundedNumber;
}

function add (a,b) {
return a + b;
}

function subtract (a,b) {
    return a - b;
}

function multiply (a,b) {
    return a * b;
}

function divide (a,b) {
    return a / b;
}

function operate (operator, a, b) {
    switch(operator) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '÷':
            // if (b === 0) return "Error";
            return divide(a,b);
    }
}