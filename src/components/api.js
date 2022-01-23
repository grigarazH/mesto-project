const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '8d39c875-e0dc-4420-9d25-ae2d27971d79',
    'Content-type': 'application/json',
  },
}

export const fetchUserInfo = () => fetch(`${config.baseUrl}/users/me`, {
  config.headers,
})
  .then(res => {
    if(res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  });

export const getCards = () => fetch(`${config.baseUrl}/cards`, {
  config.headers,
})
  .then(res => {
    if(res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  });

export const editProfile = (name, about) => fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  config.headers,
  body: {
    name,
    about,
  }
})
  .then(res => {
    if(res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  });

export const addCard = ({name, link}) => fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  config.headers,
  body: {
    name,
    link,
  },
})
  .then(res => {
    if(res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  });

export const deleteCard = id => fetch(`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  config.headers,
}).then(res => {
  if(res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
})

export const likeCard = cardId = fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'PUT',
  config.headers,
}).then(res => {
  if(res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
});

export const dislikeCard = cardId = fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'DELETE',
  config.headers,
}).then(res => {
  if(res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
});




