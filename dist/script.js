// Variables

const inputDisplay = document.querySelector(".input");
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

let operate = () => {
  if (
    parseFloat(currentNumber) === 0 &&
    inputHistory[inputHistory.length - 2] === "÷"
  ) {
    alert("You can't divide by zero!");
    clearDisplay();
    return;
  }

  if (inputHistory.length < 3 || operatorCheck) {
    return;
  }

  let sum = inputHistory[0];

  for (let i = 1; i < inputHistory.length - 1; i++) {
    switch (inputHistory[i]) {
      case "+":
        sum = add(sum, inputHistory[i + 1]);
        break;
      case "-":
        sum = subtract(sum, inputHistory[i + 1]);
        break;
      case "×":
        sum = multiply(sum, inputHistory[i + 1]);
        break;
      case "÷":
        sum = divide(sum, inputHistory[i + 1]);
        break;
    }
  }

  operatorCheck = false;

  if (/\.+/gi.test(sum)) {
    decimalCheck = true;
  }

  currentNumber = parseFloat(sum.toFixed(3));
  inputHistory = [currentNumber];
  updateDisplay();
};

function displayNumber() {
  if (!currentNumber) {
    currentNumber = this.textContent;
    inputHistory.push(parseFloat(currentNumber));
  } else {
    currentNumber += this.textContent;
    inputHistory[inputHistory.length - 1] = parseFloat(currentNumber);
  }

  operatorCheck = false;
  updateDisplay();
  // if (decimalCheck) {

  //   inputDisplay.textContent += "."
  // }
}

function updateDisplay() {
  let newDisplay = inputHistory.map((input) => input.toString());
  inputDisplay.textContent = newDisplay.join("");
}

function displayOperator() {
if (
    inputDisplay.textContent[inputDisplay.textContent.length - 1] === "." ||
    inputHistory.length === 0 ||
    operatorCheck
  ) {
    return;
  }

  inputHistory.push(this.textContent);
  currentNumber = undefined;
  updateDisplay();
  operatorCheck = true;
  decimalCheck = false;
}

function displayDecimal() {
  if (inputDisplay.textContent === "" || operatorCheck || decimalCheck) {
    return;
  }

  currentNumber += ".";
  updateDisplay();
  inputDisplay.textContent += ".";
  decimalCheck = true;
}

function clearDisplay() {
  currentNumber = undefined;
  operatorCheck = false;
  decimalCheck = false;
  inputHistory = [];
  updateDisplay();
}

function reverseSign() {
  currentNumber *= -1;
  inputHistory[inputHistory.length - 1] = currentNumber;
  updateDisplay();
}

function deleteInput() {
  if (operatorCheck) {
    inputHistory.splice(inputHistory.length - 1, 1);
    operatorCheck = false;
    currentNumber = inputHistory[inputHistory.length - 1];
    updateDisplay();
    return;
  }

  let currentNumberArr = currentNumber.toString().split("");

  if (currentNumberArr[currentNumberArr.length - 1] === ".") {
    decimalCheck = false;
    currentNumberArr.splice(currentNumberArr.length - 1, 1);
    currentNumber = currentNumberArr.join("");
    inputHistory[inputHistory.length - 1] = currentNumber;
    updateDisplay();
    return;
  }

  if (Math.abs(currentNumber).toString().length > 1) {
    currentNumberArr.splice(currentNumberArr.length - 1, 1);
    currentNumber = currentNumberArr.join("");
    inputHistory[inputHistory.length - 1] = currentNumber;
  } else {
    inputHistory.splice(inputHistory.length - 1, 1);
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

equalButton.addEventListener("click", operate);

decimalButton.addEventListener("click", displayDecimal);

backButton.addEventListener("click", deleteInput);

signReverseButton.addEventListener("click", reverseSign);

// Need to fix it so you can't place operator after dot. Also overall checking up, make sure it's all good
