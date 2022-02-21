import Popup from "./Popup";

// Класс модального окна с формой. Конструктор ринимает селектор модального окна и колбек-функцию отправки формы
export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._form = this._popup.querySelector('.popup__container_type_form');
    this._submitCallback = submitCallback;
  }

  close() {
    this._form.reset();
    super.close();
  }

  // Получает значения полей ввода
  _getInputValues() {
    const inputValues = {};
    const inputs = Array.from(this._form.elements);
    inputs.forEach(input => {
      inputValues[input.name] = input.value;
    })
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._submitCallback(inputValues);
    })
  }
}
