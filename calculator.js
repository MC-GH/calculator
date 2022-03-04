let firstNumber = '';
let secondNumber = '';
let currentOperator = '';

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
equalsButton.addEventListener('click', calculateFinalResult);



function updateCurrentOperation(e) {
    if (currentOperationScreen.textContent === '0') { 
        removeZero();
    }
    currentOperationScreen.textContent += e.target.id;
    console.log(e.target.id);
}

function assignOperator(e) {
    if(lastOperationScreen.textContent !== '') {
        secondNumber = currentOperationScreen.textContent;
        let result = operate(currentOperator, parseInt(firstNumber), parseInt(secondNumber));
        firstNumber = result;
        currentOperator = e.target.id;
        lastOperationScreen.textContent = `${result}` + ' ' + `${currentOperator}`;
        console.log(`operator: ${currentOperator}`);
        console.log(`result: ${result}`);
        console.log(`current operator: ${currentOperator}`);
        defaultZero();
        } else {
        firstNumber = currentOperationScreen.textContent;
        currentOperator = e.target.id;
        lastOperationScreen.textContent = firstNumber + ' ' + currentOperator;
        defaultZero();  
    }
    console.log(`New secondNumber: ${secondNumber}`);

      }

function calculateFinalResult() {
        if (lastOperationScreen.textContent === '') {
        lastOperationScreen.textContent = currentOperationScreen.textContent;
        console.log(firstNumber);
        } else {
        secondNumber = currentOperationScreen.textContent;
        let finalResult = operate(currentOperator, firstNumber, secondNumber);
        currentOperationScreen.textContent = finalResult;
        lastOperationScreen.textContent = parseInt(`${firstNumber}`) + ' ' + currentOperator + ' ' + parseInt(`${secondNumber}`);
    }
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
}

function defaultZero() {
    currentOperationScreen.textContent = 0;
} 

let currentOperation = currentOperationScreen.textContent;

function deleteLastNumber() {
    if (currentOperation === '' || currentOperation === '0') return defaultZero();
    currentOperationScreen.textContent = currentOperationScreen.textContent.slice(0, -1);
    if (currentOperation === '') return currentOperationScreen.textContent = 0;
    }
//change above function, not working correctly anymore due to change in other code

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