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

let profileName = document.querySelector(".profile__name").textContent;
let profileSubtitle = document.querySelector(".profile__subtitle").textContent;

//Принимает объект карточки с параметрами link и name. Возвращает html карточки.
function getCardHtml(card) {
  return `
    <article class="card">
    <img class="card__image" src="${card.link}" alt="Фотография места ${card.name}">
    <div class="card__description">
      <h2 class="card__title">${card.name}</h2>
      <button type="button" class="card__like-button"></button>
      </div>
    </article>
  `;
}

let cardContainer = document.querySelector(".cards");

initialCards.forEach(card => {
  cardContainer.insertAdjacentHTML("beforeend", getCardHtml(card));
});

function likeButtonToggle(button) {
  button.classList.toggle("card__like-button_active");
}

let cards = cardContainer.querySelectorAll(".card");
cards.forEach(card => {
  let likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", function(){
    likeButtonToggle(likeButton);
  });
});

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

let editProfileButton = document.querySelector(".profile__edit-button");
let editProfilePopup = document.querySelector(".popup_type_edit-profile");

editProfileButton.addEventListener("click", function() {
  togglePopup(editProfilePopup);
});
let editProfileCloseButton = editProfilePopup.querySelector(".popup__close-button");
editProfileCloseButton.addEventListener("click", function() {
  togglePopup(editProfilePopup);
});
let editProfileForm = editProfilePopup.querySelector(".popup__container");

editProfileForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  let editProfileNameInput = editProfilePopup.querySelector("#profile_name");
  let editProfileSubtitleInput = editProfilePopup.querySelector("#profile_subtitle");
  profileName = editProfileNameInput.value;
  profileSubtitle = editProfileSubtitleInput.value;
  togglePopup(editProfilePopup);
  render();
});

//Данная функция вызывается при рендеринге страницы
function render() {
  let profileNameEl = document.querySelector(".profile__name");
  let profileSubtitleEl = document.querySelector(".profile__subtitle");
  profileNameEl.textContent = profileName;
  profileSubtitleEl.textContent = profileSubtitle;
  let editProfileNameInput = editProfilePopup.querySelector("#profile_name");
  let editProfileSubtitleInput = editProfilePopup.querySelector("#profile_subtitle");
  editProfileNameInput.value = profileName;
  editProfileSubtitleInput.value = profileSubtitle;
}

render();
