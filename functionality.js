// the display for the calculator
const display = document.getElementById('screen');
// an html collection containing three digit buttons
const digits = document.getElementsByClassName('digit');
// an html collection containing all of the operator buttons
const operators = document.getElementsByClassName('operator');
// equal button
const equal = document.getElementById('equal');
// clear button
const clear = document.getElementById('clear');

let currentCalculation = null;

// instantiating this class will represent a current chain of calculations
class Computation {
  constructor() {
    this.leftOperand = '';
    this.rightOperand = '';
    this.operator = '';
    // decides whether inputs are going to the left operand or right operand
    this.getLeft = true;
  }

  // use in the event listeners for digits and operators
  processButtonPress(event) {
    const button = event.target;
    const buttonText = button.textContent;

    if (button.className === 'button digit' && this.getLeft) {
      this.leftOperand += buttonText;
    } else if (button.className === 'button digit') {
      this.rightOperand += buttonText;
    } else if (button.className === 'button operator') {
      this.getLeft = false;
      this.operator = buttonText;
    }
  }

  // will be used in attemptToCompute if calculation is possible
  compute() {
    const left = parseFloat(this.leftOperand, 10);
    const right = parseFloat(this.rightOperand, 10);

    if (this.operator === '+') {
      return left + right;
    } else if (this.operator === '-') {
      return left - right;
    } else if (this.operator === '*') {
      return left * right;
    } else if (this.operator === '/') {
      return left / right;
    }
  }

  // use in the event listener for equals btn
  attemptToCompute() {
    let result;

    if (this.leftOperand && this.operator && this.rightOperand) {
      result = this.compute();
    } else if (!this.leftOperand || !this.rightOperand) {
      result = this.leftOperand + this.rightOperand;
    }

    // reset state of current calculation
    // this.getLeft = true;
    this.leftOperand = result.toString();
    this.operator = '';
    this.rightOperand = '';
    return result ? result.toString(): '';
  }

  // used to alter calculator display
  static display(text, event) {
    const targetId = event.target.id; // may need to fix
    const targetClass = event.target.className; // will need to fix

    if (targetId === 'equal') {
      display.textContent = text;
    }
    if (targetId === 'clear') {
      display.textContent = '';
    }

    text = event.target.textContent;

    if (targetClass === 'button digit') {
      display.textContent += text;
    }
    if (targetClass === 'button operator') {
      display.textContent += ` ${text} `;
    }
  }

  // use as an event handler for the clear btn
  static newCalculation() {
    currentCalculation = new Computation();
  }
}

// instantiate the class to track a calculation
currentCalculation = new Computation(); // working

// add event listener to process button presses and display number
Array.from(digits).forEach(digit => {
  digit.addEventListener('click', function(event) {
    currentCalculation.processButtonPress(event);
    Computation.display(null, event);
  });
});

// add event listener to process button presses and display operator
Array.from(operators).forEach(operator => {
  operator.addEventListener('click', function(event) {
    currentCalculation.processButtonPress(event);
    Computation.display(null, event);
  });
});

// add event listener for '=' button
equal.addEventListener('click', function(event) {
  const result = currentCalculation.attemptToCompute();
  Computation.display(result, event);
});

clear.addEventListener('click', function(event) {
  Computation.newCalculation();
  Computation.display(null, event);
});
