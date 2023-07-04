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

let operatorCheck = false;
let decimalCheck = false;
let currentNumber;
let inputHistory = [];

// Functions

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Returns the sum of the elements within inputHistory
function operate() {
  if (inputHistory.length < 3) {
    return;
  }

  let sum = parseFloat(inputHistory[0]);

  // Iterate through the input history and perform the appropriate operation
  for (let i = 1; i < inputHistory.length - 1; i++) {
    switch (inputHistory[i]) {
      case "+":
        sum = add(sum, parseFloat(inputHistory[i + 1]));
        break;
      case "-":
        sum = subtract(sum, parseFloat(inputHistory[i + 1]));
        break;
      case "×":
        sum = multiply(sum, parseFloat(inputHistory[i + 1]));
        break;
      case "÷":
        sum = divide(sum, parseFloat(inputHistory[i + 1]));
        break;
    }
  }

  return parseFloat(sum.toFixed(3));
}

// Takes the result of operate, adds it to the display, and removes inputPreview.
function performCalculation() {
  // check for divide by zero error
  if (
    parseFloat(currentNumber) === 0 &&
    inputHistory[inputHistory.length - 2] === "÷"
  ) {
    clearDisplay();
    inputDisplay.textContent = "You can't divide by zero!";
    return;
  }

  if (operatorCheck || inputHistory.length < 3) {
    return;
  }

  currentNumber = operate().toString();

  // Check if result has decimal point
  if (/\.+/gi.test(currentNumber)) {
    decimalCheck = true;
  }

  inputHistory = [currentNumber];
  updateDisplay();
}

// Updates the display with the current input history and result
function updateDisplay() {
  if (!operatorCheck) {
    inputHistory[inputHistory.length - 1] = currentNumber;
  }
  inputDisplay.textContent = inputHistory.join("");
  inputPreview.textContent = operate();
}

// Handles displaying numbers when number buttons are clicked
function displayNumber() {
  if (!currentNumber) {
    currentNumber = this.textContent;
    inputHistory.push(currentNumber);
  } else {
    currentNumber += this.textContent;
    inputHistory[inputHistory.length - 1] = currentNumber;
  }

  operatorCheck = false;
  updateDisplay();
}

// Handles displaying operators when operator buttons are clicked
function displayOperator() {
  // Checks if inputDisplay and inputHistory is empty and if there is already an operator
  if (
    inputDisplay.textContent[inputDisplay.textContent.length - 1] === "." ||
    inputHistory.length === 0 ||
    operatorCheck
  ) {
    return;
  }

  inputHistory.push(this.textContent);
  currentNumber = undefined;
  operatorCheck = true;
  decimalCheck = false;
  updateDisplay();
}

// Handles displaying decimals when the decimal buttons is clicked
function displayDecimal() {
  // Checks if inputDisplay empty, if there is already an operator, and if there is already a decimal.
  if (inputDisplay.textContent === "" || operatorCheck || decimalCheck) {
    return;
  }

  currentNumber += ".";
  decimalCheck = true;
  updateDisplay();
}

// Resets everything
function clearDisplay() {
  currentNumber = undefined;
  operatorCheck = false;
  decimalCheck = false;
  inputHistory = [];
  updateDisplay();
}

// Toggles the sign of the current number
function toggleSign() {
  if (!currentNumber) {
    return;
  }
  currentNumber *= -1;
  currentNumber = currentNumber.toString();
  inputHistory[inputHistory.length - 1] = currentNumber;
  updateDisplay();
}

// Deletes the last input
function handleDelete() {
  // Checks if operator is last input
  if (operatorCheck) {
    inputHistory.pop();
    operatorCheck = false;
    currentNumber = inputHistory[inputHistory.length - 1];
    updateDisplay();
    return;
  }

  let currentNumberArr = currentNumber.split("");

  // Checks if decimal is last input
  if (currentNumberArr[currentNumberArr.length - 1] === ".") {
    decimalCheck = false;
    currentNumberArr.pop();
    currentNumber = currentNumberArr.join("");
    inputHistory[inputHistory.length - 1] = currentNumber;
    updateDisplay();
    return;
  }

  // Checks if current number has more than one digit or not.
  if (
    Math.abs(currentNumber).toString().length > 1 ||
    /\./.test(currentNumber)
  ) {
    currentNumberArr.pop();
    currentNumber = currentNumberArr.join("");
    inputHistory[inputHistory.length - 1] = currentNumber;
  } else {
    inputHistory.pop();
    operatorCheck = true;
    currentNumber = undefined;
  }

  updateDisplay();
}

// Event Listeners

numberButtons.forEach((button) =>
  button.addEventListener("click", displayNumber)
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", displayOperator)
);

clearButton.addEventListener("click", clearDisplay);

equalButton.addEventListener("click", performCalculation);

decimalButton.addEventListener("click", displayDecimal);

backButton.addEventListener("click", handleDelete);

signReverseButton.addEventListener("click", toggleSign);
