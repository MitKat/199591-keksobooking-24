function getRandomNumber(number1, number2) {
  if (number1 < 0 || number2 < 0) {
    return null;
  }

  const min = Math.min(number1, number2);
  const max = Math.max(number1, number2);

  return Math.floor(Math.random() * (max-min+1)) + min;
}

getRandomNumber(10, 700);

function getRandomFloatNumber(number1, number2, floatPoint) {
  if (number1 < 0 || number2 < 0) {
    return null;
  }

  const min = Math.min(number1, number2);
  const max = Math.max(number1, number2);

  const number = Math.random() * (max-min+1) + min;
  return number.toFixed(floatPoint);
}

getRandomFloatNumber(50, 100, 3);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getRandomNumber, getRandomFloatNumber, getRandomArrayElement};
