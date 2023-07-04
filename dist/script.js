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


// change the divide by zero error to only occur if the user hits enter and doesn't mess up preview text.
function operate() {

  if (
    parseFloat(currentNumber) === 0 &&
    inputHistory[inputHistory.length - 2] === "÷"
  ) {
    alert("You can't divide by zero!");
    clearDisplay();
    return;
  }

  if (inputHistory.length < 3) {
    return;
  }

  let sum = parseFloat(inputHistory[0]);

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
};

// fix bug when you press equal that it clears screen when it isn't supposed to.
function equalButtonPress() {

  if (operatorCheck || inputHistory.length < 3) {
    return;
  }

  currentNumber = operate();

  if (/\.+/gi.test(currentNumber)) {
    decimalCheck = true;
  }

  inputHistory = [currentNumber];
  updateDisplay();
}

function updateDisplay() {
  if (!operatorCheck) {
    inputHistory[inputHistory.length - 1] = currentNumber;
  }
  inputDisplay.textContent = inputHistory.join("");
  inputPreview.textContent = operate();
}

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
  operatorCheck = true;
  decimalCheck = false;
  updateDisplay();
}

function displayDecimal() {
  if (inputDisplay.textContent === "" || operatorCheck || decimalCheck) {
    return;
  }

  currentNumber += ".";
  decimalCheck = true;
  updateDisplay();
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
  currentNumber = currentNumber.toString();
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

  let currentNumberArr = currentNumber.split("");

  if (currentNumberArr[currentNumberArr.length - 1] === ".") {
    decimalCheck = false;
    currentNumberArr.splice(currentNumberArr.length - 1, 1);
    currentNumber = currentNumberArr.join("");
    inputHistory[inputHistory.length - 1] = currentNumber;
    updateDisplay();
    return;
  }

  if (Math.abs(currentNumber).toString().length > 1 || /\./.test(currentNumber)) {
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
