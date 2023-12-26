const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wbf-cohort-15',
  headersInit: {
    authorization: 'fd37911a-3400-4108-a9b8-07945ed988a0',
    'Content-Type': 'application/json'
  }
};


function onResponse(res) {
  return res.ok
    ? res.json()
    : res.json().then((error) => Promise.reject(error));

}

function request (endpoint, options) {
  return fetch(`${config.baseUrl}/${endpoint}`, {
    method: 'GET',
    ...options,
    headers: {...config.headersInit, ...options?.headers}
  }) .then(onResponse);
};


export const gerUsersInformation = () => {
  return request('users/me');
};

//Загрузка первоначальных карточек

export const getInitialCrads = () => {
  return request('cards');
};

//Создание карточек
export const addNewCard = (dataBody) => {
  return request('cards', {
    method: "POST",
    body: JSON.stringify(dataBody),
  });
};

//редактирование профиля

export const editProfile = (newProfInfo) => {
  return request('users/me', {
    method: "PATCH",
    body: JSON.stringify(newProfInfo),
  });
};
//Deelete cards
export const deleteCard = (_id) => {
  return request(`cards/${_id}`, {
    method: "DELETE"
  });
};


//Like crads
export const likeCrad = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: "PUT",
  });
}


//Unlike cards
export const unlikeCards = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: "DELETE"
  })
}


//New user's avatar
export const newAvatar = (avatarLink) => {
  return request('users/me/avatar', {
    method: "PATCH",
    body: JSON.stringify(avatarLink),
  });
};





