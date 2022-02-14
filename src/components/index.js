import Card, {cardContainer} from './Card';
import '../pages/index.css';
import {addCardForm, closePopup, editProfileForm, popups, updateAvatarForm,} from "./modal";
import {apiConfig, cardTemplateSelector, validationConfig} from "./constants";
import FormValidator, {validateForm} from "./FormValidator";
import Api, {addCard, editProfile, updateAvatar} from "./Api";
import {getCards, getDeleteCardId, setDeleteCardId, setUser} from "./utils";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import UserInfo from "./UserInfo";
import {isThenable} from "@babel/core/lib/gensync-utils/async";

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

const api = new Api(apiConfig);
const userInfo = new UserInfo(".profile__name",
  ".profile__subtitle",
  () => api.fetchUserInfo(),
  ({name, about}) => api.editProfile(name, about));
const cardSection = new Section({
  renderer: card => {
    const cardElement = new Card(card, cardTemplateSelector, () => {
      const photoPopup = new PopupWithImage(".popup_type_photo");
      photoPopup.open();
    }, (likeButton, likeAmount) => {
      if (!likeButton.classList.contains("card__like-button_active")) {
        api.likeCard(card._id)
          .then(card => {
            likeAmount.textContent = card.likes.length;
            likeButton.classList.add("card__like-button_active");
          })
          .catch(err => console.log(err));
      } else {
        api.dislikeCard(card._id)
          .then(card => {
            likeAmount.textContent = card.likes.length;
            likeButton.classList.remove("card__like-button_active");
          })
          .catch(err => console.log(err));
      }
    }, () => {
      setDeleteCardId(card._id);
      deleteCardPopup.open();
    });
    return cardElement.generate()
  },
}, ".cards");

const deleteCardPopup = new PopupWithForm(".popup_type_delete-card", inputValues => {
  api.deleteCard(getDeleteCardId())
    .then(() => {
      const cardElements = Array.from(cardContainer.querySelectorAll(".card")); // Получение массива всех элементов карточки
      const deletedCardIndex = getCards().findIndex(card => card._id === getDeleteCardId()); // Получение индекса удаляемой карточки в массиве объектов карточек
      cardElements[deletedCardIndex].remove(); // Удаление элемента карточки
      closePopup(popups.deleteCardPopup);
    })
    .catch(err => console.log(err));
});

const editProfilePopup = new PopupWithForm(".popup_type_edit-profile", inputValues => {
  editProfileSubmitButton.textContent = "Сохранение...";
  userInfo.setUserInfo({name: inputValues["edit-profile-name"], about: inputValues["edit-profile-subtitle"]});
  editProfilePopup.close();
});

const addCardPopup = new PopupWithForm(".popup_type_add-card", inputValues => {
  const card = {
    name: addCardNameInput.value,
    link: addCardLinkInput.value,
  };
  addCardSubmitButton.textContent = "Сохранение...";
  api.addCard(card)
    .then(card => {
      cardSection.addItem(card);
      getCards().unshift(card);
      addCardFormValidator.validateForm();
      addCardPopup.close();
    })
    .catch(err => console.log(err));
});

const updateAvatarPopup = new PopupWithForm(".popup_type_update_avatar", inputValues => {
  updateAvatarSubmitButton.textContent = "Сохранение...";
  updateAvatar(inputValues["update-avatar-link"])
    .then(user => {
      setUser(user);
      updateAvatarPopup.close();
    })
    .catch(err => console.log(err));
})

const editProfileFormValidator = new FormValidator(validationConfig, ".popup_type_edit-profile");
const deleteCardFormValidator = new FormValidator(validationConfig, ".popup_type_delete-card");
const addCardFormValidator = new FormValidator(validationConfig, ".popup_type_add-card");
const updateAvatarFormValidator = new FormValidator(validationConfig, ".popup_type_update-avatar");

editProfileFormValidator.enableValidation();
deleteCardFormValidator.enableValidation();
addCardFormValidator.enableValidation();
updateAvatarFormValidator.enableValidation();


const handleEditProfileButtonClick = () => {
  editProfileSubmitButton.textContent = "Сохранить";
  editProfilePopup.open();
  editProfileNameInput.value = userInfo.getUserInfo();
  editProfileSubtitleInput.value = userInfo.getUserInfo();
  editProfileFormValidator.validateForm();
}

Promise.all([userInfo.fetchUserInfo(), api.fetchCards()])
  .then(([fetchedUser, fetchedCards]) => {
    userInfo.render();
    cardSection.renderItems(fetchedCards);
  })
  .catch(err => console.log(err));
// Обработчик нажатия на кнопку редактирования профиля

// // Обработчик нажатия на кнопку обновления аватара
// const handleUpdateAvatarButtonClick = () => {
//   updateAvatarSubmitButton.textContent = "Сохранить";
//   openPopup(popups.updateAvatarPopup);
//   updateAvatarLinkInput.value = profileAvatar.src;
//   validateForm(updateAvatarForm, validationConfig);
// }
//
// // Обработчик отправки формы добавления карточки
// const submitAddCardForm = event => {
//   event.preventDefault();
//   const card = {
//     name: addCardNameInput.value,
//     link: addCardLinkInput.value,
//   };
//   addCardSubmitButton.textContent = "Сохранение...";
//   addCard(card)
//     .then(card => {
//       const cardElement = createCardElement(card);
//       cardContainer.prepend(cardElement);
//       getCards().unshift(card);
//       addCardForm.reset();
//       validateForm(addCardForm, validationConfig);
//       closePopup(popups.addCardPopup);
//     })
//     .catch(err => console.log(err));
// }
// // Обработчик отправки формы обновления аватара
// const submitUpdateAvatarForm = event => {
//   event.preventDefault();
//   updateAvatarSubmitButton.textContent = "Сохранение...";
//   updateAvatar(updateAvatarLinkInput.value)
//     .then(user => {
//       setUser(user);
//       closePopup(popups.updateAvatarPopup);
//     })
//     .catch(err => console.log(err));
// }
//
// // Обработчик нажатия на кнопку добавления карточки
// const handleAddCardButtonClick = () => {
//   addCardSubmitButton.textContent = "Сохранить";
//   openPopup(popups.addCardPopup);
// }
//
// // Обработчик отправки формы удаления карточки
// const submitDeleteCardForm = event => {
//   event.preventDefault();
//   deleteCard(getDeleteCardId())
//     .then(() => {
//       const cardElements = Array.from(cardContainer.querySelectorAll(".card")); // Получение массива всех элементов карточки
//       const deletedCardIndex = getCards().findIndex(card => card._id === getDeleteCardId()); // Получение индекса удаляемой карточки в массиве объектов карточек
//       cardElements[deletedCardIndex].remove(); // Удаление элемента карточки
//       closePopup(popups.deleteCardPopup);
//     })
//     .catch(err => console.log(err));
// }
//
//
// editProfileButton.addEventListener("click", handleEditProfileButtonClick);
// editProfileForm.addEventListener("submit", submitEditProfileForm);
//
// addCardButton.addEventListener("click", handleAddCardButtonClick);
//
// addCardForm.addEventListener("submit", submitAddCardForm);
//
// deleteCardForm.addEventListener("submit", submitDeleteCardForm);
//
// setPopupOverlayListeners();
//
// profileAvatarButton.addEventListener("click", handleUpdateAvatarButtonClick);
//
// updateAvatarForm.addEventListener("submit", submitUpdateAvatarForm);
//
// enableValidation(validationConfig);
//
// Promise.all([fetchUserInfo(), fetchCards()])
//   .then(([fetchedUser, fetchedCards]) => {
//     setUser(fetchedUser);
//     setCards(fetchedCards);
//   })
//   .catch(err => console.log(err));

