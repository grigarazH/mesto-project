import {validateForm} from "./validate";
import {profileAvatar, profileNameEl, profileSubtitleEl, validationConfig} from "./constants";
import {cardContainer, createCardElement} from "./card";
import {editProfile, addCard, updateAvatar, deleteCard, getCards} from "./api";
import {getDeleteCardId, setCards, setUser} from "./utils";

const photoPopup = document.querySelector(".popup_type_photo");
const addCardPopup = document.querySelector(".popup_type_add-card");
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const updateAvatarPopup = document.querySelector(".popup_type_update_avatar");
const deleteCardPopup = document.querySelector(".popup_type_delete_card");
export const photoPopupImage = photoPopup.querySelector(".popup__photo");
export const photoPopupCaption = photoPopup.querySelector(".popup__photo-caption");
export const editProfileForm = editProfilePopup.querySelector(".popup__container");
export const addCardForm = addCardPopup.querySelector(".popup__container");
export const updateAvatarForm = updateAvatarPopup.querySelector(".popup__container");
export const deleteCardForm = deleteCardPopup.querySelector(".popup__container");
export const popups = {editProfilePopup, addCardPopup, photoPopup, updateAvatarPopup, deleteCardPopup};
const editProfileNameInput = editProfileForm.elements["edit-profile-name"];
const editProfileSubtitleInput = editProfileForm.elements["edit-profile-subtitle"];
const editProfileSubmitButton = editProfileForm.querySelector(".popup__submit");
const addCardSubmitButton = addCardPopup.querySelector(".popup__submit");
const updateAvatarSubmitButton = updateAvatarPopup.querySelector(".popup__submit");
const updateAvatarLinkInput = updateAvatarForm.elements["update-avatar-link"];
const addCardNameInput = addCardForm.elements["add-card-name"];
const addCardLinkInput = addCardForm.elements["add-card-link"];

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
  editProfileSubmitButton.textContent = "Сохранение...";
  editProfile(editProfileNameInput.value, editProfileSubtitleInput.value)
    .then(changedUser => {
      setUser(changedUser);
      closePopup(editProfilePopup);
    }).catch(err => console.log(err));
}

// Обработчик нажатия на кнопку редактирования профиля
export const handleEditProfileButtonClick = () => {
  editProfileSubmitButton.textContent = "Сохранить";
  openPopup(editProfilePopup);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileSubtitleInput.value = profileSubtitleEl.textContent;
  validateForm(editProfileForm, validationConfig);
}

export const handleUpdateAvatarButtonClick = () => {
  updateAvatarSubmitButton.textContent = "Сохранить";
  openPopup(updateAvatarPopup);
  updateAvatarLinkInput.value = profileAvatar.src;
  validateForm(updateAvatarForm, validationConfig);
}

// Обработчик отправки формы добавления карточки
export const submitAddCardForm = event => {
  event.preventDefault();
  const card = {
    name: addCardNameInput.value,
    link: addCardLinkInput.value,
  };
  addCardSubmitButton.textContent = "Сохранение...";
  addCard(card)
    .then(card => {
      const cardElement = createCardElement(card);
      cardContainer.prepend(cardElement);
      addCardForm.reset();
      addCardSubmitButton.disabled = true;
      closePopup(addCardPopup);
    })
    .catch(err => console.log(err));
}

export const submitUpdateAvatarForm = event => {
  event.preventDefault();
  updateAvatarSubmitButton.textContent = "Сохранение...";
  updateAvatar(updateAvatarLinkInput.value)
    .then(user => {
      setUser(user);
      closePopup(updateAvatarPopup);
    })
    .catch(err => console.log(err));
}

  export const handleAddCardButtonClick = () => {
  addCardSubmitButton.textContent = "Сохранить";
  openPopup(addCardPopup);
}

export const submitDeleteCardForm = event => {
  event.preventDefault();
  deleteCard(getDeleteCardId())
    .then(() => getCards())
    .then(cards => {
      setCards(cards);
      closePopup(deleteCardPopup);
    })
    .catch(err => console.log(err));
}
