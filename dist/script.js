// Variables

const inputDisplay = document.querySelector(".input");
const inputPreview = document.querySelector(".input-preview");
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

let add = (a, b) => parseFloat(a) + parseFloat(b);
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

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
        inputPreview.textContent = parseFloat(
          add(previousNumber, currentNumber).toFixed(3)
        );
        break;
      case "-":
        inputPreview.textContent = parseFloat(
          subtract(previousNumber, currentNumber).toFixed(3)
        );
        break;
      case "×":
        inputPreview.textContent = parseFloat(
          multiply(previousNumber, currentNumber).toFixed(3)
        );
        break;
      case "÷":
        inputPreview.textContent = parseFloat(
          divide(previousNumber, currentNumber).toFixed(3)
        );
        break;
    }
  } else {
    return;
  }
};

function updateDisplay() {
  if (!inputDisplay.textContent || operatorCheck) {
    return;
  }

  currentNumber = inputPreview.textContent;
  previousNumber = undefined;

  inputDisplay.textContent = currentNumber;
  inputPreview.textContent = "";
}

function displayNumber() {
  if (!currentNumber) {
    currentNumber = this.textContent;
  } else {
    currentNumber += this.textContent;
    currentNumber = currentNumber;
  }

  inputDisplay.textContent += this.textContent;
  operatorCheck = false;

  operate();
}

function displayOperator() {
  if (inputDisplay.textContent === "" || operatorCheck) {
    return;
  }

  if (previousNumber || previousNumber === 0) {
    previousNumber = inputPreview.textContent;
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

  console.log(currentNumber);
  currentNumber += ".";
  inputDisplay.textContent += ".";
  decimalCheck = true;
  console.log(currentNumber);
}

function clearDisplay() {
  previousNumber = undefined;
  currentOperator = "";
  currentNumber = undefined;
  operatorCheck = false;
  decimalCheck = false;
  inputPreview.textContent = "";
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

// backButton.addEventListener("click");

equalButton.addEventListener("click", updateDisplay);

decimalButton.addEventListener("click", displayDecimal);
