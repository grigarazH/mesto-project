const photoPopup = document.querySelector(".popup_type_photo");
const addCardPopup = document.querySelector(".popup_type_add-card");
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const updateAvatarPopup = document.querySelector(".popup_type_update-avatar");
const deleteCardPopup = document.querySelector(".popup_type_delete-card");
export const photoPopupImage = photoPopup.querySelector(".popup__photo");
export const photoPopupCaption = photoPopup.querySelector(".popup__photo-caption");
export const editProfileForm = editProfilePopup.querySelector(".popup__container");
export const addCardForm = addCardPopup.querySelector(".popup__container");
export const updateAvatarForm = updateAvatarPopup.querySelector(".popup__container");
export const deleteCardForm = deleteCardPopup.querySelector(".popup__container");
export const popups = {editProfilePopup, addCardPopup, photoPopup, updateAvatarPopup, deleteCardPopup};

// Обработчик нажатия на клавишу Esc
const handleEscKey = event => {
  if(event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// Функция открытия попапа
export const openPopup = popup => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);
}

// Функция закрытия попапа
export const closePopup = popup => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
}

// Функция открытия попапа с фотографией
export const openPhotoPopup = card => {
  photoPopupImage.src = card.link;
  photoPopupImage.alt = card.name;
  photoPopupCaption.textContent = card.name;
  openPopup(photoPopup);
}

// Функция установки слушателей для оверлея
export const setPopupOverlayListeners = () => {
  Object.keys(popups).forEach(popup => {
    popups[popup].addEventListener("mousedown", e => {
      if(e.target.classList.contains("popup") || e.target.classList.contains("popup__close-button")) {
        closePopup(popups[popup]);
      }
    });
  });
}

