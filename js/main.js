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


const timeOffer = [
  '12:00',
  '13:00',
  '14:00',
];

const typeOffer = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const featuresOffer = [
  'wi-fi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const SIMILAR_OFFER_COUNT = 10;

const avatarArchive = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

const photoArchive = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const Lat = {
  MIN: 35.65000,
  MAX: 35.70000,
  FIXFLOAT: 5,
};

const Long = {
  MIN: 139.70000,
  MAX: 139.80000,
  FIXFLOAT: 5,
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

let index = 0;

const generateOffer = () => {

  index += 1;

  const latitude = getRandomFloatNumber(Lat.MIN, Lat.MAX, Lat.FIXFLOAT);
  const longitude = getRandomFloatNumber(Long.MIN, Long.MAX, Long.FIXFLOAT);

  const location = {
    lat: latitude,
    lng: longitude,
  };

  const featuresLength = getRandomNumber(1, featuresOffer.length);
  const features = featuresOffer.slice(0, featuresLength);

  const photosLength = getRandomNumber(1, photoArchive.length);
  const photos = photoArchive.slice(0, photosLength);

  return  {
    author : {
      avatar: avatarArchive[index % avatarArchive.length],
    },
    offer : {
      title: 'Главное предложение месяца',
      address: `${location.lat} ${location.lng}`,
      price: getRandomNumber(300, 1000),
      guests: getRandomNumber(1, 10),
      rooms: getRandomNumber(1, 200),
      type: getRandomArrayElement(typeOffer),
      checkin: getRandomArrayElement(timeOffer),
      checkout: getRandomArrayElement(timeOffer),
      features,
      description: 'бесконечное солнце в вашей жизни',
      photos,
    },
    location,
  };
};

const similarOffer = Array.from({length: SIMILAR_OFFER_COUNT}, generateOffer);

export {similarOffer};

//console.log(similarOffer);


