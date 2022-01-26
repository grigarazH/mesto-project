const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '8d39c875-e0dc-4420-9d25-ae2d27971d79',
    'Content-type': 'application/json',
  },
};

const handleFetchResponse = response => {
  if(response.ok) return response.json();
  return Promise.reject(`Ошибка: ${response.status}`);
}

export const fetchUserInfo = () => fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
})
  .then(res => handleFetchResponse(res));

export const getCards = () => fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
})
  .then(res => handleFetchResponse(res));

export const editProfile = (name, about) => fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about,
  }),
})
  .then(res => handleFetchResponse(res));

export const addCard = ({name, link}) => fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name,
    link,
  }),
})
  .then(res => handleFetchResponse(res));

export const deleteCard = id => fetch(`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers: config.headers,
}).then(res => handleFetchResponse(res))

export const likeCard = cardId => fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: config.headers,
}).then(res => handleFetchResponse(res));

export const dislikeCard = cardId => fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: config.headers,
}).then(res => handleFetchResponse(res));

export const updateAvatar = avatarUrl => fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: avatarUrl,
  }),
}).then(res => handleFetchResponse(res));




