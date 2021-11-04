import {renderType} from '/js/utils/data.js';

const card = document.querySelector('#card');
const popup = card.content.querySelector('.popup');

const getPopupItem = ({author, offer, location}) => {
  const popupItem = popup.cloneNode(true);

  const avatarElement = popupItem.querySelector('.popup__avatar');
  (author.avatar.indexOf('default') === -1) ? avatarElement.src = author.avatar : popupItem.removeChild(avatarElement);

  popupItem.querySelector('.popup__title').textContent = offer.title;
  popupItem.querySelector('.popup__text--address').textContent = `${location.lat} ${location.lng}`;
  popupItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат для ${offer.guests} гостей`;
  popupItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupItem.querySelector('.popup__type').textContent = renderType[offer.type];

  const descriptionElement = popupItem.querySelector('.popup__description');
  (offer.description) ? descriptionElement.textContent = offer.description : popupItem.removeChild(descriptionElement);

  if (offer.features) {
    const featuresFragment = document.createDocumentFragment();
    offer.features.forEach((feature) => {
      const featureItem = popupItem.querySelector(`.popup__feature--${feature}`);
      if (featureItem) {
        featuresFragment.append(featureItem);
      }
    });
    popupItem.querySelector('.popup__features').innerHTML= ' ';
    popupItem.querySelector('.popup__features').append(featuresFragment);
  } else {
    popupItem.removeChild(popupItem.querySelector('.popup__features'));
  }

  if(offer.photos) {
    const photosFragment = document.createDocumentFragment();
    offer.photos.forEach((photo) => {
      const photoItem = popupItem.querySelector('.popup__photo');
      photoItem.src = photo;
      const photoCopy = photoItem.cloneNode(true);
      photosFragment.append(photoCopy);
    });
    popupItem.querySelector('.popup__photos').innerHTML= ' ';
    popupItem.querySelector('.popup__photos').append(photosFragment);
  } else {
    popupItem.removeChild(popupItem.querySelector('.popup__photos'));
  }
  return popupItem;
};

export {getPopupItem};
