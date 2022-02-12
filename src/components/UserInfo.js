export default class UserInfo {
  constructor(nameSelector, aboutSelector, setUserCallback) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._setUserCallback = setUserCallback;
  }

  getUserInfo(fetchedUser) {
    this._user = fetchedUser;
    return this._user;
  }

  setUserInfo({name, about}) {
    this._setUserCallback({name, about});
    const nameElement = document.querySelector(this._nameSelector);
    const aboutElement = document.querySelector(this._aboutSelector);
    nameElement.textContent = name;
    aboutElement.textContent = about;
  }
}
