
// Класс с информацией о пользователе, конструктор принимает селекторы элементов имени пользователя, информации о пользователе, аватара и колбек-функции
// для получение информации о пользователе с сервера и отправки информации о пользователе на сервер
export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector, fetchUserCallback, setUserCallback) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
    this._setUserCallback = setUserCallback;
    this._fetchUserCallback = fetchUserCallback;
    this._nameElement = document.querySelector(this._nameSelector);
    this._aboutElement = document.querySelector(this._aboutSelector);
    this._avatarElement = document.querySelector(this._avatarSelector);
  }

  // Получает информацию о пользователе с сервера
  fetchUserInfo() {
    this._fetchUserCallback().then(fetchedUser => {
      this._user = fetchedUser;
    })
  }

  // Возвращает объект пользователя
  getUserInfo() {
    return this._user;
  }

  // Осуществляет обновление данных о пользователе на странице
  render(){
    this._avatarElement.src = this._user.avatar;
    this._nameElement.textContent = this._user.name;
    this._aboutElement.textContent = this._user.about;
  }

  // Отправляет информацию о пользователе на сервер и осуществляет обновление данных о пользователе на странице
  setUserInfo({name, about}) {
    return this._setUserCallback({name, about}).then(fetchedUser => {
      this._user = fetchedUser;
      this.render();
    });
  }
}
