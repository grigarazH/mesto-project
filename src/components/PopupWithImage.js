import Popup from "./Popup";

// Класс модального окна с картинкой. Конструктор принимает селектор модального окна и объект карточки
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._photo = this._popup.querySelector('.popup__photo');
    this._photoCaption = this._popup.querySelector('.popup__photo-caption');
  }

  open(card) {
    super.open();
    this._photo.src = card.link;
    this._photoCaption.textContent = card.name;
    this._photo.alt = card.name;
  }
}
