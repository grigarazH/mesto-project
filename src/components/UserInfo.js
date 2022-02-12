export default class UserInfo {
  constructor(nameSelector, aboutSelector, {getInfoCallback, setInfoCallback}) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._getInfoCallBack = getInfoCallback;
    this._setInfoCallBack = setInfoCallback;
  }

  getUserInfo() {
    this._user = this._getInfoCallBack();
    return this._user;
  }

  setUserInfo() {
    this._setInfoCallBack(this._user);
  }
}
