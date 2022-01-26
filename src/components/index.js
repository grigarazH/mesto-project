import {cardContainer, createCardElement} from './card';
import '../pages/index.css';
import {
  editProfileForm,
  addCardForm,
  updateAvatarForm,
  deleteCardForm, setPopupOverlayListeners, closePopup, openPopup, popups,
} from "./modal";
import {profileAvatar, profileNameEl, profileSubtitleEl, validationConfig} from "./constants";
import {enableValidation, validateForm} from "./validate";
import {addCard, deleteCard, editProfile, fetchUserInfo, fetchCards, updateAvatar} from "./api";
import {getCards, getDeleteCardId, setCards, setUser} from "./utils";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const editProfileNameInput = editProfileForm.elements["edit-profile-name"];
const editProfileSubtitleInput = editProfileForm.elements["edit-profile-subtitle"];
const editProfileSubmitButton = editProfileForm.querySelector(".popup__submit");
const addCardSubmitButton = popups.addCardPopup.querySelector(".popup__submit");
const updateAvatarSubmitButton = popups.updateAvatarPopup.querySelector(".popup__submit");
const updateAvatarLinkInput = updateAvatarForm.elements["update-avatar-link"];
const addCardNameInput = addCardForm.elements["add-card-name"];
const addCardLinkInput = addCardForm.elements["add-card-link"];

// Обработчик отправки формы редактирования профиля
const submitEditProfileForm = event => {
  event.preventDefault();
  editProfileSubmitButton.textContent = "Сохранение...";
  editProfile(editProfileNameInput.value, editProfileSubtitleInput.value)
    .then(changedUser => {
      setUser(changedUser);
      closePopup(popups.editProfilePopup);
    }).catch(err => console.log(err));
}

// Обработчик нажатия на кнопку редактирования профиля
const handleEditProfileButtonClick = () => {
  editProfileSubmitButton.textContent = "Сохранить";
  openPopup(popups.editProfilePopup);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileSubtitleInput.value = profileSubtitleEl.textContent;
  validateForm(editProfileForm, validationConfig);
}

const handleUpdateAvatarButtonClick = () => {
  updateAvatarSubmitButton.textContent = "Сохранить";
  openPopup(popups.updateAvatarPopup);
  updateAvatarLinkInput.value = profileAvatar.src;
  validateForm(updateAvatarForm, validationConfig);
}

// Обработчик отправки формы добавления карточки
const submitAddCardForm = event => {
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
      getCards().unshift(card);
      addCardForm.reset();
      validateForm(addCardForm, validationConfig);
      closePopup(popups.addCardPopup);
    })
    .catch(err => console.log(err));
}

const submitUpdateAvatarForm = event => {
  event.preventDefault();
  updateAvatarSubmitButton.textContent = "Сохранение...";
  updateAvatar(updateAvatarLinkInput.value)
    .then(user => {
      setUser(user);
      closePopup(popups.updateAvatarPopup);
    })
    .catch(err => console.log(err));
}

const handleAddCardButtonClick = () => {
  addCardSubmitButton.textContent = "Сохранить";
  openPopup(popups.addCardPopup);
}

const submitDeleteCardForm = event => {
  event.preventDefault();
  deleteCard(getDeleteCardId())
    .then(() => {
      const cardElements = Array.from(cardContainer.querySelectorAll(".card"));
      const deletedCardIndex = getCards().findIndex(card => card._id === getDeleteCardId());
      cardElements[deletedCardIndex].remove();
      closePopup(popups.deleteCardPopup);
    })
    .catch(err => console.log(err));
}


editProfileButton.addEventListener("click", handleEditProfileButtonClick);
editProfileForm.addEventListener("submit", submitEditProfileForm);

addCardButton.addEventListener("click", handleAddCardButtonClick);

addCardForm.addEventListener("submit", submitAddCardForm);

deleteCardForm.addEventListener("submit", submitDeleteCardForm);

setPopupOverlayListeners();

profileAvatarButton.addEventListener("click", handleUpdateAvatarButtonClick);

updateAvatarForm.addEventListener("submit", submitUpdateAvatarForm);

enableValidation(validationConfig);

Promise.all([fetchUserInfo(), fetchCards()])
  .then(([fetchedUser, fetchedCards]) => {
    setUser(fetchedUser);
    setCards(fetchedCards);
  })
  .catch(err => console.log(err));


