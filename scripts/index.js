const cardContainer = document.querySelector(".cards");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const editProfileCloseButton = editProfilePopup.querySelector(".popup__close-button");
const editProfileForm = editProfilePopup.querySelector(".popup__container");
const cardTemplate = document.querySelector("#card_template");
const editProfileNameInput = editProfilePopup.querySelector("#edit_profile_name");
const editProfileSubtitleInput = editProfilePopup.querySelector("#edit_profile_subtitle");
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_add-card");
const addCardCloseButton = addCardPopup.querySelector(".popup__close-button");
const addCardForm = addCardPopup.querySelector(".popup__container");
const photoPopup = document.querySelector(".popup_type_photo");
const photoPopupImage = photoPopup.querySelector(".popup__photo");
const photoPopupCaption = photoPopup.querySelector(".popup__photo-caption");
const photoPopupCloseButton = photoPopup.querySelector(".popup__close-button");
const profileNameEl = document.querySelector(".profile__name");
const profileSubtitleEl = document.querySelector(".profile__subtitle");
const addCardNameInput = addCardForm.querySelector("#add_card_name");
const addCardLinkInput = addCardForm.querySelector("#add_card_link");

// Принимает объект карточки с параметрами link и name. Возвращает html-элемент карточки.
const createCardElement = card => {
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardImageContainer = cardElement.querySelector(".card__image-container")
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = card.link;
  cardImage.alt = `Фотография места ${card.name}`;
  cardImageContainer.addEventListener("click", () => {
    photoPopupImage.src = card.link;
    photoPopupImage.alt = card.name;
    photoPopupCaption.textContent = card.name;
    openPopup(photoPopup);
  });
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    toggleLikeButton(likeButton);
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardTitle.textContent = card.name;
  return cardElement;
}

// Изменяет состояние кнопки лайка
const toggleLikeButton = button => {
  button.classList.toggle("card__like-button_active");
}

const openPopup = popup => popup.classList.add("popup_opened");

const closePopup = popup => popup.classList.remove("popup_opened");

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
