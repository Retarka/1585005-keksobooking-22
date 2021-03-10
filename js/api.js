
// eslint-disable-next-line no-unused-vars
import { openErrorDataPopup } from './util.js';


const SERVER_GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SERVER_POST_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  return fetch(SERVER_GET_URL)
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SERVER_POST_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export { getData, sendData };
