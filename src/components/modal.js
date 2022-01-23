import {validateForm} from "./validate";
import {validationConfig} from "./constants";
import {cardContainer, createCardElement} from "./card";

const photoPopup = document.querySelector(".popup_type_photo");
const addCardPopup = document.querySelector(".popup_type_add-card");
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
export const photoPopupImage = photoPopup.querySelector(".popup__photo");
export const photoPopupCaption = photoPopup.querySelector(".popup__photo-caption");
export const editProfileForm = editProfilePopup.querySelector(".popup__container");
export const addCardForm = addCardPopup.querySelector(".popup__container");
export const popups = {editProfilePopup, addCardPopup, photoPopup};
const profileNameEl = document.querySelector(".profile__name");
const profileSubtitleEl = document.querySelector(".profile__subtitle");
const editProfileNameInput = editProfilePopup.querySelector("#edit-profile-name");
const editProfileSubtitleInput = editProfilePopup.querySelector("#edit-profile-subtitle");
const addCardNameInput = addCardForm.querySelector("#add-card-name");
const addCardLinkInput = addCardForm.querySelector("#add-card-link");

const handleEscKey = event => {
  if(event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export const openPopup = popup => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);
}
export const closePopup = popup => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
}

export const openPhotoPopup = card => {
  photoPopupImage.src = card.link;
  photoPopupImage.alt = card.name;
  photoPopupCaption.textContent = card.name;
  openPopup(photoPopup);
}

// Обработчик отправки формы редактирования профиля
export const submitEditProfileForm = event => {
  event.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileSubtitleEl.textContent = editProfileSubtitleInput.value;
  closePopup(editProfilePopup);
}

// Обработчик нажатия на кнопку редактирования профиля
export const handleEditProfileButtonClick = () => {
  openPopup(editProfilePopup);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileSubtitleInput.value = profileSubtitleEl.textContent;
  validateForm(editProfileForm, validationConfig);
}

// Обработчик отправки формы добавления карточки
export const submitAddCardForm = event => {
  const addCardSubmit = addCardPopup.querySelector(".popup__submit");
  event.preventDefault();
  const card = {
    name: addCardNameInput.value,
    link: addCardLinkInput.value,
  };
  const cardElement = createCardElement(card);
  cardContainer.prepend(cardElement);
  addCardForm.reset();
  addCardSubmit.disabled = true;
  closePopup(addCardPopup);
}
