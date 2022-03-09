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
const pointButton = document.getElementById('.');
const clearButton = document.getElementById('clearButton');
const deleteButton = document.getElementById('deleteButton');

clearButton.addEventListener('click', clearCalculation);
deleteButton.addEventListener('click', deleteLastNumber);
numberButtons.forEach(button => button.addEventListener('click', convertNumber));
operatorButtons.forEach(button => button.addEventListener('click', convertOperator));
equalsButton.addEventListener('click', calculateResult);
pointButton.addEventListener('click', addPoint);
window.addEventListener('keydown', keyboardInput)

//another option is to add a data attribute to each button, so click event listeners and keydown event listeners can be treated the same

//below function takes the event.target.id and uses this value (string) to update the current operation
function convertNumber(e) {
    updateCurrentOperation(Number(e.target.id));
}

//below function takes the event.target.id of the click event listener and uses this value as input for the assignOperator function
function convertOperator(e) {
    assignOperator(e.target.id);
}

function keyboardInput (e) {
    if(e.key >= 0 && e.key <= 9)  updateCurrentOperation(e.key);
    if(e.key === '.') addPoint();
    if(e.key === 'Enter') calculateResult();
    if(e.key === 'Backspace') deleteLastNumber();
    if(e.key === 'Escape') clearCalculation();
    if(e.key === '+' || e.key === '-' || e.key === '*') assignOperator(e.key);
    if(e.key === '/') assignOperator('÷')
    console.log(`Current key: ${e.key}`);
}


function updateCurrentOperation(number) {
    if (lastOperationScreen.textContent === '0' || resetScreen === true) removeZero();
    if (currentOperationScreen.textContent === '0') { 
        removeZero();
    }
    resetScreen = false;
    currentOperationScreen.textContent += number;
}

function assignOperator(operator) {
    if(currentOperator !== '') calculateResult();
    firstNumber = Number(currentOperationScreen.textContent);
    currentOperator = operator;
    lastOperationScreen.textContent = `${firstNumber} ${currentOperator}`;
    resetScreen = true;
    }

function calculateResult() {
    if (currentOperator === '' || resetScreen) return;
    if (currentOperator === '÷' && currentOperationScreen.textContent === '0') {
        currentOperationScreen.textContent = 'Error. Unable to divide by 0.';
        return;
    }
    secondNumber = Number(currentOperationScreen.textContent);
    currentOperationScreen.textContent = roundNumber(operate(currentOperator, firstNumber, secondNumber));
    lastOperationScreen.textContent = `${firstNumber}` + ' ' + currentOperator + ' ' + `${secondNumber}`;
    resetScreen = true;
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

function addPoint() {
    if (currentOperationScreen.textContent === '') defaultZero();
    if (currentOperationScreen.textContent.includes('.')) return;
    currentOperationScreen.textContent += '.';
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
            return divide(a,b);
    }
}