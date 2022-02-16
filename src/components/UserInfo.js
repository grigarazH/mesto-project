export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector, fetchUserCallback,setUserCallback) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
    this._setUserCallback = setUserCallback;
    this._fetchUserCallback = fetchUserCallback;
  }

  fetchUserInfo() {
    this._fetchUserCallback().then(fetchedUser => {
      this._user = fetchedUser;
    })
  }

  getUserInfo() {
    return this._user;
  }

  render(){
    const nameElement = document.querySelector(this._nameSelector);
    const aboutElement = document.querySelector(this._aboutSelector);
    const avatarElement = document.querySelector(this._avatarSelector);
    avatarElement.src = this._user.avatar;
    nameElement.textContent = this._user.name;
    aboutElement.textContent = this._user.about;
  }

  setUserInfo({name, about}) {
    this._setUserCallback({name, about}).then(fetchedUser => {
      this._user = fetchedUser;
      this.render();
    })
      .catch(err => console.log(err))
  }
}
