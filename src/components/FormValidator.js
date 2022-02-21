
// Класс валидатора формы, принимает на себя объект конфигурации валидатора и элемент формы
export default class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass}, formElement) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  // Метод, отображающий ошибку для поля ввода
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Метод, скрывающий ошибку для поля ввода
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Проверяет валидность поля ввода
  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }else {
      this._hideInputError(inputElement);
    }
  }

  // Проверяет, имеет ли список полей ввода невалидные поля ввода
  _hasInvalidInput(inputList) {
    return inputList.some(input => !input.validity.valid);
  }

  // Отключает кнопку отправки формы, если имеется хотя бы одно невалидное поле ввода. В противном случае активирует кнопку.
  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    }else{
      buttonElement.disabled = false;
    }
  }

  // Устанавливает обработчики событий для валидации формы
  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  // Выполняет ручную валидацию формы
  validateForm() {
    this._inputList.forEach(inputElement => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(this._inputList, this._buttonElement);
    });
  }

  // Включает валидацию для формы
  enableValidation() {
    this._setEventListeners();
  }
}
