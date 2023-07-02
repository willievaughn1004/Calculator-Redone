// Variables

const inputDisplay = document.querySelector(".input");
// const inputPreview = document.querySelector(".input-preview");
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
        currentNumber = parseFloat(
          add(previousNumber, currentNumber).toFixed(3)
        );
        break;
      case "-":
        currentNumber = parseFloat(
          subtract(previousNumber, currentNumber).toFixed(3)
        );
        break;
      case "×":
        currentNumber = parseFloat(
          multiply(previousNumber, currentNumber).toFixed(3)
        );
        break;
      case "÷":
        currentNumber = parseFloat(
          divide(previousNumber, currentNumber).toFixed(3)
        );
        break;
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

  previousNumber = undefined;

  inputDisplay.textContent = currentNumber;
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
    previousNumber = inputDisplay.textContent;
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
  // inputPreview.textContent = "";
  inputDisplay.textContent = "";
}

// function reverseSign() {
//   let inputText = inputDisplay.textContent.split("");
//   console.log(inputText);
//   inputText.splice(inputText.length - 1, 1);
//   inputDisplay.textContent = inputText.join("");
// }

//   let currentNumberSplit = currentNumber.split("");
//   currentNumberSplit.splice(currentNumberSplit.length - 1, 1);
//   currentNumber = currentNumberSplit.join("");

//   operate();
// }

// function deleteLastNumber() {

//   let inputText = inputDisplay.textContent.split("");
//   inputText.splice(inputText.length - 1, 1);
//   inputDisplay.textContent = inputText.join("");

//   if (operatorCheck) {
//     operatorCheck = false;
//     currentOperator = "";
//   }

//   let currentNumberSplit = currentNumber.split("");
//   currentNumberSplit.splice(currentNumberSplit.length - 1, 1)
//   currentNumber = currentNumberSplit.join("")

//   operate();
// }

// Event Listeners

numberButtons.forEach((button) =>
  button.addEventListener("click", displayNumber)
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", displayOperator)
);

clearButton.addEventListener("click", clearDisplay);

backButton.addEventListener("click", deleteLastNumber);

equalButton.addEventListener("click", updateDisplay);

decimalButton.addEventListener("click", displayDecimal);

// signReverseButton.addEventListener("click", reverseSign);
