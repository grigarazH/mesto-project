import {initialCards} from './card';
import '../pages/index.css';
import {openPopup, closePopup, photoPopup} from "./popup";
import {createCardElement} from "./card";
import {validationConfig} from "./utils";
import {enableValidation, validateForm} from "./validate";

const cardContainer = document.querySelector(".cards");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const editProfileCloseButton = editProfilePopup.querySelector(".popup__close-button");
const editProfileForm = editProfilePopup.querySelector(".popup__container");
const editProfileNameInput = editProfilePopup.querySelector("#edit-profile-name");
const editProfileSubtitleInput = editProfilePopup.querySelector("#edit-profile-subtitle");
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_add-card");
const addCardCloseButton = addCardPopup.querySelector(".popup__close-button");
const addCardForm = addCardPopup.querySelector(".popup__container");
const profileNameEl = document.querySelector(".profile__name");
const profileSubtitleEl = document.querySelector(".profile__subtitle");
const addCardNameInput = addCardForm.querySelector("#add-card-name");
const addCardLinkInput = addCardForm.querySelector("#add-card-link");
const photoPopupCloseButton = photoPopup.querySelector(".popup__close-button");
const popups = [editProfilePopup, addCardPopup, photoPopup];

// Обработчик отправки формы редактирования профиля
const submitEditProfileForm = event => {
  event.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileSubtitleEl.textContent = editProfileSubtitleInput.value;
  closePopup(editProfilePopup);
}

// Обработчик отправки формы добавления карточки
const submitAddCardForm = event => {
  event.preventDefault();
  const card = {
    name: addCardNameInput.value,
    link: addCardLinkInput.value,
  };
  const cardElement = createCardElement(card);
  cardContainer.prepend(cardElement);
  addCardForm.reset();
  closePopup(addCardPopup);
}

initialCards.forEach(card => cardContainer.append(createCardElement(card)));

editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileSubtitleInput.value = profileSubtitleEl.textContent;
  validateForm(editProfileForm, validationConfig);
});

editProfileCloseButton.addEventListener("click", () => {
  closePopup(editProfilePopup);
});

editProfileForm.addEventListener("submit", submitEditProfileForm);

addCardButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});

addCardCloseButton.addEventListener("click", () => {
  closePopup(addCardPopup);
});

addCardForm.addEventListener("submit", submitAddCardForm);

photoPopupCloseButton.addEventListener("click", () => {
  closePopup(photoPopup);
});

popups.forEach(popup => popup.addEventListener("click", e => {
  console.log(e.target);
  if(e.target.classList.contains("popup")) {
    closePopup(popup);
  }
}));

enableValidation(validationConfig);
