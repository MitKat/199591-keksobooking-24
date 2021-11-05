import {isEscapeKey} from './utils/data.js';

//выводим сообщение об успешной отправки формы
const messageContainer = document.querySelector('body');
const successTemplate = document.querySelector('#success');
const success = successTemplate.content.querySelector('.success');
const successItem = success.cloneNode(true);

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageSuccess();
  }
};

function closeMessageSuccess () {
  messageContainer.removeChild(successItem);
  document.removeEventListener('keydown', onSuccessEscKeydown);
}

const showSuccessSent = () => {
  messageContainer.append(successItem);

  document.addEventListener('keydown', onSuccessEscKeydown);
  successItem.addEventListener('click',() => {
    closeMessageSuccess();
  });
};

//выводим сообщение об ошибки отправки формы
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
function closeMessageError () {
  messageContainer.removeChild(errorSentItem);
  document.removeEventListener('keydown', onErrorEscKeydown);
}

const showErrorSent = () => {
  messageContainer.append(errorSentItem);
  errorButton.addEventListener('click', () => {
    closeMessageError();
  });
  document.addEventListener('keydown', onErrorEscKeydown);
};


export {showSuccessSent, showErrorSent};
