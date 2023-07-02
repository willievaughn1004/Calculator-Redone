// Variables

const inputDisplay = document.querySelector(".input");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#ac");
const backButton = document.querySelector("#back");
const equalButton = document.querySelector("#equal");
const decimalButton = document.querySelector(".decimal");
const signReverseButton = document.querySelector("#sign");

let previousNumber;
let currentOperator = "";
let operatorCheck = false;
let decimalCheck = false;
let currentNumber;

// Functions

const add = (a, b) => parseFloat(a) + parseFloat(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let operate = () => {
  if (currentNumber === 0 && currentOperator === "÷") {
    alert("You can't divide by Zero!");
    clearDisplay();
    return;
  }

  if (
    (previousNumber || previousNumber === 0) &&
    currentOperator &&
    currentNumber
  ) {
    switch (currentOperator) {
      case "+":
        return parseFloat(add(previousNumber, currentNumber).toFixed(3));
      case "-":
        return parseFloat(subtract(previousNumber, currentNumber).toFixed(3));
      case "×":
        return parseFloat(multiply(previousNumber, currentNumber).toFixed(3));
      case "÷":
        return parseFloat(divide(previousNumber, currentNumber).toFixed(3));
    }
  } else {
    return;
  }

  operatorCheck = false;
};

function updateDisplay() {
  if (!inputDisplay.textContent || operatorCheck) {
    return;
  }
  currentNumber = operate();
  inputDisplay.textContent = currentNumber;
  previousNumber = undefined;
}

function displayNumber() {
  if (!currentNumber) {
    currentNumber = this.textContent;
  } else {
    currentNumber += this.textContent;
  }

  inputDisplay.textContent += this.textContent;
  operatorCheck = false;
}

function displayOperator() {
  if (inputDisplay.textContent === "" || operatorCheck) {
    return;
  }

  if (previousNumber || previousNumber === 0) {
    previousNumber = operate();
    currentNumber = undefined;
  } else {
    previousNumber = currentNumber;
    currentNumber = undefined;
  }

  currentOperator = this.textContent;
  inputDisplay.textContent += currentOperator;
  operatorCheck = true;
  decimalCheck = false;
}

function displayDecimal() {
  if (inputDisplay.textContent === "" || operatorCheck || decimalCheck) {
    return;
  }

  currentNumber += ".";
  inputDisplay.textContent += ".";
  decimalCheck = true;
}

function clearDisplay() {
  previousNumber = undefined;
  currentOperator = "";
  currentNumber = undefined;
  operatorCheck = false;
  decimalCheck = false;
  inputDisplay.textContent = "";
}

// Event Listeners

numberButtons.forEach((button) =>
  button.addEventListener("click", displayNumber)
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", displayOperator)
);

clearButton.addEventListener("click", clearDisplay);

equalButton.addEventListener("click", updateDisplay);

decimalButton.addEventListener("click", displayDecimal);
