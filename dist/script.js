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

let previousNumber = 0;
let currentOperator = "";
let currentNumber = 0;

// Functions

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

let operate = () => {
  console.log(previousNumber, currentOperator, currentNumber);
  if (previousNumber && currentOperator && currentNumber) {
    switch (currentOperator) {
      case "+":
        previousNumber = parseFloat(add(previousNumber, currentNumber).toFixed(3));
        break;
      case "-":
        previousNumber = parseFloat(subtract(previousNumber, currentNumber).toFixed(3));
        break;
      case "×":
        previousNumber = parseFloat(multiply(previousNumber, currentNumber).toFixed(3));
        break;
      case "÷":
        previousNumber = parseFloat(divide(previousNumber, currentNumber).toFixed(3));
        break;
    }
  } else {
    return;
  }
};

function updateDisplay() {
  inputDisplay.textContent = previousNumber;
}

function displayNumber() {
  if (currentOperator) {
    currentNumber = parseFloat(this.textContent);
    operate();
    inputPreview.textContent = previousNumber;
  }

  inputDisplay.textContent += this.textContent;
}

function displayOperator() {
  if (!currentOperator) {
    previousNumber = parseFloat(inputDisplay.textContent[0]);
  }

  currentOperator = this.textContent;

  inputDisplay.textContent += this.textContent;
  console.log(inputDisplay.textContent[inputDisplay.textContent.length - 2]);
}

// function displayDecimal() {
//     currentNumber.toString()
//     currentNumber += ".";
//     inputDisplay.textContent[inputDisplay.textContent.length - 1] = currentNumber;
//     console.log(currentNumber);
// }

function clearDisplay() {
  previousNumber = 0;
  currentOperator = "";
  currentNumber = 0;
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

equalButton.addEventListener("click", function () {
  updateDisplay();
});

// decimalButton.addEventListener("click", displayDecimal)
