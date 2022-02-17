

// Класс для работы с API, конструктор принимает объект, содержащий url API и заголовки.
export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Метод обработки ответа сервера
  _handleFetchResponse(response) {
    if (response.ok) return response.json();
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  // Метод, возвращающий информацию о текущем пользователе
  fetchUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(res => this._handleFetchResponse(res));
  }

  // Метод, возвращающий информацию о карточках
  fetchCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(res => this._handleFetchResponse(res));
  }

  // Метод, осуществляющий редактирование информации о пользователе. Принимает имя и информацию о себе пользователя. Возвращает измененного пользователя.
  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(res => this._handleFetchResponse(res));
  }

  // Метод, осуществляющий добавление карточки на сервер. Принимает объект с данными о карточке. Возвращает добавленную карточку.
  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(res => this._handleFetchResponse(res));
  }

  // Метод, осуществляющий удаление карточки по id.
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => this._handleFetchResponse(res));
  }

  // Метод, осуществляющий лайк карточки.
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(res => this._handleFetchResponse(res));
  }

  // Метод, осуществляющий дизлайк карточки.
  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => this._handleFetchResponse(res));
  }

  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(res => this._handleFetchResponse(res));
  }
}
