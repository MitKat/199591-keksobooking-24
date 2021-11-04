import {isEscapeKey} from './utils/data.js';

const successMain = document.querySelector('body');
const successTemplate = document.querySelector('#success');
const success = successTemplate.content.querySelector('.success');
const successItem = success.cloneNode(true);

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageSuccess();
  }
};

const showSuccessSent = () => {
  successItem.style.backgroundColor = '#1F7A68';
  successItem.style.marginLeft = '100px';
  successItem.style.marginTop = '100px';
  successItem.style.padding = '160px';
  successItem.style.paddingBottom = '50px';
  successItem.style.borderRadius = '50%';
  successItem.style.width = 'auto';
  successItem.style.height = 'auto';
  successMain.append(successItem);

  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click',() => {
    closeMessageSuccess();
  });
};

function closeMessageSuccess () {
  successMain.removeChild(successItem);

  document.removeEventListener('keydown', onSuccessEscKeydown);
}

//поп-ап с сообщением об ошибки отправки
const errorTemplate = document.querySelector('#error');
const errorSent = errorTemplate.content.querySelector('.error');
const errorSentItem = errorSent.cloneNode(true);
const errorButton = errorSentItem.querySelector('.error__button');

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageError();
  }
};
const showErrorSent = () => {
  errorSentItem.style.backgroundColor = '#646464';
  errorSentItem.style.zIndex = 1000;
  errorSentItem.style.marginLeft = '100px';
  errorSentItem.style.marginTop = '100px';
  errorSentItem.style.padding = '160px';
  errorSentItem.style.paddingBottom = '50px';
  errorSentItem.style.borderRadius = '50%';
  errorSentItem.style.width = 'auto';
  errorSentItem.style.height = 'auto';
  successMain.append(errorSentItem);

  errorButton.addEventListener('click', () => {
    closeMessageError();
  });
  document.addEventListener('keydown', onErrorEscKeydown);
};

function closeMessageError () {
  successMain.removeChild(errorSentItem);

  document.removeEventListener('keydown', onErrorEscKeydown);
}


export {showSuccessSent, showErrorSent};
