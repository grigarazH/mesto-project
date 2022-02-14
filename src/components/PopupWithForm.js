import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;
  }

  close() {
    this._form = this._popup.querySelector('.popup__container_type_form');
    this._form.reset();
    super.close();
  }

  _getInputValues() {
    const inputValues = {};
    this._popup = document.querySelector(this._selector);
    this._form = this._popup.querySelector('.popup__container_type_form');
    const inputs = Array.from(this._form.elements);
    inputs.forEach(input => {
      inputValues[input.name] = input.value;
    })
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    const inputValues = this._getInputValues();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitCallback(inputValues);
    })
  }
}
