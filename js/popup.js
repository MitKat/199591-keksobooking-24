import {type} from '/js/utils/given-data.js';
// import {similarOffer} from '/js/generate-offer.js';

// const mapList = document.querySelector('#map-canvas');
const card = document.querySelector('#card');
const popup = card.content.querySelector('.popup');

const popupFragment = document.createDocumentFragment();

const getPopupItem = ({author, offer, location}) => {
  const popupItem = popup.cloneNode(true);

  popupItem.querySelector('.popup__avatar').src = author.avatar;
  popupItem.querySelector('.popup__title').textContent = offer.title;
  popupItem.querySelector('.popup__text--address').textContent = `${location.lat} ${location.lng}`;
  popupItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат для ${offer.guests} гостей`;
  popupItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const descriptionElement = popupItem.querySelector('.popup__description');
  if (offer.description) {
    descriptionElement.textContent = offer.description;
  } else {
    popupItem.removeChild(descriptionElement);
  }

  popupItem.querySelector('.popup__type').textContent = type[offer.typeOffer];

  const featuresFragment = document.createDocumentFragment();

  offer.features.forEach((features) => {
    const featuresItem = popupItem.querySelector(`.popup__feature--${features}`);
    if (featuresItem) {
      featuresFragment.append(featuresItem);
    }
  });
  popupItem.querySelector('.popup__features').innerHTML= ' ';
  popupItem.querySelector('.popup__features').append(featuresFragment);

  const photosFragment = document.createDocumentFragment();

  offer.photos.forEach((photo) => {
    const photoItem = popupItem.querySelector('.popup__photo');
    photoItem.src = photo;
    const photoCopy = photoItem.cloneNode(true);

    photosFragment.append(photoCopy);
  });
  popupItem.querySelector('.popup__photos').innerHTML= ' ';
  popupItem.querySelector('.popup__photos').append(photosFragment);

  popupFragment.appendChild(popupItem);
  return popupFragment;
};

// similarOffer.forEach((offer) => {

//   const popupItems = getPopupItem(offer);
//   // mapList.appendChild(popupItems);
// });

export {getPopupItem};
