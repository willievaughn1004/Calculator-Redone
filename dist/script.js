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
let zerosInDisplay = undefined;

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

  return parseFloat(sum.toFixed(3));
};

function equalButtonPress() {
  currentNumber = operate();

  operatorCheck = false;

  if (/\.+/gi.test(currentNumber)) {
    decimalCheck = true;
  }

  inputHistory = [currentNumber];
  updateDisplay();
}

function updateDisplay() {
  let newDisplay = inputHistory.map((input) => input.toString());
  inputDisplay.textContent = newDisplay.join("");
  inputPreview.textContent = operate();
}

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

  // this code is attempting to register when there is a comma so that it can add zeros to the display.
  //main issues is zeros after commas
  if (/\./.test(currentNumber) && this.textContent === "0") {
    if (/\.0/.test(currentNumber) && this.textContent === "0") {
      zerosInDisplay += "0";
    } else {
      zerosInDisplay = ".0";
    }

    inputDisplay.textContent += zerosInDisplay;
    return;
  }
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

equalButton.addEventListener("click", equalButtonPress);

decimalButton.addEventListener("click", displayDecimal);

backButton.addEventListener("click", deleteInput);

signReverseButton.addEventListener("click", reverseSign);
