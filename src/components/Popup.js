export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._escCloseListener = this._handleEscClose.bind(this);
  }

  open() {
    this._popup = document.querySelector(this._selector)
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._escCloseListener);
  }

  close() {
    this._popup = document.querySelector(this._selector)
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._escCloseListener);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup = document.querySelector(this._selector);
    const popupCloseButton = this._popup.querySelector('.popup__close-button');
    popupCloseButton.addEventListener('click', () => this.close());
    this._popup.addEventListener("mousedown", e => {
      if (e.target.classList.contains("popup") || e.target.classList.contains("popup__close-button")) {
        this.close();
      }
    })
  }
}
