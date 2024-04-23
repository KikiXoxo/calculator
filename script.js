'use strict';

// VARIABLES
const displayTyped = document.querySelector('.display--typed');
const displayResult = document.querySelector('.display--result');
const btnsContainer = document.querySelector('.buttons');
const operators = ['+', '-', '*', '/', '^', '√'];

let displayValue = '';
let displayValueResult = '';

// FUNCTIONS
const appendToDisplay = function (value) {
  displayValue += value;
  displayTyped.value = displayValue;
  displayResult.value = '';
};

const clearDisplay = function () {
  displayValue = '';
  displayTyped.value = displayValue;
  displayValueResult = '';
  displayResult.value = displayValueResult;
};

const calcResult = function () {
  displayValueResult = displayValue;

  try {
    if (displayValueResult.includes('^'))
      displayValueResult = displayValueResult.replaceAll('^', '**');

    if (displayValueResult.includes('√')) {
      displayValueResult = displayValueResult.replaceAll('√', '');
      displayValueResult = displayValueResult + '**(1/2)';
    }

    let result = eval(displayValueResult);
    if (result === Infinity) result = 'Error';

    displayResult.value = result;
    displayValue = '';
  } catch (error) {
    displayResult.value = 'Error';
  }
};

// EVENT LISTENERS
btnsContainer.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    const btnText = e.target.textContent;

    if (btnText === '=') calcResult();
    else if (btnText === 'C') clearDisplay();
    else if (/^\d$|\.$/.test(btnText) || operators.includes(btnText))
      // Checks if the string in btnText matches the regular expression pattern (string or decimal)
      appendToDisplay(btnText);
  }
});

document.addEventListener('keydown', function (e) {
  const key = e.key;

  if (key === 'Enter' || key === '=') calcResult();
  else if (key === 'Escape') clearDisplay();
  else if (/[0-9\.]/.test(key) || operators.includes(key)) appendToDisplay(key);
});
