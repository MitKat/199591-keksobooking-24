function getRandomNumber(number1, number2) {
  if (number1 < 0 || number2 < 0) {
    return null;
  }

  const min = Math.min(number1, number2);
  const max = Math.max(number1, number2);

  return Math.floor(Math.random() * (max-min+1)) + min;
}

getRandomNumber(10, 700);

function getRdmFloatNumber(number1, number2, floatPoint) {
  if (number1 < 0 || number2 < 0) {
    return null;
  }

  const min = Math.min(number1, number2);
  const max = Math.max(number1, number2);

  const number = Math.random() * (max-min+1) + min;
  return number.toFixed(floatPoint);
}

getRdmFloatNumber(50, 100, 3);

//массив из фиксированного времени
const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const FEATURES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];


const author = {
  avatar: '', //адрес изображения
};

const getInformation = () => {
  //диапазон задала сама, так как в задании ничего про него нет. просто случайное целое число
  //использую для price, guests rooms, но предполагаю, что позже будет это как то по другому
  const randomNumber = getRandomNumber(0, 100);

  const latitude = getRdmFloatNumber(35.65000, 35.70000);
  const longitude = getRdmFloatNumber(139.70000, 139.80000);

  // for (let i=0; i < 6; i++) {

  // };

  const location = {
    lat: latitude,
    lng: longitude,
  };

  const offer = {
    title: 'Главное предложение месяца',
    address: location.lat, //не совсем понимаю, почему линт ругается
    price: randomNumber,
    guests: randomNumber,
    rooms: randomNumber,
    type: TYPE[getRandomNumber(0, TYPE.length-1)],
    checkin: TIME[getRandomNumber(0, TIME.length-1)],
    checkout: TIME[getRandomNumber(0, TIME.length-1)],
  };

  return console.log(Object.values(offer).join(', '));
};


getInformation();
