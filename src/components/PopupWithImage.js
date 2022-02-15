import Popup from "./Popup";

export default class PopupWithImage extends Popup{
  constructor(selector, card) {
    super(selector);
    this._card = card;
  }
  open() {
    super.open();
    const photo = this._popup.querySelector('.popup__photo');
    const photoCaption = this._popup.querySelector('.popup__photo-caption');
    photo.src = this._card.link;
    photoCaption.textContent = this._card.name;
    photo.alt = this._card.name;
  }
}
