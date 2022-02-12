//Объект конфигурации валидации форм
export const validationConfig = {
  formSelector: '.popup__container_type_form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
}
export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '8d39c875-e0dc-4420-9d25-ae2d27971d79',
    'Content-type': 'application/json',
  },
};

export const cardTemplateSelector = "#card_template";

export const profileNameEl = document.querySelector(".profile__name");
export const profileSubtitleEl = document.querySelector(".profile__subtitle");
export const profileAvatar = document.querySelector(".profile__avatar");

