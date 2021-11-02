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

//Данная функция вызывается при рендеринге страницы
function render() {
    let likeButtons = document.querySelectorAll(".card__like-button");
    likeButtons.forEach(button => {
        button.addEventListener("click", function() {
            button.classList.toggle("card__like-button_active");
        });
    });
}

render();
