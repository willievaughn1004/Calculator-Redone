let sum = 0;

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '×': (a, b) => a * b,
  '÷': (a, b) => a / b,
};

sum = operations["-"](sum, 2);

console.log(sum)