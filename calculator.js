//global variable declaration
let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let resetScreen = false;

//selecting html elements
const lastOperationScreen = document.getElementById('lastOperation');
const currentOperationScreen = document.getElementById('currentOperation');
const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator');
const equalsButton = document.getElementById('=');
const pointButton = document.getElementById('.');
const clearButton = document.getElementById('clearButton');
const deleteButton = document.getElementById('deleteButton');

//adding event listeners
clearButton.addEventListener('click', clearCalculation);
deleteButton.addEventListener('click', deleteLastNumber);
numberButtons.forEach(button => button.addEventListener('click', convertNumber));
operatorButtons.forEach(button => button.addEventListener('click', convertOperator));
equalsButton.addEventListener('click', calculateResult);
pointButton.addEventListener('click', addPoint);
window.addEventListener('keydown', keyboardInput)

//below function takes the event.target.id and uses this value (string) to update the current operation
function convertNumber(e) {
    updateCurrentOperation(Number(e.target.id));
}

//below function takes the event.target.id of the click event listener and uses this value as input for the assignOperator function
function convertOperator(e) {
    assignOperator(e.target.id);
}

//below function takes the keyboard input event and assigns an action to each button
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

//below function updates the current operation screen. Standard it displays a 0, which gets removed when entering digits
function updateCurrentOperation(number) {
    if (lastOperationScreen.textContent === '0' || resetScreen === true) removeZero();
    if (currentOperationScreen.textContent === '0') { 
        removeZero();
    }
    resetScreen = false;
    currentOperationScreen.textContent += number;
}

//when an operator is triggered, it stores the first number and operator in a variable
//the first number and operator are displayed in the upper screen zone
//if the firstNumber variable is already holding a value, a temporary result is calculated and displayed in the upper and lower screen zone
function assignOperator(operator) {
    if(currentOperator !== '') calculateResult();
    firstNumber = Number(currentOperationScreen.textContent);
    currentOperator = operator;
    lastOperationScreen.textContent = `${firstNumber} ${currentOperator}`;
    resetScreen = true;
    }

//when the equals button is pressed, the last entered number is stored in the second number variable, and the operation is performed
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

//resets bottom zone of the calculator screen
function removeZero() {
    currentOperationScreen.textContent = '';
}

//resets variables and calculator screen, ready for a new calculation from scratch
function clearCalculation () {
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    resetScreen = false;
}

function defaultZero() {
    currentOperationScreen.textContent = '0';
} 

//deletes one digit at a time of the lastly entered number
function deleteLastNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.slice(0, -1);
}

//below function adds a point if no point is already entered
function addPoint() {
    if (currentOperationScreen.textContent === '') defaultZero();
    if (currentOperationScreen.textContent.includes('.')) return;
    currentOperationScreen.textContent += '.';
}

//round the number 3 digits after point
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

//performs the actual operation
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
