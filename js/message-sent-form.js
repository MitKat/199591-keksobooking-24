import {isEscapeKey} from './utils/data.js';

//выводим сообщение об успешной отправки формы
const messageContainer = document.querySelector('body');
const successTemplate = document.querySelector('#success');
const successMessageContent = successTemplate.content.querySelector('.success');
const errorTemplate = document.querySelector('#error');
const errorMessageContent = errorTemplate.content.querySelector('.error');

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageSuccess();
  }
};

function closeMessageSuccess () {
  const successBlock = messageContainer.querySelector('.success');
  messageContainer.removeChild(successBlock);
  document.removeEventListener('keydown', onSuccessEscKeydown);
}

const showSuccessSent = () => {
  const successMessage = successMessageContent.cloneNode(true);
  messageContainer.append(successMessage);
  document.addEventListener('keydown', onSuccessEscKeydown);
  successMessage.addEventListener('click',() => {
    closeMessageSuccess();
  });
};

//выводим сообщение об ошибки отправки формы
const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageError();
  }
};

function closeMessageError () {
  const errorMessageBlock = messageContainer.querySelector('.error');
  messageContainer.removeChild(errorMessageBlock);
  document.removeEventListener('keydown', onErrorEscKeydown);
}

const showErrorSent = () => {
  const errorMessage = errorMessageContent.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  messageContainer.append(errorMessage);
  errorButton.addEventListener('click', () => {
    closeMessageError();
  });
  document.addEventListener('keydown', onErrorEscKeydown);
};

export {showSuccessSent, showErrorSent};
