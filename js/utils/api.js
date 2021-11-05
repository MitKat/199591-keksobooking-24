const getData = (onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      onFail('Ошибка на сервере. Подождите, мы уже решаем проблему.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Ошибка размещения объявления. Попробуйте ещё раз');
      }
    })
    .catch((error) => {
      onFail(error);
    });
};

export {getData, sendData};
