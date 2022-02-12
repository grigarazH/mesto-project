import {closePopup} from "./modal";

export default class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  open() {
    this._popup = document.querySelector(this._selector)
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup = document.querySelector(this._selector)
    this._popup.classList.add("popup_remove");
    document.addEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      closePopup(openedPopup);
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
