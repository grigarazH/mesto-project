const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
const photoPopupImage = document.querySelector(".popup__photo");
const profileNameEl = document.querySelector(".profile__name");
const profileSubtitleEl = document.querySelector(".profile__subtitle");
const addCardNameInput = addCardForm.querySelector("#add_card_name");
const addCardLinkInput = addCardForm.querySelector("#add_card_link");

let profileName = document.querySelector(".profile__name").textContent;
let profileSubtitle = document.querySelector(".profile__subtitle").textContent;

// Принимает объект карточки с параметрами link и name. Возвращает html-элемент карточки.
function getCardElement(card) {
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDescription = cardElement.querySelector(".card__title");
  cardImage.src = card.link;
  cardImage.alt = `Фотография места ${card.name}`;
  cardImage.addEventListener("click", function() {

    togglePopup(photoPopup);
  });
  cardDescription.textContent = card.name;
  return cardElement;
}


function likeButtonToggle(button) {
  button.classList.toggle("card__like-button_active");
}

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

// Данная функция вызывается при рендеринге страницы
function render() {
  profileNameEl.textContent = profileName;
  profileSubtitleEl.textContent = profileSubtitle;
  editProfileNameInput.value = profileName;
  editProfileSubtitleInput.value = profileSubtitle;
}

initialCards.forEach(card => cardContainer.append(getCardElement(card)));

const cards = cardContainer.querySelectorAll(".card");
cards.forEach(card => {
  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", function(){
    likeButtonToggle(likeButton);
  });
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function(){
    card.remove();
  })
});

editProfileButton.addEventListener("click", function() {
  togglePopup(editProfilePopup);
});

editProfileCloseButton.addEventListener("click", function() {
  togglePopup(editProfilePopup);
});

editProfileForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  profileName = editProfileNameInput.value;
  profileSubtitle = editProfileSubtitleInput.value;
  togglePopup(editProfilePopup);
  render();
});

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
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function() {
    likeButtonToggle(likeButton);
  })
  cardContainer.prepend(cardElement);
  togglePopup(addCardPopup);
})

render();
