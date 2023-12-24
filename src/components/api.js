const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wbf-cohort-15',
  headers: {
    authorization: 'fd37911a-3400-4108-a9b8-07945ed988a0',
    'Content-Type': 'application/json'
  }
};


//Функция для получения данных пользователя
export const getUserInformation = () => {

return fetch(`${config.baseUrl}/users/me`, {
  method: 'GET',
  headers: config.headers
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
};


//Загрузка первоначальных карточек

export const getInitialCrads = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
};

//edit ptofile data
export const editProfile = () => {
  return fetch (`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: 'Kusturiza Jan Jack',
      about: 'Mamin Brodyaga Papin Simpotyaga'
    })

    });
};

//Add new cards

export const addNewCard = () => {
  return  fetch (`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: 'cool place',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    })

  })
}



