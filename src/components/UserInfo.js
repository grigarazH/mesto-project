export default class UserInfo {
  constructor(nameSelector, aboutSelector, {fetchInfoCallback, setInfoCallback}) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._fetchInfoCallback = fetchInfoCallback;
    this._setInfoCallBack = setInfoCallback;
  }

  async getUserInfo() {
    return await this._fetchInfoCallback();
  }

  setUserInfo() {
    this._setInfoCallBack(this._user);
  }
}
