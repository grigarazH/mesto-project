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
function createCardElement(card) {
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardImageContainer = cardElement.querySelector(".card__image-container")
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = card.link;
  cardImage.alt = `Фотография места ${card.name}`;
  cardImageContainer.addEventListener("click", function() {
    photoPopupImage.src = card.link;
    photoPopupCaption.textContent = card.name;
    togglePopup(photoPopup);
  });
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function(){
    toggleLikeButton(likeButton);
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function(){
    cardElement.remove();
  });
  cardTitle.textContent = card.name;
  return cardElement;
}

// Изменяет состояние кнопки лайка
function toggleLikeButton(button) {
  button.classList.toggle("card__like-button_active");
}

// Изменяет состояние попапа
function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

// Обработчик отправки формы редактирования формы.
function submitEditProfileForm(event) {
  event.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileSubtitleEl.textContent = editProfileSubtitleInput.value;
  togglePopup(editProfilePopup);
}

initialCards.forEach(card => cardContainer.append(getCardElement(card)));
profileNameEl.textContent = initialProfileData.name;
profileSubtitleEl.textContent = initialProfileData.subtitle;

editProfileButton.addEventListener("click", function() {
  togglePopup(editProfilePopup);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileSubtitleInput = profileSubtitleEl.textContent;
});

editProfileCloseButton.addEventListener("click", function() {
  togglePopup(editProfilePopup);
});

editProfileForm.addEventListener("submit", submitEditProfileForm);

addCardButton.addEventListener("click", function() {
  togglePopup(addCardPopup);
});

addCardCloseButton.addEventListener("click", function() {
  togglePopup(addCardPopup);
});

addCardForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const card = {
    name: addCardNameInput.value,
    link: addCardLinkInput.value,
  };
  const cardElement = getCardElement(card);
  cardContainer.prepend(cardElement);
  addCardForm.reset();
  togglePopup(addCardPopup);
});

photoPopupCloseButton.addEventListener("click", function() {
  togglePopup(photoPopup);
});

updateProfile();
